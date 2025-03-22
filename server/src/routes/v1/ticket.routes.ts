import Router from "express";

import {
  BookTicketsController,
  RefundTicketController,
  GetAllTicketsController,
  GetTicketByIdController,
  GetUserTicketsController,
} from "../../controllers";
import { TicketValidator } from "../../validations";

const router = Router();

// *  /api/v1/tickets GET
router.get("/", GetAllTicketsController);

// *  /api/v1/tickets/:id GET
router.get("/:id", GetTicketByIdController);

// *  /api/v1/tickets/user/:userId/ GET
router.get("/user/:userId/", GetUserTicketsController);

// *  /api/v1/tickets/refund/:userId/ PUT
router.put("/refund/:userId/", RefundTicketController);

// *  /api/v1/tickets/movieId POST
router.post("/:movieId", TicketValidator, BookTicketsController);

export { router as ticketRoutes };
