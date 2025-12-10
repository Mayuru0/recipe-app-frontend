"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useLoginMutation } from "@/Redux/features/authApiSlice";
import { selectuser, setCredentials } from "@/Redux/features/authSlice";
import type { User, LoginResponse } from "@/type/user";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const user = useSelector(selectuser);
  const router = useRouter();

  // ✅ Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!trimmedPassword) {
      newErrors.password = "Password is required";
    } else if (trimmedPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    try {
      const response: LoginResponse = await login({
        email: email.trim(),
        password: password.trim(),
      }).unwrap();

      if (response?.user && response?.token) {
        dispatch(
          setCredentials({
            user: response.user as User,
            token: response.token as string,
          })
        );
        toast.success("✅ Login successful");
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err: unknown) {
  console.error("Login error:", err);

  const errorMessage =
    (err as { data?: { message?: string } })?.data?.message ||
    "Login failed. Please check your credentials and try again.";

  toast.error(errorMessage);
  setError(errorMessage);
}

  };

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="bg-white/15 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80 sm:w-96">
        <CardHeader className="space-y-1 mb-10">
          <CardTitle className="text-2xl font-serif text-center text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-white">
            Sign in to access your favorite recipes
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-white" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-400 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-white" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-white" />
                  ) : (
                    <Eye className="h-4 w-4 text-white" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-400 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full cursor-pointer hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-200">Don&apos;t have an account? </span>
            <Button
              variant="link"
              className="p-0 h-auto font-normal cursor-pointer hover:text-green-400"
              asChild
            >
              <a href="/auth/signup">Sign up</a>
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default LoginPage;
