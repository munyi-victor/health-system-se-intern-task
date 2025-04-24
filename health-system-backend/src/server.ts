import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// create an instance of express
const app = express();
const PORT = process.env.PORT || 5000;

// middleware to enable CORS
app.use(cors({
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// run the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});