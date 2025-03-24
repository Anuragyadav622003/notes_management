// routes/notesRoutes.js
import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controller/notesController.js";
import { protect } from "../middleware/authMiddleware.js"; // Example: Authentication middleware

const router = express.Router();

// Protected routes (require authentication)
router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.get("/:id", protect, getNoteById);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;