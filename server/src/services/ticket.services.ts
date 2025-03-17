import { StatusCodes } from "http-status-codes";

import { prisma } from "../config";
import { Ticket } from "../types/types";
import AppError from "../utils/errors/app.error";
import TicketRepository from "../repositories/ticket.repository";

const ticketRepository = new TicketRepository();

// export type CreateTicketData = Omit<
//   Ticket,
//   "id" | "totalCost" | "createdAt" | "updatedAt"
// >;

export const BookTicket = async (data: Ticket) => {
  try {
    const { count, cost, timing, seatNumber, movieId, userId } = data;

    console.log("movieId:", movieId);

    const numberMovie = Number(movieId);

    if (isNaN(numberMovie) || numberMovie <= 0) {
      throw new AppError(
        "Invalid movieId. It must be a positive number.",
        StatusCodes.BAD_REQUEST
      );
    }

    if (seatNumber.length !== count) {
      throw new AppError(
        "Invalid seat number. Count does not match with Seat Numbers.",
        StatusCodes.BAD_REQUEST
      );
    }

    const isMovie = await prisma.movie.findUnique({
      where: { id: numberMovie },
    });

    if (!isMovie) {
      throw new AppError("Movie not found", StatusCodes.NOT_FOUND);
    }

    const totalCost = count * cost;

    const ticket = await prisma.ticket.create({
      data: {
        count,
        cost,
        totalCost,
        timing,
        movieId: numberMovie,
        userId,
      },
    });

    return ticket;
  } catch (error: any) {
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const GetTicketById = async (id: number) => {
  try {
    const response = await ticketRepository.get(id);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot fetch the Ticket",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const GetTickets = async () => {
  try {
    const response = await ticketRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the Tickets",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const BookTickets = async (id: number, data: any) => {
  try {
  } catch (error: any) {
    throw new AppError(
      "Cannot Book the Ticket",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
