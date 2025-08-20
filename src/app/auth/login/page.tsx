import LoginPage from "@/components/Auth/login-form";


export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
         <LoginPage />
      </div>
    </div>
  )
}
