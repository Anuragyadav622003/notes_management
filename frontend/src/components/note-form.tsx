"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/lib/utils";
import { toast } from "sonner";
import { createNote, updateNote } from "@/lib/api";

// ✅ Define form schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
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
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    form.reset({
      title: editingNote?.title || "",
      content: editingNote?.content || "",
    });
  }, [editingNote, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (editingNote) {
        await updateNote(editingNote._id, values.title, values.content); // ✅ Use `_id`
        toast.success("Note updated successfully!");
      } else {
        await createNote(values.title, values.content);
        toast.success("Note created successfully!");
      }

      await fetchNotes();
      setEditingNote(null);
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save note. Please try again.");
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
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
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
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit">{editingNote ? "Update Note" : "Add Note"}</Button>
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
