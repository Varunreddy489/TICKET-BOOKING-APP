import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { Wallet, WalletTransaction } from "@/types/types";

interface WalletStore {
  walletData: Wallet | null;
  transactions: WalletTransaction[] | null;
  isLoading: boolean;
  error: string | null;

  getWallet: (userId: string) => Promise<void>;
  getTransactions: (userId: string) => Promise<void>;
  addMoney: (userId: string, amount: number) => Promise<void>;
}

export const useWalletStore = create<WalletStore>((set) => ({
  walletData: null,
  isLoading: false,
  error: null,
  transactions: [],

  getWallet: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/wallet/${userId}`);
      set({ walletData: response.data.data, isLoading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || error.message || "An error occurred",
        isLoading: false,
      });
    }
  },

  getTransactions: async (userId: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get(
        `/wallet/transactions/${userId}`
      );
      set({ transactions: response.data.data, isLoading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || error.message || "An error occurred",
        isLoading: false,
      });
    }
  },

  addMoney: async (userId: string, amount: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(`/wallet/${userId}`, {
        amount,
      });
      set({ walletData: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || error.message || "An error occurred",
        isLoading: false,
      });
    }
  },
}));
