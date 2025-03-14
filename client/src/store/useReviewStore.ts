import { create } from "zustand";
import { Review } from "@/types/types";
import { axiosInstance } from "@/lib/axios";
interface ReviewStore {
  reviews: Review[] | null;
  isLoading: boolean;
  error: string | null;

  getAllReviews: (movieId: number) => Promise<void>;
  createReview: (movieId: number, data: Review) => Promise<void>;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  reviews: null,
  isLoading: false,
  error: null,
  getAllReviews: async (movieId: number) => {
    try {
      set({ isLoading: true });
      const reviews = await axiosInstance.get(`/reviews/${movieId}`);
      set({ reviews: reviews.data.data, isLoading: false, error: null });
    } catch (error: any) {
      set({ error: error, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  createReview: async (movieId: number, data: Review) => {
    try {
      set({ isLoading: true });
      const reviews = await axiosInstance.post(`/reviews/${movieId}`, data);
      set((state) => ({
        reviews: state.reviews ? [...state.reviews, reviews.data.data] : null,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to create review",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
