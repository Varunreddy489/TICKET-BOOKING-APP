import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { AddMoneyData } from "../types/types";
import { ErrorResponse, SuccessResponse } from "../utils/common";
import { AddMoney, GetAllTransactions, GetWallet, PayMoney } from "../services";

// *  /api/v1/wallet POST
// *  const { userId, amount } = req.body;

export const AddMoneyController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    const data: AddMoneyData = {
      userId,
      amount,
    };
    const wallet = await AddMoney(data);

    SuccessResponse.data = wallet;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    return;
  }
};

// *  /api/v1/wallet/pay POST
// *  const { userId, amount, walletId, movieId } = req.body;

export const PayWalletController = async (req: Request, res: Response) => {
  try {
    const wallet = await PayMoney(req.body);

    SuccessResponse.data = wallet;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    return;
  }
};

// *  /api/v1/wallet GET
// *  const { userId } = req.body;

export const GetMoneyController = async (req: Request, res: Response) => {
  try {
    const wallet = await GetWallet(req.params.userId);

    SuccessResponse.data = wallet;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
    return;
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    return;
  }
};

// *  /api/v1/wallet/transactions GET
// *  const { userId } = req.body;

export const GetAllTransactionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const wallet = await GetAllTransactions(req.params);

    SuccessResponse.data = wallet;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
    return;
  } catch (error: any) {
    console.log(error);
    ErrorResponse.error = error;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    return;
  }
};
