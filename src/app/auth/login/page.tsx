import LoginPage from "@/components/Auth/login-form";
import Login from "../../../../public/assets/1.jpg";
import Image from "next/image";

export default function Page() {
  return (
  <div className="min-h-screen w-full relative overflow-hidden -mt-[20%] md:-mt-[6.9%] lg:-mt-[6%] xl:-mt-[3.4%]">
      {/* Background image - full screen */}
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

      {/* Login form section - centered overlay */}
      <div className="relative z-10 flex min-h-screen items-center justify-center w-full px-4 py-8">
        <div className="w-full max-w-md">
          <LoginPage />
        </div>
      </div>
    </div>
  );
}