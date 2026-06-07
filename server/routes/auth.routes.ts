import { Router } from "express";

import {
  loginUser,
  logoutUser,
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

router.post(
  "/logout",
  logoutUser
);

export default router;
