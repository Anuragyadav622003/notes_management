'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Note } from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

interface NoteFormProps {
  editingNote: Note | null;
  setEditingNote: (note: Note | null) => void;
  fetchNotes: () => Promise<void>;
}

export function NoteForm({ editingNote, setEditingNote, fetchNotes }: NoteFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: editingNote?.title || '',
      content: editingNote?.content || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (editingNote) {
        await fetch('/api/notes', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingNote.id, ...values }),
        });
      } else {
        await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
      }
      await fetchNotes();
      setEditingNote(null);
      form.reset();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} className="bg-gray-50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter content"
                  {...field}
                  className="min-h-[150px] bg-gray-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {editingNote ? 'Update Note' : 'Add Note'}
          </Button>
          {editingNote && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditingNote(null);
                form.reset();
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}