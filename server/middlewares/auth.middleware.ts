import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import { env } from "../config/env";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader =
    req.headers.authorization;

  const bearerToken =
    authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : undefined;

  const cookieToken =
    req.cookies?.accessToken;

  const token =
    bearerToken ||
    cookieToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    ) as {
      userId: string;
    };

    req.userId = decoded.userId;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
