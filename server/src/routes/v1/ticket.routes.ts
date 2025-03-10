import {
  CreateTicketController,
  GetAllTicketsController,
  GetTicketByIdController,
} from "controllers";
import Router from "express";

const router = Router();

// *  /api/v1/ticket POST
router.get("/", GetAllTicketsController);
router.post("/", CreateTicketController);
router.get("/:id", GetTicketByIdController);

export { router as ticketRoutes };
