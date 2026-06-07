import type { Response } from "express";

import { env } from "../config/env";

const sevenDaysInMs =
  7 * 24 * 60 * 60 * 1000;

export const setAuthCookie = (
  res: Response,
  token: string
) => {
  res.cookie(
    "accessToken",
    token,
    {
      httpOnly: true,
      secure:
        env.NODE_ENV ===
        "production",
      sameSite:
        env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",
      maxAge:
        sevenDaysInMs,
    }
  );
};

export const clearAuthCookie = (
  res: Response
) => {
  res.clearCookie(
    "accessToken",
    {
      httpOnly: true,
      secure:
        env.NODE_ENV ===
        "production",
      sameSite:
        env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",
    }
  );
};
