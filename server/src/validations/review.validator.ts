import { body } from "express-validator";

export const ReviewValidator = [
  body("content").notEmpty().withMessage("Content is required").isString(),

  body("rating")
    .notEmpty()
    .withMessage("Rating should not be empty")
    .isInt()
    .isLength({ max: 5, min: 1 }),
];
