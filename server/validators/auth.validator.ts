import { body } from "express-validator";

export const registerValidator = [
  body("fullName")
    .trim()
    .notEmpty(),

  body("email")
    .isEmail(),

  body("mobileNumber")
    .notEmpty(),

  body("password")
    .isLength({ min: 6 }),
];

export const loginValidator = [
  body("password")
    .notEmpty(),
];