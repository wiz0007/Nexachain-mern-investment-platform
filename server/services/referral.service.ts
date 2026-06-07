import mongoose from "mongoose";

import { User } from "../models/User";
import { ReferralIncome } from "../models/ReferralIncome";

import {
  LEVEL_PERCENTAGES,
  MAX_REFERRAL_LEVELS,
} from "../config/roi.config";

import { roundMoney } from "../utils/finance";

/**
 * Distributes level income
 * upward through referral hierarchy.
 */
export const distributeLevelIncome =
  async (
    generatedByUserId: string,
    investmentId: string,
    roiAmount: number,
    processingDate: Date,
    session: mongoose.ClientSession
  ): Promise<void> => {

    const visited =
      new Set<string>();

    let currentUser =
      await User.findById(
        generatedByUserId
      )
        .select("referredBy")
        .session(session);

    let level = 1;

    while (
      currentUser?.referredBy &&
      level <= MAX_REFERRAL_LEVELS
    ) {
      const parentId =
        currentUser.referredBy.toString();

      /**
       * Prevent circular chains
       */
      if (
        visited.has(parentId)
      ) {
        break;
      }

      visited.add(parentId);

      const parentUser =
        await User.findById(
          parentId
        ).session(session);

      if (!parentUser) {
        break;
      }

      /**
       * Only active users earn
       */
      if (
        parentUser.accountStatus ===
        "ACTIVE"
      ) {
        const income =
          roundMoney(
            roiAmount *
              (LEVEL_PERCENTAGES[
                level - 1
              ] /
                100)
          );

        /**
         * Duplicate protection
         */
        const existing =
          await ReferralIncome.findOne({
            receiverUser:
              parentUser._id,

            generatedByUser:
              generatedByUserId,

            referralLevel:
              level,

            date:
              processingDate,
          }).session(session);

        if (!existing) {
          await ReferralIncome.create(
            [
              {
                receiverUser:
                  parentUser._id,

                generatedByUser:
                  generatedByUserId,

                referralLevel:
                  level,

                incomeAmount:
                  income,

                date:
                  processingDate,
              },
            ],
            { session }
          );

          await User.updateOne(
            {
              _id:
                parentUser._id,
            },
            {
              $inc: {
                walletBalance:
                  income,

                totalLevelIncomeEarned:
                  income,
              },
            },
            { session }
          );
        }
      }

      currentUser =
        parentUser;

      level++;
    }
  };