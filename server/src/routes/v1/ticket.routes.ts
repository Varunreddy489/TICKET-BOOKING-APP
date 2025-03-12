import {
  BookTicketsController,
  GetAllTicketsController,
  GetTicketByIdController,
} from "../../controllers";
import Router from "express";
import { protectedRoute } from "../../middleware/auth.middleware";
import { validateTicket } from "../../validations/ticket.validation";

const router = Router();

// *  /api/v1/tickets POST
router.get("/", GetAllTicketsController);
router.get("/:id", GetTicketByIdController);
router.post("/:movieId", validateTicket, BookTicketsController);

// Book ticket


export { router as ticketRoutes };
