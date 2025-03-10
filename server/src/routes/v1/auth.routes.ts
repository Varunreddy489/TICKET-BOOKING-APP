import Router from "express";
import { authCallback } from "../../controllers";

const router = Router();

// *  /api/v1/auth POST
router.post("/", authCallback);

export { router as authRoutes };
