import {
  BookTicketsController,
  GetAllTicketsController,
  GetTicketByIdController,
} from "../../controllers";
import Router from "express";
import { TicketValidator } from "../../validations";

const router = Router();

// *  /api/v1/tickets POST
router.get("/", GetAllTicketsController);
router.get("/:id", GetTicketByIdController);
router.post("/:movieId", TicketValidator, BookTicketsController);

// Book ticket


export { router as ticketRoutes };
