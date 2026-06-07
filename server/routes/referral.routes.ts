import { Router } from "express";

import {
  getDirectReferrals,
  getReferralTree,
} from "../controllers/referral.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/direct",
  authMiddleware,
  getDirectReferrals
);

router.get(
  "/tree",
  authMiddleware,
  getReferralTree
);

export default router;