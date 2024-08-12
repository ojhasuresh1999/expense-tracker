import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized...");

        const userId = await context.getUser()._id;

        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.log("🚀 ~ transactions: ~ error:", error);
        throw new Error(error.message || "An error occurred");
      }
    },

    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);

        return transaction;
      } catch (error) {
        console.log("🚀 ~ transaction:async ~ error:", error);
        throw new Error(error.message || "An error occurred");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        return newTransaction.save();
      } catch (error) {
        console.log("🚀 ~ createTransaction: ~ error:", error);
        throw new Error(error.message || "An error occurred");
      }
    },
    updateTransaction: async (_, { input }, context) => {
      try {
        return await Transaction.findByIdAndUpdate(input.transactionId, input, {
          new: true,
        });
      } catch (error) {
        console.log("🚀 ~ updateTransaction: ~ error:", error);
        throw new Error(error.message || "An error occurred");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        return await Transaction.findByIdAndDelete(transactionId);
      } catch (error) {
        console.log("🚀 ~ deleteTransaction: ~ error:", error);
        throw new Error(error.message || "An error occurred");
      }
    },
  },
};

export default transactionResolver;
