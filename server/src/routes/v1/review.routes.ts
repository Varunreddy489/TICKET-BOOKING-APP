import Router from "express";
import {
  CreateReviewController,
  GetAllReviewsController,
} from "../../controllers";
import { protectedRoute } from "../../middleware";
import { ReviewValidator } from "../../validations";

const router = Router();

// *  /api/v1/reviews/:movieId POST
router.post(
  "/:movieId",
  protectedRoute,
  ReviewValidator,
  CreateReviewController
);

// *  /api/v1/reviews/:movieId GET
router.get("/:movieId", GetAllReviewsController);

export { router as reviewRoutes };
