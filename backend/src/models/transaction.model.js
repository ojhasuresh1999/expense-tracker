import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
      enum: ["cash", "card"],
    },
    category: {
      type: String,
      required: true,
      enum: ["income", "expense", "investment"],
    },
    amount: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
