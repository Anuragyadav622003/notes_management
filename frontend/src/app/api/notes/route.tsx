import { NextResponse } from "next/server";
import { z } from "zod";

// Define the Note type
type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

// In-memory storage for notes
const notes: Note[] = [];
let idCounter = 1;

// Schema for validating note input
const NoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

// GET: Fetch all notes
export async function GET() {
  return NextResponse.json(notes);
}

// POST: Create a new note
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = NoteSchema.parse(body); // Validate input

    const newNote: Note = {
      id: idCounter++,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    notes.push(newNote);
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}

// PUT: Update an existing note
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, content } = NoteSchema.extend({ id: z.number() }).parse(body); // Validate input

    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    notes[index] = {
      ...notes[index],
      title,
      content,
      updatedAt: new Date(),
    };

    return NextResponse.json(notes[index]);
  } catch (error) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}

// DELETE: Delete a note
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = z.object({ id: z.number() }).parse(body); // Validate input

    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const deletedNote = notes.splice(index, 1)[0];
    return NextResponse.json(deletedNote);
  } catch (error) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}