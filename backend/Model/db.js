import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const mongoUrl = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
