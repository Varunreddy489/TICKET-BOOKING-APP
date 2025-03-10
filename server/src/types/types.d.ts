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

export type Showtime = {
  id?: number;
  movieId?: number;
  startTime?: Date;
  endTime?: Date;
  capacity?: number;
  location?: string;
  movie?: Movie;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Ticket = {
  id?: number;
  count: number;
  cost: number;
  userId: number;
  showtime: Showtime;
  movie: Movie;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Review = {
  id?: number;
  content: string;
  rating: number;
  movieId: number;
  userId: number;
  createdAt?: Date;
};
