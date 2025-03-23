import { StatusCodes } from "http-status-codes";

import { prisma } from "../config";
import { RefundTicketType, Ticket } from "../types/types";
import AppError from "../utils/errors/app.error";
import { SeatStatus, TransactionType } from "@prisma/client";
import TicketRepository from "../repositories/ticket.repository";

const ticketRepository = new TicketRepository();

export const BookTicket = async (data: Ticket) => {
  const { count, cost, timing, seatNumber, movieId, userId } = data;

  try {
    const numberMovie = Number(movieId);

    if (!userId) {
      throw new AppError("User ID is required", StatusCodes.BAD_REQUEST);
    }

    if (isNaN(numberMovie) || numberMovie <= 0) {
      throw new AppError(
        "Invalid movieId. It must be a positive number.",
        StatusCodes.BAD_REQUEST
      );
    }

    if (!Array.isArray(seatNumber) || seatNumber.length === 0) {
      throw new AppError(
        "Invalid seatNumber. It must be a non-empty array.",
        StatusCodes.BAD_REQUEST
      );
    }

    if (seatNumber.length !== count) {
      throw new AppError(
        "Invalid seat number. Count does not match with Seat Numbers.",
        StatusCodes.BAD_REQUEST
      );
    }

    const ticket = await prisma.$transaction(async (tx) => {
      //  ^  Step 1: Lock and check seat availability
      // const seats = await tx.$queryRaw<
      //   { id: number; seatNumber: string; status: string }[]
      // >`
      //   SELECT "id", "seatNumber", "status"
      //   FROM "Seat"
      //   WHERE "movieId" = ${numberMovie}
      //   AND "seatNumber" IN (${seatNumber.join(", ")})
      //   AND "status" ='AVAILABLE'
      //   FOR UPDATE
      // `;

      const seats = await tx.$queryRaw<
        { id: number; seatNumber: string; status: string }[]
      >`
        SELECT "id", "seatNumber", "status"
        FROM "Seat"
        WHERE "movieId" = ${numberMovie}
        AND "seatNumber" = ANY(${seatNumber})
        AND "status" = 'AVAILABLE'
        FOR UPDATE
`;

      console.log(
        `Query: 
        SELECT "id", "seatNumber", "status"
        FROM "Seat"
        WHERE "movieId" = $1
        AND "seatNumber" = ANY($2)
        AND "status" = 'AVAILABLE'
        FOR UPDATE`,
        [numberMovie, seatNumber]
      );

      // Check if all requested seats were found and available
      if (seats.length !== seatNumber.length) {
        const unavailableSeats = seatNumber.filter(
          (sn) => !seats.some((seat) => seat.seatNumber === sn)
        );
        throw new AppError(
          `Seats ${unavailableSeats.join(
            ", "
          )} are already booked or unavailable`,
          StatusCodes.BAD_REQUEST
        );
      }

      // ^  Step 2: Verify movie exists
      const isMovie = await tx.movie.findUnique({
        where: { id: numberMovie },
      });

      if (!isMovie) {
        throw new AppError("Movie not found", StatusCodes.NOT_FOUND);
      }

      // ^  Step 3: Calculate total cost
      const totalCost = count * cost;

      // ^  Step 4: Make payment

      const userWallet = await tx.wallet.findFirst({
        where: { userId: userId },
      });

      if (!userWallet) {
        throw new AppError("Wallet not found", StatusCodes.NOT_FOUND);
      }

      if (userWallet.balance === 0 || userWallet.balance < 0) {
        throw new AppError("Insufficient balance", StatusCodes.BAD_REQUEST);
      }

      if (userWallet.balance < totalCost) {
        throw new AppError(
          "Add Money to Wallet. Insufficient balance",
          StatusCodes.BAD_REQUEST
        );
      }

      const updatedWallet = await tx.wallet.update({
        where: {
          id: userWallet.id,
        },
        data: {
          balance: parseFloat((userWallet.balance - totalCost).toFixed(2)),
        },
      });

      const transaction = await tx.walletTransaction.create({
        data: {
          walletId: updatedWallet.id,
          amount: totalCost,
          type: TransactionType.DEDUCT,
          movieId: numberMovie,
        },
      });

      // ^  Step 5: Create the ticket
      const newTicket = await tx.ticket.create({
        data: {
          count,
          cost,
          totalCost,
          timing,
          movieId: numberMovie,
          userId,
        },
      });

      // ^  Step 6: Update seats to BOOKED and link to ticket

      await tx.seat.updateMany({
        where: {
          movieId: numberMovie,
          seatNumber: { in: seatNumber },
          status: SeatStatus.AVAILABLE,
        },
        data: {
          status: SeatStatus.BOOKED,
          ticketId: newTicket.id,
        },
      });

      // Verify that all seats were updated (optional double-check)
      const updatedSeatsCount = await tx.seat.count({
        where: {
          movieId: numberMovie,
          seatNumber: { in: seatNumber },
          status: SeatStatus.BOOKED,
          ticketId: newTicket.id,
        },
      });

      if (updatedSeatsCount !== seatNumber.length) {
        throw new AppError(
          "Failed to book all requested seats due to concurrency",
          StatusCodes.CONFLICT
        );
      }

      return newTicket;
    });

    return ticket;
  } catch (error: any) {
    console.error("Booking error:", error.message);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const GetTicketById = async (id: number) => {
  try {
    const response = await ticketRepository.get(id);
    return response;
  } catch (error: any) {
    throw new AppError(
      error.message || "Cannot fetch the Ticket",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const GetTickets = async () => {
  try {
    const response = await ticketRepository.getAll();
    return response;
  } catch (error: any) {
    throw new AppError(
      error.message || "Cannot fetch data of all the Tickets",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const GetUserTickets = async (userId: string) => {
  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        userId: userId,
      },
      include: {
        Seat: {
          select: {
            seatNumber: true,
          },
        },
        movie: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tickets; // Return the fetched tickets
  } catch (error: any) {
    console.error("Error fetching user tickets: ", error.message);
    throw new AppError(
      error.message || "Cannot fetch user tickets",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const RefundTicket = async (data: RefundTicketType) => {
  try {
    const { ticketId, userId } = data;

    // ^ Start a transaction

    const refundResult = await prisma.$transaction(async (tx) => {
      //* Step 1: Find the ticket
      const ticket = await tx.ticket.findFirst({
        where: {
          id: ticketId,
        },
      });

      if (!ticket) {
        throw new AppError("Ticket not found", StatusCodes.NOT_FOUND);
      }

      //* Step 2: Check if ticket is refundable
      const ticketTiming = new Date(ticket.timing);
      const currentTime = new Date();

      if (ticket.isExpired || ticketTiming <= currentTime) {
        throw new AppError(
          "Ticket is expired or past its showtime",
          StatusCodes.BAD_REQUEST
        );
      }

      // * Step 3: Calculate refund amount
      const refundAmount = ticket.totalCost;

      //* Step 4: Find user wallet
      const userWallet = await tx.wallet.findFirst({
        where: { userId },
      });

      if (!userWallet) {
        throw new AppError("Wallet not found", StatusCodes.NOT_FOUND);
      }

      //* Step 5: Update wallet balance
      const newBalance = Number((userWallet.balance + refundAmount).toFixed(2));
      const updatedWallet = await tx.wallet.update({
        where: { id: userWallet.id },
        data: { balance: newBalance },
      });

      // * Step 6: Log refund transaction
      await tx.walletTransaction.create({
        data: {
          walletId: updatedWallet.id,
          amount: refundAmount,
          type: TransactionType.REFUND,
          movieId: ticket.movieId,
        },
      });

      // *Step 7: Release seats
      // const seats = await tx.seat.findMany({
      //   where: {
      //     ticketId: ticketId,
      //   },
      // });
      // console.log("Seats associated with ticketId:", ticketId, seats);

      const updatedSeats = await tx.seat.updateMany({
        where: {
          ticketId,
        },
        data: {
          status: SeatStatus.AVAILABLE,
          ticketId: null,
        },
      });

      if (updatedSeats.count === 0) {
        throw new AppError(
          "No seats were released",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      //* Step 8: Delete ticket
      await tx.ticket.delete({
        where: {
          id: ticketId,
        },
      });

      console.log(`Released ${updatedSeats.count} seats.`);

      // Return meaningful result
      return {
        refundedAmount: refundAmount,
        newBalance: updatedWallet.balance,
        ticketId,
      };
    });

    return refundResult;
  } catch (error: any) {
    console.error("Error fetching user tickets: ", error.message);
    throw new AppError(
      error.message || "Cannot RefundTicket Try again",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
