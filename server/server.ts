import mongoose from "mongoose";

import app from "./app";

import { env } from "./config/env";

import {
  startDailyRoiJob,
} from "./jobs/dailyRoi.job";

mongoose
  .connect(
    env.MONGO_URI,
    {
      serverSelectionTimeoutMS:
        10000,
    }
  )
  .then(() => {

    startDailyRoiJob();

    app.listen(
      env.PORT,
      () => {
        console.log(
          `Server running on port ${env.PORT}`
        );
      }
    );
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed",
      error
    );

    process.exit(1);
  });
