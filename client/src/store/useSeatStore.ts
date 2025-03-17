import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface SeatStore {
  seats: any;
  isLoading: boolean;
  error: string[] | null;

  getSeats: (movieId: number) => Promise<void>;
}
const useSeatStore = create<SeatStore>((set) => ({
  seats: null,
  isLoading: true,
  error: null,

  getSeats: async (movieId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/seats/${movieId}`);
      set({ seats: response.data.data, isLoading: false, error: null });
    } catch (error: any) {
      set({ error: error });
    }
  },
}));

export default useSeatStore;
