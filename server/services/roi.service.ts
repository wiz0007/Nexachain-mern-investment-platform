import mongoose from "mongoose";

import { User } from "../models/User";
import { Investment } from "../models/Investment";
import { ROIHistory } from "../models/ROIHistory";

import { distributeLevelIncome } from "./referral.service";

import {
  normalizeProcessingDate,
} from "../utils/date";

import {
  roundMoney,
} from "../utils/finance";

/**
 * ROI Formula:
 *
 * amount * roiPercentage / 100
 */
export const calculateDailyRoiForInvestment =
  (
    investment: any
  ): number => {

    return roundMoney(
      (
        investment.investmentAmount *
        investment.dailyROIPercentage
      ) /
        100
    );
  };

  export const processDailyRoiForInvestment =
  async (
    investmentId: string,
    processingDate: Date
  ) => {

    const session =
      await mongoose.startSession();

    try {

      session.startTransaction();

      const normalizedDate =
        normalizeProcessingDate(
          processingDate
        );

      const investment =
        await Investment.findById(
          investmentId
        ).session(session);

      if (!investment) {
        throw new Error(
          "Investment not found"
        );
      }

      if (
        investment.status !==
        "ACTIVE"
      ) {
        await session.abortTransaction();
        return;
      }

      const existingRoi =
        await ROIHistory.findOne({
          investment:
            investment._id,

          date:
            normalizedDate,
        }).session(session);

      if (existingRoi) {
        await session.abortTransaction();
        return;
      }

      const roiAmount =
        calculateDailyRoiForInvestment(
          investment
        );

      await ROIHistory.create(
        [
          {
            user:
              investment.user,

            investment:
              investment._id,

            roiAmount,

            date:
              normalizedDate,

            status:
              "CREDITED",
          },
        ],
        { session }
      );

      await User.updateOne(
        {
          _id:
            investment.user,
        },
        {
          $inc: {
            walletBalance:
              roiAmount,

            totalROIEarned:
              roiAmount,
          },
        },
        {
          session,
        }
      );

      await distributeLevelIncome(
        investment.user.toString(),
        investment._id.toString(),
        roiAmount,
        normalizedDate,
        session
      );

      await session.commitTransaction();

      return {
        success: true,
        roiAmount,
      };

    } catch (error) {

      await session.abortTransaction();

      throw error;

    } finally {

      session.endSession();

    }
  };

  export const processDailyRoiForAllActiveInvestments =
  async (
    processingDate: Date
  ) => {

    const normalizedDate =
      normalizeProcessingDate(
        processingDate
      );

    const activeInvestments =
      await Investment.find({
        status: "ACTIVE",
      })
        .select(
          "_id endDate"
        )
        .lean();

    let processedCount = 0;
    let skippedCount = 0;
    let failedCount = 0;
    let completedCount = 0;

    for (
      const investment of activeInvestments
    ) {

      try {

        /**
         * Auto complete
         */
        if (
          new Date(
            investment.endDate
          ) <
          normalizedDate
        ) {

          await Investment.updateOne(
            {
              _id:
                investment._id,
            },
            {
              status:
                "COMPLETED",
            }
          );

          completedCount++;

          continue;
        }

        const existing =
          await ROIHistory.exists({
            investment:
              investment._id,

            date:
              normalizedDate,
          });

        if (existing) {
          skippedCount++;
          continue;
        }

        await processDailyRoiForInvestment(
          investment._id.toString(),
          normalizedDate
        );

        processedCount++;

      } catch (error) {

        failedCount++;

        console.error(
          error
        );
      }
    }

    return {
      totalActiveInvestments:
        activeInvestments.length,

      processedCount,

      skippedCount,

      failedCount,

      completedCount,
    };
  };