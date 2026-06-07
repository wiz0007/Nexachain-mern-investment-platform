import { Request, Response } from "express";

import { ReferralIncome } from "../models/ReferralIncome";

import { ApiResponse } from "../utils/ApiResponse";

export const getReferralIncomeHistory =
  async (
    req: Request & { userId?: string },
    res: Response
  ) => {

    const page = Number(
      req.query.page || 1
    );

    const limit = Number(
      req.query.limit || 10
    );

    const skip =
      (page - 1) * limit;

    const filter = {
      receiverUser:
        req.userId,
    };

    const [items, total] =
      await Promise.all([
        ReferralIncome.find(
          filter
        )
          .populate(
            "generatedByUser",
            "fullName email"
          )
          .sort({
            date: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        ReferralIncome.countDocuments(
          filter
        ),
      ]);

    return res.json(
      new ApiResponse(
        true,
        "Referral income history fetched",
        {
          items,
          pagination: {
            page,
            limit,
            total,
            totalPages:
              Math.ceil(
                total / limit
              ),
          },
        }
      )
    );
  };