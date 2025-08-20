import Image from "next/image";
import React from "react";
import Login from "../../../public/assets/1.jpg";
import { Badge } from "../ui/badge";
import { ChefHat } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
const Hero1 = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col justify-center items-center ">
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

      {/* Hero Section */}
      <section className="relative py-20 px-4  flex flex-col justify-center items-center">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <ChefHat className="h-3 w-3 mr-1" />
            Discover Amazing Recipes
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white  mb-6">
            Your Culinary Journey
            <br />
            <span className="text-[#007C4C]">Starts Here</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore thousands of delicious recipes from around the world. Save
            your favorites, discover new cuisines, and create memorable meals
            for every occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild>
              <Link href="/categories">Browse Categories</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth/signup">Join Free Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero1;
