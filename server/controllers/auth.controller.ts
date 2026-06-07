import bcrypt from "bcryptjs";

import { Request, Response } from "express";

import { User } from "../models/User";

import { ApiError } from "../utils/ApiError";

import { ApiResponse } from "../utils/ApiResponse";

import { generateToken } from "../utils/jwt";

import { generateReferralCode } from "../utils/generateReferralCode";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  const {
    fullName,
    email,
    mobileNumber,
    password,
    referralCode,
  } = req.body;

  const existingUser =
    await User.findOne({
      $or: [
        { email },
        { mobileNumber },
      ],
    });

  if (existingUser) {
    throw new ApiError(
      409,
      "User already exists"
    );
  }

  let referredBy = null;

  if (referralCode) {
    const parent =
      await User.findOne({
        referralCode,
      });

    if (!parent) {
      throw new ApiError(
        404,
        "Invalid referral code"
      );
    }

    referredBy = parent._id;
  }

  const hashedPassword =
    await bcrypt.hash(password, 12);

  const user = await User.create({
    fullName,
    email,
    mobileNumber,
    password: hashedPassword,
    referralCode:
      generateReferralCode(fullName),
    referredBy,
  });

  const token = generateToken(
    user._id.toString()
  );

  const {
    password: _password,
    ...responseUser
  } = user.toObject();

  return res.status(201).json(
    new ApiResponse(
      true,
      "Registration successful",
      {
        user: responseUser,
        token,
      }
    )
  );
};

export const loginUser = async (
  req: Request,
  res: Response
) => {
  const {
    email,
    mobileNumber,
    password,
  } = req.body;

  const user = await User.findOne({
    $or: [
      { email },
      { mobileNumber },
    ],
  }).select("+password");

  if (!user) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  if (
    user.accountStatus !==
    "ACTIVE"
  ) {
    throw new ApiError(
      403,
      "Account not active"
    );
  }

  const token = generateToken(
    user._id.toString()
  );

  const {
    password: _password,
    ...responseUser
  } = user.toObject();

  return res.json(
    new ApiResponse(
      true,
      "Login successful",
      {
        user: responseUser,
        token,
      }
    )
  );
};