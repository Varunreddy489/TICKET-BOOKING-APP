import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { getDashBoardStats } from "../services";
import { ErrorResponse, SuccessResponse } from "../utils/common";

function convertBigIntToString(obj: any): any {
  if (typeof obj === "bigint") {
    return obj.toString(); // Convert BigInt to string
  }
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString); // Handle arrays
  }
  if (typeof obj === "object" && obj !== null) {
    const result: any = {};
    for (const key in obj) {
      result[key] = convertBigIntToString(obj[key]); // Handle nested objects
    }
    return result;
  }
  return obj; // Return other types as-is
}
export const DashboardStatsController = async (req: Request, res: Response) => {
  try {
    const response = await getDashBoardStats();
    const serializedResponse = convertBigIntToString(response); 
    SuccessResponse.data = serializedResponse;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error: any) {
    console.error("Error in getDashBoardStats:", error);
    ErrorResponse.data = error;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
};
