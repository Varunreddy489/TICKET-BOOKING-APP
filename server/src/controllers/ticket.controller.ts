import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { prisma } from "../config";
import { RefundTicketType, Ticket } from "../types/types";
import { ErrorResponse, SuccessResponse } from "../utils/common";
import {
  BookTicket,
  GetTicketById,
  GetTickets,
  GetUserTickets,
  RefundTicket,
} from "../services";

/**
 
  "name": "Inception",
  "description": "A mind-bending thriller about dreams within dreams.",
  "rating": 8.8,
  "images": [
    "https://example.com/inception1.jpg",
    "https://example.com/inception2.jpg"
  ],
  "ticketCost": 12.99,
  "timings": ["2025-03-05T09:00:00Z", "2025-03-05T14:00:00Z"],
  "languages": ["English", "French"],
  "isMovieAvailable": true,
  "movieSeatCapacity": 150
}

 */

// *  /api/v1/tickets/:movieId POST
export const BookTicketsController = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const { count, userId, cost, timing, seatNumber } = req.body;

    const ticketData: Ticket = {
      count,
      cost,
      timing,
      seatNumber,
      movieId: Number(movieId),
      userId: userId || null,
    };

    const response = await BookTicket(ticketData);

    SuccessResponse.data = response;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error: any) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
    return;
  }
};


// * /api/v1/tickets GET
export const GetAllTicketsController = async (req: Request, res: Response) => {
  try {
    const tickets = await GetTickets();
    SuccessResponse.data = tickets;
    res.status(StatusCodes.OK).json(SuccessResponse);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    return;
  }
};

// * /api/v1/tickets/:id GET

export const GetTicketByIdController = async (req: Request, res: Response) => {
  try {
    const ticket = await GetTicketById(Number(req.params.id));
    SuccessResponse.data = ticket;
    res.status(StatusCodes.OK).json(SuccessResponse);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    return;
  }
};

export const GetUserTicketsController = async (req: Request, res: Response) => {
  try {
    const response = await GetUserTickets(req.params.userId);
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    return;
  }
};

// *  /api/v1/tickets/user/:userId/ PUT

export const RefundTicketController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { ticketId } = req.body;

    const data: RefundTicketType = {
      userId,
      ticketId,
    };

    const response = await RefundTicket(data);

    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    return;
  }
};
