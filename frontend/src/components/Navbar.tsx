"use client";

import Link from "next/link";
import { NotebookText, LogOut, User, LayoutDashboard, LogIn, Menu } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white shadow-sm w-full fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            NoteApp
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button asChild variant="ghost" className="flex items-center gap-2">
                  <Link href="/notes">
                    <NotebookText className="h-5 w-5" />
                    Add Notes
                  </Link>
                </Button>

                <Button asChild variant="ghost" className="flex items-center gap-2">
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild variant="outline">
                <Link href="/auth/login">
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col space-y-4 bg-white shadow-md p-4 rounded-md">
            {isAuthenticated ? (
              <>
                <Link href="/notes" className="flex items-center gap-2 text-gray-700">
                  <NotebookText className="h-5 w-5" />
                  Add Notes
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 text-gray-700">
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link href="/profile" className="flex items-center gap-2 text-gray-700">
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="flex items-center gap-2 text-gray-700">
                <LogIn className="h-5 w-5" />
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
