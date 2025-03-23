import Router from "express";

import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { seatRoutes } from "./seat.routes";
import { movieRoutes } from "./movie.routes";
import { statsRoutes } from "./stats.routes";
import { adminRoutes } from "./admin.routes";
import { ticketRoutes } from "./ticket.routes";
import { reviewRoutes } from "./review.routes";
import { walletRoutes } from "./wallet.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/seats", seatRoutes);
router.use("/admin", adminRoutes);
router.use("/stats", statsRoutes);
router.use("/movies", movieRoutes);
router.use("/wallet", walletRoutes);
router.use("/tickets", ticketRoutes);
router.use("/reviews", reviewRoutes);

export { router as v1Routes };