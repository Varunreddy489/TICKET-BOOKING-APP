import { StatusCodes } from "http-status-codes";

import { prisma } from "../config";
import { Review } from "../types/types";
import AppError from "../utils/errors/app.error";
import ReviewRepository from "../repositories/review.repository";

const reviewRepository = new ReviewRepository();
export const CreateReview = async (data: Review) => {
  try {
    const userId = data.userId;

    if (!userId) {
      throw new AppError("User ID is required", StatusCodes.BAD_REQUEST);
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    const review = await reviewRepository.create(data);
    return review;
  } catch (error: any) {
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const getAllReviews = async (movieId: number) => {
  try {
    const review = await prisma.review.findMany({
      where: {
        movieId: movieId,
      },
      include: {
        user: true, // Include user details if available
      },
    });
    return review;
  } catch (error: any) {
    throw new AppError(
      error.message || "Error fetching reviews",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
