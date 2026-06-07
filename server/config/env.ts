import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "MONGO_URI",
  "JWT_SECRET",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(
      `Missing required environment variable: ${key}`
    );
  }
}

export const env = {
  PORT: process.env.PORT || "5000",

  CLIENT_URL:
    process.env.CLIENT_URL ||
    "http://localhost:5173",

  MONGO_URI: process.env.MONGO_URI as string,

  JWT_SECRET: process.env.JWT_SECRET as string,

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  NODE_ENV:
    process.env.NODE_ENV ||
    "development",
};
