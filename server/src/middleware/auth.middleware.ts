import { clerkClient } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.auth || !req.auth.userId) {
    res.status(401).json({ message: "Unauthorized - you must be logged in" });
    return;
  }

  next();
};

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.auth || !req.auth.userId) {
      res.status(401).json({ message: "Unauthorized - you must be logged in" });
      return;
    }

    const currentUser = await clerkClient.users.getUser(req?.auth?.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      res.status(403).json({ message: "Unauthorized - you must be an admin" });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
