"use client";

import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const { data, error, mutate } = useSWR("", fetcher);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
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
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Empty state: No notes available
  if (!data.notes || data.notes.length === 0) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Notes</h1>

        {/* Empty State */}
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Notes Yet</h2>
          <p className="text-gray-600">You haven&apos;t created any notes yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Notes</h1>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.notes.map((note: any) => (
          <Card
            key={note.id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{note.title}</h2>
            <p className="text-gray-600 mb-4 whitespace-pre-wrap">{note.content}</p>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() => {
                  // Handle edit action (e.g., redirect to edit page)
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={async () => {
                  await fetch(`/api/notes/${note.id}`, { method: "DELETE" });
                  mutate(); // Revalidate the data
                }}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}