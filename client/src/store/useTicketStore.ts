import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface TicketStore {
  tickets: any;
  isLoading: boolean;
  error: string[] | null;
  bookData: any;

  getUserTickets: (userId: string) => Promise<void>;
  bookTickets: (movieId: number, data: any) => Promise<void>;
  getTickets: (movieId: number, time: string) => Promise<void>;
  refundTickets: (userId: string, ticketId: number) => Promise<void>;
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: null,
  isLoading: false,
  error: null,
  bookData: null,

  getTickets: async (movieId: number, time: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/tickets/${movieId}/${time}`);
      set({ tickets: response.data.data, isLoading: false, error: null });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to get tickets",
        isLoading: false,
      });
    }
  },

  getUserTickets: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/tickets/user/${userId}`);
      set({ tickets: response.data.data, isLoading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || error.message || "An error occurred",
        isLoading: false,
      });
    }
  },

  bookTickets: async (movieId: number, data: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(`/tickets/${movieId}`, data);
      set({ bookData: response.data, isLoading: false, error: null });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to book tickets",
        isLoading: false,
      });
    }
  },

  refundTickets: async (userId: string, ticketId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(`/tickets/refund/${userId}`, {
        ticketId,
      });
      set({ bookData: response.data, isLoading: false, error: null });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.error?.explanation ||
          "Failed to refund tickets",
        isLoading: false,
      });
    }
  },
}));
