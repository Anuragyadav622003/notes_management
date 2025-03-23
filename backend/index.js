import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoute from "./router/auth-router.js"; // Ensure the file extension `.js`
 import connectDB from './model/Db.js'// Ensure the database connection file uses `export`
import notesRoutes from './router/notesRoutes.js'
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000; // Provide a default port

// Middlewares
app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow frontend URL
//     credentials: true, // Allow sending cookies/auth headers
//   })
// );
app.use(cors());
app.use(morgan("dev"));

// Test Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Routes
app.use("/api/auth", authRoute);

//notes rotes
app.use("/api/notes",notesRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});