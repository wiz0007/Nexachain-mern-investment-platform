// routes/admin.routes.ts
import { Router, RequestHandler } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import {
  processDailyRoi,
} from "../controllers/admin.controller";

const router = Router();

router.post(
  "/roi/process-daily",
  authMiddleware,
  processDailyRoi
);