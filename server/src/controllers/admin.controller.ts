import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ErrorResponse } from "../utils/common";

export const checkAdmin = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ admin: true });
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    return;
  }
};
