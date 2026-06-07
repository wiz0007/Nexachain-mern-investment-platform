import cron from "node-cron";

import {
  processDailyRoiForAllActiveInvestments,
} from "../services/roi.service";

let isRunning = false;

/**
 * Daily ROI Processor
 *
 * Runs every day at midnight.
 */
export const startDailyRoiJob =
  () => {

    cron.schedule(
      "0 0 * * *",
      async () => {

        /**
         * Prevent overlapping execution
         */
        if (isRunning) {
          console.warn(
            "ROI Job already running"
          );

          return;
        }

        try {

          isRunning = true;

          const today =
            new Date();

          console.log(
            `ROI Job Started: ${today.toISOString()}`
          );

          const summary =
            await processDailyRoiForAllActiveInvestments(
              today
            );

          console.log(
            "ROI Job Completed",
            summary
          );

        } catch (error) {

          console.error(
            "ROI Job Failed",
            error
          );

        } finally {

          isRunning = false;

        }
      },
      {
        timezone: "Asia/Kolkata",
      }
    );

    console.log(
      "Daily ROI Cron Registered"
    );
  };