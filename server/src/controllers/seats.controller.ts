import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { prisma } from "../config";
import { ErrorResponse, SuccessResponse } from "../utils/common";

export const getAllSeatsController = async (req: Request, res: Response) => {
  try {
    const movieId = Number(req.params.movieId);

    if (isNaN(movieId)) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid movieId" });
      return;
    }
    const response = await prisma.seat.findMany({
      where: {
        movieId: movieId,
      },
    });

    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    return;
  }
};
