import { body } from "express-validator";

export const MovieValidator = [
  body("name").notEmpty().withMessage("Name is required").isString(),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isFloat({ min: 0, max: 10 })
    .withMessage("Rating must be a float between 0 and 10"),

  body("images")
    .isArray({ min: 1 })
    .withMessage("Images must be an array with at least one URL")
    .custom((value) =>
      value.every((url: string) => /^https?:\/\/.+\..+/.test(url))
    )
    .withMessage("Each image must be a valid URL"),

  body("genres")
    .isArray({ min: 1 })
    .withMessage("Genres must be an array with at least one genre")
    .custom((value) =>
      value.every((genre: string) => typeof genre === "string")
    )
    .withMessage("Each genre must be a string"),

  body("timings")
    .isArray({ min: 1 })
    .withMessage("Timings must be an array of valid date strings")
    .custom((value) => value.every((time: string) => !isNaN(Date.parse(time))))
    .withMessage("Each timing must be a valid date"),

  body("ticketCost")
    .notEmpty()
    .withMessage("Ticket cost is required")
    .isFloat({ min: 0 })
    .withMessage("Ticket cost must be a positive float"),

  body("languages")
    .isArray({ min: 1 })
    .withMessage("Languages must be an array with at least one language")
    .custom((value) => value.every((lang: string) => typeof lang === "string"))
    .withMessage("Each language must be a string"),

  body("movieSeatCapacity")
    .notEmpty()
    .withMessage("Movie seat capacity is required")
    .isInt({ min: 1 })
    .withMessage("Movie seat capacity must be a positive integer"),

  body("isMovieAvailable")
    .optional()
    .isBoolean()
    .withMessage("isMovieAvailable must be a boolean"),
];
