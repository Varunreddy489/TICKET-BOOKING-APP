import Router from "express";

import { authRoutes } from "./auth.routes";
import { movieRoutes } from "./movie.routes";
import { adminRoutes } from "./admin.routes";
import { reviewRoutes } from "./review.routes";
import { ticketRoutes } from "./ticket.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/movies", movieRoutes);
router.use("/tickets", ticketRoutes);
router.use("/reviews", reviewRoutes);

export { router as v1Routes };
