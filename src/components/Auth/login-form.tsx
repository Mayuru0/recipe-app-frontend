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
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const user = useSelector(selectuser);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response: LoginResponse = await login({ email, password }).unwrap();

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
    } catch (err) {
      console.error("Login error details:", err);
      toast.error("❌ Login failed. Please check your credentials.");
      setError("Login failed");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="bg-white/15 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80  sm:w-96">
        <CardHeader className="space-y-1 mb-10">
          <CardTitle className="text-2xl font-serif text-center text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-white">
            Sign in to access your favorite recipes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2 text-white ">
              <Label htmlFor="email">Email</Label>
              <div className="relative text-white">
                <Mail className="absolute left-3 top-3 h-4 w-4 " />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2 text-white">
              <Label htmlFor="password">Password</Label>
              <div className="relative text-white">
                <Lock className="absolute left-3 top-3 h-4 w-4 " />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  disabled={isLoading}
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
                    <EyeOff className="h-4 w-4 text-white " />
                  ) : (
                    <Eye className="h-4 w-4 text-white" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer"
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

            <Button variant="link" className="p-0 h-auto font-normal" asChild>
              <a href="/auth/signup">Sign up</a>
            </Button>
          </div>
          {/* <div className="mt-2 text-center text-xs text-gray-100">
          <p>Demo: Use any email and password to sign in</p>
        </div> */}
        </CardContent>
      </div>
    </div>
  );
};

export default LoginPage;
