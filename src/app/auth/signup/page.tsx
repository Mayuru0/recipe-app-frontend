import SignupPage from "@/components/Auth/signup-form";
import Image from "next/image";
import Login from "../../../../public/assets/1.jpg";



export default function Page() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden ">
     
      <div className="absolute inset-0 w-full h-full ">
        <Image
          src={Login}
          alt="Login Background" 
          className="h-full w-full object-cover"
          fill
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      
      <div className="relative z-10 flex min-h-screen items-center justify-center w-full px-4 py-8">
        <div className="w-full max-w-md">
       <SignupPage />
      </div>
    </div>
    </div>
  )
}
