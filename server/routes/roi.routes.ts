import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import {
  getRoiHistory,
} from "../controllers/roi.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  getRoiHistory
);

export default router;