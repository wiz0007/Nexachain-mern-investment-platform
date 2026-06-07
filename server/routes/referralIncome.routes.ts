import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import {
  getReferralIncomeHistory,
} from "../controllers/referralIncome.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  getReferralIncomeHistory
);

export default router;