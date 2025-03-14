import Router from "express";
import { checkAdmin, getAllUsers } from "../../controllers";

const router = Router();

// *  /api/v1/admin POST
router.post("/", checkAdmin);
router.get("/", getAllUsers);

export { router as adminRoutes };
