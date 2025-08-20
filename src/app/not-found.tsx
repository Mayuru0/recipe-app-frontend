import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import Login from "../../public/assets/1.jpg";

const Custom404 = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={Login}
          alt="Background"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Centered 404 card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white/20 backdrop-blur-xl p-8 shadow-2xl border border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-3xl">
          <div className="text-center">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <AlertTriangle
                size={90}
                className="animate-bounce text-red-500 drop-shadow-lg"
                strokeWidth={1.5}
              />
            </div>

            {/* 404 Text */}
            <h1 className="mb-4 text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 drop-shadow-md">
              404
            </h1>

            <h2 className="mb-4 text-3xl font-bold text-gray-100 drop-shadow">
              Page Not Found
            </h2>

            <p className="mb-6 text-gray-300">
              Oops! The page you&apos;re looking for seems to have wandered off
              into the digital wilderness.
            </p>

            {/* Return Home Button */}
            <Link
              href="/"
              className="inline-block rounded-full bg-gradient-to-r from-red-600 to-red-800 px-8 py-3 text-lg font-bold text-white shadow-lg shadow-red-600/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-700/70"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
