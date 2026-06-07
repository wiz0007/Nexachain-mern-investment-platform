import { Request, Response } from "express";

import { User } from "../models/User";

import { ApiResponse } from "../utils/ApiResponse";

import { buildReferralTree } from "../utils/buildReferralTree";

export const getDirectReferrals =
  async (
    req: Request,
    res: Response
  ) => {
    const referrals =
      await User.find({
        referredBy:
          req.userId,
      })
        .select(
          `
          fullName
          email
          mobileNumber
          referralCode
          accountStatus
          createdAt
        `
        )
        .lean();

    return res.json(
      new ApiResponse(
        true,
        "Direct referrals fetched successfully",
        referrals
      )
    );
  };

  export const getReferralTree =
  async (
    req: Request,
    res: Response
  ) => {
    const users =
      await User.find({})
        .select(
          `
          fullName
          email
          mobileNumber
          referralCode
          accountStatus
          referredBy
        `
        )
        .lean();

    const tree =
      buildReferralTree(
        req.userId!,
        users as any
      );

    return res.json(
      new ApiResponse(
        true,
        "Referral tree fetched successfully",
        tree
      )
    );
  };

