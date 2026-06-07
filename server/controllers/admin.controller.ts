// controllers/admin.controller.ts

import { Request, Response } from "express";
import {
  processDailyRoiForAllActiveInvestments,
} from "../services/roi.service";

export const processDailyRoi =
  async (
    req: Request,
    res: Response
  ) => {

    const summary =
      await processDailyRoiForAllActiveInvestments(
        new Date()
      );

    return res.json({
      success: true,
      message:
        "Daily ROI processing completed",
      data: summary,
    });
  };