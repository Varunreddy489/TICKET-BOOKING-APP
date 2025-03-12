import Router from "express";
import { authCallback, CreateReviewController, GetAllReviewsController } from "../../controllers";

const router = Router();

// *  /api/v1/reviews/:movieId GET
router.get("/:movieId", GetAllReviewsController);

// *  /api/v1/reviews/:movieId POST
router.post("/:movieId", CreateReviewController);

export { router as reviewRoutes };
