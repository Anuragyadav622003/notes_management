import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = "https://notes-management-prg8.onrender.com/api";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for handling authentication cookies
  headers: { "Content-Type": "application/json" },
});

// ✅ Automatically attach Authorization header if token is available
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") { // Check if running in the browser
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ Global error handler
const handleApiError = (error: any) => {
  const message = error.response?.data?.message || "Something went wrong. Please try again.";
  toast.error(message);
  throw new Error(message); // Rethrow the error for further handling
};

// ✅ Register User
export async function registerUser(name: string, email: string, password: string) {
  try {
    
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  } catch (error) {
    handleApiError(error);
    console.log(error)
  }
}

// ✅ Login User
export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Store token
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// ✅ Fetch Notes
export async function fetchNotes(page = 1) {
    try {
      const response = await api.get(`/notes?page=${page}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
  
  // ✅ Create Note
  export async function createNote(title: string, content: string) {
    try {
        
      const response = await api.post("/notes", { title, content });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
  
  // ✅ Update Note
  export async function updateNote(id: string, title: string, content: string) {
    try {
      const response = await api.put(`/notes/${id}`, { title, content });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
  
  // ✅ Delete Note
  export async function deleteNote(id: string) {
    try {
      const response = await api.delete(`/notes/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }