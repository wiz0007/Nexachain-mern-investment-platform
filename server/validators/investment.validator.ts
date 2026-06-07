import { body, query } from "express-validator";

export const createInvestmentValidator = [
  body("investmentAmount")
    .isFloat({ min: 1 }),

  body("planDetails")
    .trim()
    .notEmpty(),

  body("startDate")
    .isISO8601(),

  body("endDate")
    .isISO8601(),

  body("dailyRoiPercentage")
    .isFloat({ min: 0 }),
];

export const investmentQueryValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 }),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 }),

  query("status")
    .optional()
    .isIn([
      "ACTIVE",
      "COMPLETED",
      "CANCELLED",
    ]),
];