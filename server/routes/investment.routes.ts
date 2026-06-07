import { Router } from "express";

import {
  createInvestment,
  getInvestments,
} from "../controllers/investment.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

import {
  createInvestmentValidator,
  investmentQueryValidator,
} from "../validators/investment.validator";

import { validateRequest } from "../middlewares/validation.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createInvestmentValidator,
  validateRequest,
  createInvestment
);

router.get(
  "/",
  authMiddleware,
  investmentQueryValidator,
  validateRequest,
  getInvestments
);

export default router;