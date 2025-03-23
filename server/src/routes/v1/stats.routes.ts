import Router from "express";

import { DashboardStatsController } from "../../controllers";

const router = Router();

// *  /api/v1/stats GET
router.get("/", DashboardStatsController);

export { router as statsRoutes };
