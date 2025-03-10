import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ErrorResponse, SuccessResponse } from "../utils/common";
import { CreateTicket, GetTicketById, GetTickets } from "../services";

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
  "genres": ["Sci-Fi", "Thriller"],
  "isMovieAvailable": true,
  "movieSeatCapacity": 150
}

 */
export const CreateTicketController = async (req: Request, res: Response) => {
  try {
    const ticket = await CreateTicket(req.body);
    SuccessResponse.data = ticket;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    return;
  }
};

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
