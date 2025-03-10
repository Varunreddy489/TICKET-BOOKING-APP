import { Movie } from "../types/types";

import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app.error";
import MovieRepository from "../repositories/movie.repository";

const movieRepository = new MovieRepository();

export const CreateMovie = async (data: Movie) => {
  try {
    const movie = await movieRepository.create(data);
    return movie;
  } catch (error: any) {
    throw new AppError(
      "Cannot Create the movie",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const GetMovies = async () => {
  try {
    const movies = await movieRepository.getAll();
    return movies;
  } catch (error: any) {
    throw new AppError(
      "Cannot fetch data of all the movies",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const GetMovieById = async (id: number) => {
  try {
    const movies = await movieRepository.get(id);
    return movies;
  } catch (error: any) {
    throw new AppError(
      "Cannot fetch the movie",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const UpdateMovie = async (id: number, data: any) => {
  try {
    const movies = await movieRepository.update(id, data);
    return movies;
  } catch (error: any) {
    throw new AppError(
      "Cannot update the movie",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const DeleteMovie = async (id: number) => {
  try {
    const movies = await movieRepository.destroy(id);
    return movies;
  } catch (error: any) {
    throw new AppError(
      "Cannot delete the movie",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
