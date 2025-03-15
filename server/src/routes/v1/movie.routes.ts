import Router from "express";

import {
  CreateMovieController,
  DeleteMovieController,
  GetAllMoviesController,
  GetMovieByIdController,
  UpdateMovieController,
} from "../../controllers";
import { MovieValidator } from "../../validations";

const router = Router();

// *  /api/v1/movies GET
router.get("/", GetAllMoviesController);

// *  /api/v1/movies/:id PUT
router.put("/:id", UpdateMovieController);

// *  /api/v1/movies/:id GET

router.get("/:id", GetMovieByIdController);

// *  /api/v1/movies/:id DELETE

router.delete("/:id", DeleteMovieController);

// *  /api/v1/movies POST

router.post("/", MovieValidator, CreateMovieController);

export { router as movieRoutes };
