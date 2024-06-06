import mongoose from "mongoose";

const db = "mongodb://localhost:27017/yourDatabaseName"; // Replace 'yourDatabaseName' with your actual database name

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
};

export default connectDB;
