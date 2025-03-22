import { NextResponse } from 'next/server';

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

let notes: Note[] = [];
let idCounter = 1;

export async function GET() {
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const { title, content } = await request.json();
  const newNote: Note = {
    id: idCounter++,
    title,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  notes.push(newNote);
  return NextResponse.json(newNote, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, title, content } = await request.json();
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }

  notes[index] = {
    ...notes[index],
    title,
    content,
    updatedAt: new Date(),
  };

  return NextResponse.json(notes[index]);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }

  const deletedNote = notes.splice(index, 1)[0];
  return NextResponse.json(deletedNote);
}