"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
     

      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to NoteApp
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Organize your thoughts, ideas, and tasks effortlessly with NoteApp.
          </p>
          <div className="space-x-4">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Create Notes
              </h3>
              <p className="text-gray-600">
                Easily create and save your notes in one place.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Edit Notes
              </h3>
              <p className="text-gray-600">
                Update and modify your notes anytime.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Organize Your Thoughts
              </h3>
              <p className="text-gray-600">
                Keep your ideas organized and accessible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 NoteApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}