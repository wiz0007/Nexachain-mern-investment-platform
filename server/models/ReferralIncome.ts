import { Schema, model } from "mongoose";

const referralIncomeSchema = new Schema(
  {
    receiverUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    generatedByUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    referralLevel: {
      type: Number,
      required: true,
      min: 1,
    },
    incomeAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

referralIncomeSchema.index({
  receiverUser: 1,
  referralLevel: 1,
});

export const ReferralIncome = model(
  "ReferralIncome",
  referralIncomeSchema
);