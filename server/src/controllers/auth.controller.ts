import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { prisma } from "../config";
import { ErrorResponse, SuccessResponse } from "../utils/common";

export const authCallback = async (req: Request, res: Response) => {
  try {
    const { id, name, email } = req.body;

    let user = await prisma.user.findUnique({
      where: {
        clerkId: id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: id,
          name,
          email,
        },
      });
    }

    SuccessResponse.data = user;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error: any) {
    ErrorResponse.error = error;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    return;
  }
};
