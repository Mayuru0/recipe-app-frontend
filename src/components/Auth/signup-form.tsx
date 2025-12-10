"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react"
import { useRegisterMutation } from "@/Redux/features/authApiSlice"
import toast from "react-hot-toast"

interface SubmitError {
  data?: {
    message?: string;
  };
}


const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const router = useRouter()

  const validateForm = () => {
  const newErrors: Record<string, string> = {}

  // Trim all fields to avoid accidental spaces
  formData.name = formData.name.trim()
  formData.email = formData.email.trim()

  // Full Name
  if (!formData.name) newErrors.name = "Full name is required"
  else if (formData.name.length < 3)
    newErrors.name = "Full name must be at least 3 characters"
  else if (!/^[A-Za-z\s]+$/.test(formData.name))
    newErrors.name = "Full name must contain only letters"

  // Email
  if (!formData.email) newErrors.email = "Email is required"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    newErrors.email = "Please enter a valid email address"

  // Password
  if (!formData.password) newErrors.password = "Password is required"
  else if (formData.password.length < 8)
    newErrors.password = "Password must be at least 8 characters"
  else if (!/[A-Z]/.test(formData.password))
    newErrors.password = "Password must include at least one uppercase letter"
  else if (!/[a-z]/.test(formData.password))
    newErrors.password = "Password must include at least one lowercase letter"
  else if (!/[0-9]/.test(formData.password))
    newErrors.password = "Password must include at least one number"
  else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password))
    newErrors.password = "Password must include at least one special character"

  // Confirm Password
  if (!formData.confirmPassword)
    newErrors.confirmPassword = "Please confirm your password"
  else if (formData.password !== formData.confirmPassword)
    newErrors.confirmPassword = "Passwords do not match"

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}


  const [register, { isLoading }] = useRegisterMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }).unwrap()

      if (response) {
        toast.success("Account created successfully")
        router.push("/auth/login")
      }
    } catch (err: unknown) {
    const error = err as SubmitError;
    console.error(error);
    setError(error?.data?.message || "Account creation failed");
    toast.error(error?.data?.message || "Account creation failed");
  }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="bg-white/15 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80 sm:w-96">
        <CardHeader className="space-y-1 mb-10">
          <CardTitle className="text-2xl font-serif text-center text-white">Create Account</CardTitle>
          <CardDescription className="text-center text-white">
            Join us to start saving your favorite recipes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Full Name */}
            <div className="space-y-3">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-white" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-3">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-white" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-3">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-white" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10"
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
                    <EyeOff className="h-4 w-4 text-white" />
                  ) : (
                    <Eye className="h-4 w-4 text-white" />
                  )}
                </Button>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-white" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-white" />
                  ) : (
                    <Eye className="h-4 w-4 text-white" />
                  )}
                </Button>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full cursor-pointer hover:bg-green-600" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-100">Already have an account? </span>
            <Button
              variant="link"
              className="p-0 h-auto font-normal cursor-pointer hover:text-green-400"
              asChild
            >
              <a href="/auth/login">Sign in</a>
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  )
}

export default SignupPage
