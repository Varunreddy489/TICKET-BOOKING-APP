import { StatusCodes } from "http-status-codes";

import { Ticket } from "../types/types";
import AppError from "../utils/errors/app.error";
import TicketRepository from "../repositories/ticket.repository";

const ticketRepository = new TicketRepository();
export const CreateTicket = async (data: Ticket) => {
  try {
    const response = await ticketRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot Create the Ticket",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
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


export const BookTickets = async (id: number, data: any) => {};
