import { Request, Response } from "express";

import { User } from "../models/User";
import { Investment } from "../models/Investment";
import { ROIHistory } from "../models/ROIHistory";

import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { normalizeProcessingDate } from "../utils/date";

export const getDashboard =
  async (
    req: Request,
    res: Response
  ) => {
    const user =
      await User.findById(
        req.userId
      )
        .select(
          "walletBalance totalROIEarned totalLevelIncomeEarned"
        )
        .lean();

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    const today =
      normalizeProcessingDate(
        new Date()
      );

    const tomorrow =
      new Date(today);

    tomorrow.setUTCDate(
      tomorrow.getUTCDate() + 1
    );

    const [
      totalInvestments,
      dailyRoiResult,
    ] =
      await Promise.all([
        Investment.countDocuments(
          {
            user: req.userId,
          }
        ),

        ROIHistory.aggregate([
          {
            $match: {
              user:
                user._id,
              status:
                "CREDITED",
              date: {
                $gte:
                  today,
                $lt:
                  tomorrow,
              },
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum:
                  "$roiAmount",
              },
            },
          },
        ]),
      ]);

    return res.json(
      new ApiResponse(
        true,
        "Dashboard fetched successfully",
        {
          totalInvestments,

          dailyRoi:
            dailyRoiResult[0]?.total || 0,

          totalRoiEarned:
            user.totalROIEarned,

          totalLevelIncomeEarned:
            user.totalLevelIncomeEarned,

          walletBalance:
            user.walletBalance,
        }
      )
    );
  };
