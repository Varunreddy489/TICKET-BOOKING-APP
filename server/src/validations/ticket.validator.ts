import { body } from "express-validator";

export const TicketValidator = [
  body("count")
    .isInt({ min: 1 })
    .withMessage("Count must be an integer greater than 0"),

  body("cost")
    .isFloat({ min: 0 })
    .withMessage("Cost must be a positive number"),

  body("timing").isString().notEmpty().withMessage("Timing is required"),

  body("seatNumber")
    .isArray({ min: 1 })
    .withMessage("Seat number must be an array with at least one seat"),

  body("seatNumber.*")
    .isString()
    .notEmpty()
    .withMessage("Each seat number must be a valid string"),

  body("movieId")
    .isInt()
    .notEmpty()
    .withMessage("Movie is not valid"),

  body("isExpired")
    .optional()
    .isBoolean()
    .withMessage("isExpired must be a boolean"),
];
