"use client";

import useSWR from "swr";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileText, Edit, Trash } from "lucide-react";
import { fetchNotes, deleteNote } from "@/lib/api";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { NoteForm } from "@/components/note-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  notes: Note[];
}

export default function DashboardPage() {
  const { data, error, mutate } = useSWR<ApiResponse>("/api/notes", fetchNotes);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Explicitly use `error` to prevent linting warning
  if (error) {
    console.error("Error fetching notes:", error);
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <AlertTitle className="text-red-700">Error</AlertTitle>
          <AlertDescription>Failed to load notes. Please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Skeleton className="h-28 w-full rounded-lg bg-gray-200" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (!data.notes || data.notes.length === 0) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
          <FileText className="h-24 w-24 text-gray-400 mx-auto" />
        </motion.div>
        <h2 className="text-xl font-semibold text-gray-900 mt-4">No Notes Available</h2>
        <p className="text-gray-600">Start by adding a new note.</p>
      </div>
    );
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      mutate();
      toast.success("Note deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete note. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">Your Notes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.notes?.map((note) => (
          <motion.div key={note._id} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
            <Card className="p-6 border rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-50 to-blue-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{note.title}</h2>
              <p className="text-gray-700 mb-4 text-sm md:text-base whitespace-pre-wrap">{note.content}</p>
              <div className="text-xs text-gray-500 mb-4">
                <p>📅 Created: {new Date(note.createdAt).toLocaleString()}</p>
                <p>📝 Updated: {new Date(note.updatedAt).toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <Button size="sm" onClick={() => handleEditNote(note)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                  <Edit className="h-5 w-5 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteNote(note._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center">
                  <Trash className="h-5 w-5 mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal for Editing Note */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingNote ? "Edit Note" : "Add Note"}</DialogTitle>
          </DialogHeader>
          <NoteForm
            editingNote={editingNote}
            setEditingNote={(note) => {
              setEditingNote(note);
              if (!note) setIsModalOpen(false);
            }}
            fetchNotes={mutate}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
