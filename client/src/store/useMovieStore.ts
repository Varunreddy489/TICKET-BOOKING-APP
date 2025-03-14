import { create } from "zustand";
import { Movie } from "@/types/types";
import { axiosInstance } from "@/lib/axios";

interface MovieStore {
  movies: Movie | null;
  isLoading: boolean;
  error: string[] | null;

  getAllMovies: () => Promise<void>;
  getMovieById: (id: number) => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: null,
  isLoading: false,
  error: null,

  getAllMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/movies");
      set({ movies: response.data, isLoading: false, error: null });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  getMovieById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/movies/${id}`);
      set({ movies: response.data, isLoading: false, error: null });
    } catch (error: any) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
