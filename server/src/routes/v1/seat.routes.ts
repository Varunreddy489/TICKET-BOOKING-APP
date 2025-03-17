import Router from "express";

import { getAllSeatsController } from "../../controllers";

const router = Router();

// *  /api/v1/seats/:movieId POST
router.get("/:movieId", getAllSeatsController);

export { router as seatRoutes };
