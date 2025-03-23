"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth(); // Assuming user data is fetched from context
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={user?.avatar || "https://via.placeholder.com/150"} alt={user?.name} />
            <AvatarFallback>
              <User className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl font-semibold">{user?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 border p-2 rounded-md bg-gray-50">
            <User className="text-gray-500" />
            <Input value={user?.name} readOnly className="border-none bg-transparent" />
          </div>
          <div className="flex items-center gap-2 border p-2 rounded-md bg-gray-50">
            <Mail className="text-gray-500" />
            <Input value={user?.email} readOnly className="border-none bg-transparent" />
          </div>
          <Button variant="default" className="w-full">Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
