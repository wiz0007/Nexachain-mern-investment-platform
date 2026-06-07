import { Schema, model } from "mongoose";

const roiHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    investment: {
      type: Schema.Types.ObjectId,
      ref: "Investment",
      required: true,
      index: true,
    },
    roiAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CREDITED", "FAILED"],
      default: "CREDITED",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

roiHistorySchema.index(
  {
    investment: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

export const ROIHistory = model(
  "ROIHistory",
  roiHistorySchema
);