import { StatusCodes } from "http-status-codes";

import { prisma } from "../config";
import { AddMoneyData } from "../types/types";
import AppError from "../utils/errors/app.error";
import { TransactionType } from "@prisma/client";

export const AddMoney = async (data: AddMoneyData) => {
  try {
    const { userId, amount } = data;

    console.log(data);

    if (!userId) {
      throw new AppError("User ID is required", StatusCodes.BAD_REQUEST);
    }

    if (amount <= 0 || isNaN(amount)) {
      throw new AppError(
        "Amount must be a positive number",
        StatusCodes.BAD_REQUEST
      );
    }

    const amountFixed = Number(amount);

    const updatedWallet = await prisma.$transaction(async (tx) => {
      // Find existing wallet
      const userWallet = await tx.wallet.findFirst({
        where: { userId },
      });

      let wallet;
      if (!userWallet) {
        // Create new wallet if none exists
        wallet = await tx.wallet.create({
          data: {
            balance: amountFixed,
            userId,
          },
        });
      } else {
        wallet = await tx.wallet.update({
          where: { id: userWallet.id }, // Use id for precision
          data: {
            balance: Number((userWallet.balance + amount).toFixed(2)),
          },
        });
      }

      // Record the transaction
      const transaction = await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          amount: amountFixed,
          type: TransactionType.ADD,
        },
      });

      console.log("Transaction: ", transaction);

      return wallet;
    });

    return updatedWallet;
  } catch (error: any) {
    throw new AppError(
      error.message || "Cannot Add Money to wallet ",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const GetWallet = async (data: any) => {
  try {
    const { userId } = data;

    const wallet = await prisma.wallet.findFirst({
      where: { userId },
    });

    if (!wallet) {
      throw new AppError("Wallet not found", StatusCodes.NOT_FOUND);
    }

    return wallet;
  } catch (error: any) {
    console.log(error);
    throw new AppError(
      error.message || "Cannot fetch data of all the wallet",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const PayMoney = async (data: any) => {
  try {
    const { userId, amount, movieId } = data;

    if (!userId) {
      throw new AppError("User ID is required", StatusCodes.BAD_REQUEST);
    }

    const userWallet = await prisma.wallet.findFirst({
      where: {
        userId,
      },
    });

    if (!userWallet) {
      throw new AppError("Wallet not found", StatusCodes.NOT_FOUND);
    }

    const walletId = userWallet.id;

    if (userWallet.balance < amount) {
      throw new AppError("Insufficient balance", StatusCodes.BAD_REQUEST);
    }

    const updateWallet = await prisma.$transaction(async (prisma) => {
      const updatedWallet = await prisma.wallet.update({
        where: { id: walletId },
        data: {
          balance: parseFloat((userWallet.balance - amount).toFixed(2)),
        },
      });

      await prisma.walletTransaction.create({
        data: {
          walletId: updatedWallet.id,
          amount: parseFloat(amount.toFixed(2)),
          type: TransactionType.ADD,
          movieId: movieId,
        },
      });

      return updatedWallet;
    });

    return updateWallet;
  } catch (error: any) {
    throw new AppError(
      error.message || "Cannot Add Money to wallet",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const GetAllTransactions = async (data: any) => {
  try {
    const { userId } = data;
    const wallet = await prisma.wallet.findFirst({
      where: { userId },
    });

    if (!wallet) {
      console.log("Wallet not found:");
      throw new AppError("Wallet not found", StatusCodes.NOT_FOUND);
    }

    const transactions = await prisma.walletTransaction.findMany({
      where: {
        walletId: wallet.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return transactions;
  } catch (error: any) {
    throw new AppError(
      error.message || "Cannot fetch data of all the wallet",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
