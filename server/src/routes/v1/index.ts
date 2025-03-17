import Router from "express";

import { authRoutes } from "./auth.routes";
import { seatRoutes } from "./seat.routes";
import { movieRoutes } from "./movie.routes";
import { adminRoutes } from "./admin.routes";
import { ticketRoutes } from "./ticket.routes";
import { reviewRoutes } from "./review.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/seats", seatRoutes);
router.use("/admin", adminRoutes);
router.use("/movies", movieRoutes);
router.use("/tickets", ticketRoutes);
router.use("/reviews", reviewRoutes);

export { router as v1Routes };
