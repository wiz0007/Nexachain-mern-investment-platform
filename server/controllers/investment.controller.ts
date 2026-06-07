import { Request, Response } from "express";

import { Investment } from "../models/Investment";

import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const createInvestment = async (
  req: Request,
  res: Response
) => {
  const {
    investmentAmount,
    planDetails,
    startDate,
    endDate,
    dailyRoiPercentage,
  } = req.body;

  if (
    new Date(endDate) <=
    new Date(startDate)
  ) {
    throw new ApiError(
      400,
      "End date must be greater than start date"
    );
  }

  const investment =
    await Investment.create({
      user: req.userId,

      investmentAmount,

      planDetails,

      startDate,

      endDate,

      dailyROIPercentage:
        dailyRoiPercentage,

      status: "ACTIVE",
    });

  return res.status(201).json(
    new ApiResponse(
      true,
      "Investment created successfully",
      investment
    )
  );
};

export const getInvestments = async (
  req: Request,
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

  const filter: any = {
    user: req.userId,
  };

  if (req.query.status) {
    filter.status =
      req.query.status;
  }

  const [investments, total] =
    await Promise.all([
      Investment.find(filter)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Investment.countDocuments(
        filter
      ),
    ]);

  return res.json(
    new ApiResponse(
      true,
      "Investments fetched successfully",
      {
        investments,

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

