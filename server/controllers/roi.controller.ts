import { Request, Response } from "express";

import { ROIHistory } from "../models/ROIHistory";

import { ApiResponse } from "../utils/ApiResponse";

export const getRoiHistory = async (
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
      user: req.userId,
    };

    const [items, total] =
      await Promise.all([
        ROIHistory.find(filter)
          .populate(
            "investment",
            "planDetails"
          )
          .sort({
            date: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        ROIHistory.countDocuments(
          filter
        ),
      ]);

    return res.json(
      new ApiResponse(
        true,
        "ROI history fetched",
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