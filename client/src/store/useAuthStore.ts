import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string[] | null;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}
const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: true,
  error: null,

  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin");
      set({ isAdmin: response.data, isLoading: false, error: null });
    } catch (error: any) {
      set({ error: error });
    }
  },

  reset() {
    set({ isAdmin: false, isLoading: true, error: null });
  },
}));

export default useAuthStore;
