import { body } from "express-validator";

export const WalletValidator = [
  body("amount")
    .isFloat({ min: 1 })
    .withMessage("Amount must be a valid positive number"),

 
];
