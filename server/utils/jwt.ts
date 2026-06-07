import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

import { env } from "../config/env";

export const generateToken = (
  userId: string
): string => {
  const options: SignOptions = {
    expiresIn:
      env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(
    {
      userId,
    },
    env.JWT_SECRET,
    options
  );
};
