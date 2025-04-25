import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/config";

// import error middleware functions
import { errorHandler, notFound } from "./middleware/error.middleware";

// import all routes
import authRoutes from "./routes/auth.routes";
import clientRoutes from "./routes/client.routes";
import programRoutes from "./routes/program.routes";

// Load environment variables from .env file
dotenv.config();

// call the connect to db function
connectDB();

// create an instance of express
const app = express();
const PORT = process.env.PORT || 5000;

// middleware to enable CORS
app.use(cors({
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
// middleware to parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET as string));

// middleware to parse JSON
app.use(express.json());
// middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// middleware to handle routes
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/programs", programRoutes);

// middleware for handling errors
app.use(errorHandler);
app.use(notFound);

// run the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});