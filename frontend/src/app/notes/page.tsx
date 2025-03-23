'use client';

import { useEffect, useState } from 'react';
import { NoteForm } from '@/components/note-form';
import { Button } from '@/components/ui/button';
import { Note } from '@/lib/utils';
import { fetchNotes, deleteNote } from '@/lib/api'; // Import API functions

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const loadNotes = async () => {
    try {
      const data = await fetchNotes();
      setNotes(Array.isArray(data.notes) ? data.notes : []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNote(id);
      await loadNotes(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
          <p className="text-gray-600">Organize your thoughts and ideas.</p>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <NoteForm
            editingNote={editingNote}
            setEditingNote={setEditingNote}
            fetchNotes={loadNotes}
          />
        </div>

        <div className="space-y-4">
          {notes.map((note,id) => (
            <div
              key={id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{note.title}</h2>
              <p className="text-gray-600 mb-4 whitespace-pre-wrap">{note.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div>
                  <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
                  <span className="mx-2">|</span>
                  <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingNote(note)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteNote(id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
