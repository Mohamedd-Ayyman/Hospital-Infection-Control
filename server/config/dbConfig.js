import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

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

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose default connection is open");
});

db.on("error", (err) => {
  console.error("Mongoose default connection error:", err);
});

db.on("disconnected", () => {
  console.log("Mongoose default connection is disconnected");
});

export { connectDB, db };
