// controllers/notesController.js
import Note from "../model/Notes.js";

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming user ID is available in the request (from authentication middleware)

    const newNote = new Note({
      title,
      content,
      user: userId,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error: error.message });
  }
};

// List all notes with pagination & filters
export const getNotes = async (req, res) => {
  try {
    console.log("sdafdsaf")
    const userId = req.user.id; // Assuming user ID is available in the request
    const { page = 1, limit = 10, user } = req.query;

    const filters = { user: userId }; // Default filter: notes belong to the authenticated user
    if (user) {
      filters.user = user; // Filter by user ID if provided
    }

    const notes = await Note.find(filters)
      .sort({ createdAt: -1 }) // Sort by latest first
      .skip((page - 1) * limit) // Pagination: skip records
      .limit(Number(limit)); // Limit records per page

    const totalNotes = await Note.countDocuments(filters); // Total number of notes

    res.status(200).json({
      notes,
      totalNotes,
      totalPages: Math.ceil(totalNotes / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error: error.message });
  }
};

// Retrieve a single note by ID
export const getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;
     console.log(noteId,'hh')
    const note = await Note.findOne({ _id: noteId, user: userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error: error.message });
  }
};

// Update a note by ID
export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user: userId }, // Ensure the note belongs to the user
      { title, content },
      { new: true } // Return the updated note
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error: error.message });
  }
};

// Delete a note by ID
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const deletedNote = await Note.findOneAndDelete({ _id: noteId, user: userId });
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error: error.message });
  }
};