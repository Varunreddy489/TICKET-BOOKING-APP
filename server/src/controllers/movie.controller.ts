import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  CreateMovie,
  DeleteMovie,
  GetMovieById,
  GetMovies,
  UpdateMovie,
} from "../services";
import { ErrorResponse, SuccessResponse } from "../utils/common";

export const CreateMovieController = async (req: Request, res: Response) => {
  try {
    const response = await CreateMovie(req.body);
    SuccessResponse.data = response;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
    return;
  }
};
export const GetAllMoviesController = async (req: Request, res: Response) => {
  try {
    const response = await GetMovies();
    SuccessResponse.data = response;
    res.status(StatusCodes.CREATED).json(response);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
    return;
  }
};

export const GetMovieByIdController = async (req: Request, res: Response) => {
  try {
    const response = await GetMovieById(Number(req.params.id));
    SuccessResponse.data = response;
    res.status(StatusCodes.CREATED).json(response);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
    return;
  }
};

export const UpdateMovieController = async (req: Request, res: Response) => {
  try {
    const response = await UpdateMovie(Number(req.params.id), req.body);
    SuccessResponse.data = response;
    res.status(StatusCodes.CREATED).json(response);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
    return;
  }
};

export const DeleteMovieController = async (req: Request, res: Response) => {
  try {
    const response = await DeleteMovie(Number(req.params.id));
    SuccessResponse.data = response;
    res.status(StatusCodes.CREATED).json(response);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
    return;
  }
};
