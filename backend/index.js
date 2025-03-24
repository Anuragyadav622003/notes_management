import express from 'express'
import cors from "cors";
import morgan from "morgan";

import dotenv from "dotenv";
import authRoute from "./src/router/auth-router.js"; // Ensure the file extension `.js`
 import connectDB from './src/model/db.js'// Ensure the database connection file uses `export`
import notesRoutes from './src/router/notesRoutes.js'
dotenv.config();
connectDB();
const app = express();
//const port = process.env.PORT || 5000; // Provide a default port

// Middlewares
app.use(express.json());

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
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });




