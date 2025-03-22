import { create } from "zustand";
import { Ticket, User } from "@/types/types";
import { axiosInstance } from "@/lib/axios";

interface UserStore {
  userData: User | null;
  isLoading: boolean;
  tickets: Ticket[];
  error: string | null;
  userId: string | null;

  getUserId: () => void;
  getUser: () => Promise<void>;
  getUserTickets: (userId: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  userData: null,
  isLoading: false,
  error: null,
  userId: null,
  tickets: [],

  getUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/user");
      set({ userData: response.data.data, isLoading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || error.message || "An error occurred",
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
  getUserId: () => {
    const userData = localStorage.getItem("userData");

    const userId = userData ? JSON.parse(userData).userId : null;

    set({ userId });
  },
}));
