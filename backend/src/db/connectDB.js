import mongoose from "mongoose";

const conn = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => {
      console.log("DB CONNECTED SUCCESSFULLY", res.connection.host);
    })
    .catch((err) => {
      console.log("🚀 ~ .then ~ err:", err);
      process.exit(1);
    });
};

export default conn;
