import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Review } from "../types/types";
import { CreateReview, getAllReviews } from "../services";
import { ErrorResponse, SuccessResponse } from "../utils/common";

export const CreateReviewController = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const { rating, content, userId } = req.body;

    const reviewData: Review = {
      content,
      rating,
      movieId: Number(movieId),
      userId,
    };

    const response = await CreateReview(reviewData);

    SuccessResponse.data = response;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
  }
};

export const GetAllReviewsController = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;

    const response = await getAllReviews(Number(movieId));
    SuccessResponse.data = response;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
  }
};
