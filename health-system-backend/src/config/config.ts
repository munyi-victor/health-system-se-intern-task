import mongoose from "mongoose";

// connect to mongodb database
const connectDB = async () => {
  const uri = String(process.env.MONGODB_URI);
  try {
    // initialize the connection
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;