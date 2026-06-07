import { Router } from "express";

import {
  loginUser,
  registerUser,
} from "../controllers/auth.controller";

import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator";

import { validateRequest } from "../middlewares/validation.middleware";

const router = Router();

router.post(
  "/register",
  registerValidator,
  validateRequest,
  registerUser
);

router.post(
  "/login",
  loginValidator,
  validateRequest,
  loginUser
);

export default router;