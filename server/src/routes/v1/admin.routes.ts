import Router from "express";
import { checkAdmin } from "../../controllers";

const router = Router();

// *  /api/v1/admin POST
router.post("/", checkAdmin);

export { router as adminRoutes };
