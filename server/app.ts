import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { env } from "./config/env";

import authRoutes from "./routes/auth.routes";

import { errorMiddleware } from "./middlewares/error.middleware";

import investmentRoutes from "./routes/investment.routes";

import dashboardRoutes from "./routes/dashboard.routes";

import referralRoutes from "./routes/referral.routes";
import roiRoutes from "./routes/roi.routes";
import referralIncomeRoutes from "./routes/referralIncome.routes";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/investments",
  investmentRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/referrals",
  referralRoutes
);

app.use(
  "/api/roi-history",
  roiRoutes
);

app.use(
  "/api/referral-income-history",
  referralIncomeRoutes
);

app.use(errorMiddleware);

export default app;
