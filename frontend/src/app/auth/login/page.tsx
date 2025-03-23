"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { loginUser } from "@/lib/api";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

// Zod Validation Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
   const {login} = useAuth();
   const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const response = await loginUser(data.email, data.password);
      console.log("User logged in:", response);
      toast.success("Login successful!"); // Success toast
 // Call the login function from AuthContext
 await login(response.token, response.user);
       router.push('/');//
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);

      // Handle specific error for invalid credentials
      if (error.response?.status === 400 && error.response?.data?.message === "Invalid email or password") {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl md:text-3xl font-semibold">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 w-full"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 w-full"
                  {...register("password")}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign In"}
            </Button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm sm:text-base text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <a href="/auth/register" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}