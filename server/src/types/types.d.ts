import { AuthObject } from "@clerk/express";

export type User = {
  id: number;
  name: string;
  email: string;
  clerkId: string;
  role: string;
  genres: Genres[];
};

export type Movie = {
  id: number;
  title: string;
  description: string;
  rating: number;
  images: string[];
  ticketCost: number;
  timings: string[];
  languages: string[];
  genres: Genres[];
  isMovieAvailable: boolean;
  movieSeatCapacity: number;
  createdAt?: Date;
  updatedAt?: Date;
  reviews?: Review[];
};

export type Ticket = {
  id?: number;
  count: number;
  cost: number;
  totalCost?: number;
  userId?: string | null;
  timing: string;
  seatNumber: string[];
  movieId: number;
  isExpired?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Review = {
  id?: number;
  content: string;
  rating: number;
  movieId: number;
  userId?: string | null;
  createdAt?: Date;
};

declare global {
  namespace Express {
    interface Request {
      auth?: AuthObject;
    }
  }
}
