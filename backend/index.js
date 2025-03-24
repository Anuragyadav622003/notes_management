import express from "express";
import cors from "cors";
import morgan from "morgan";

import dotenv from "dotenv";
import authRoute from "./src/router/auth-router.js"; // Ensure the file extension `.js`
 import connectDB from './src/model/db.js'// Ensure the database connection file uses `export`
import notesRoutes from './src/router/notesRoutes.js'
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000; // Provide a default port

// Middlewares
app.use(express.json());

// const allowedOrigins = [
//   "https://notes-management-2.onrender.com",
//   "http://localhost:3000" // For local development
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
      
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
//   })
// );
app.use(morgan("dev"));
app.use(cors());

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


