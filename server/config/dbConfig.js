import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import mongoose from "mongoose";

mongoose.connect(process.env.CONN_STRING);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONN_STRING, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("DB connection successful!");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();
db.on("connected", () => {
  console.log("DB connection successful!");
});

db.on("error", () => {
  console.log("DB connection failed!");
});

export default db;
