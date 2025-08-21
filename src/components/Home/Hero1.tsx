"use client";
import { motion } from "framer-motion";

import Image from "next/image";
import React from "react";
import Login from "../../../public/assets/1.jpg";
import { Badge } from "../ui/badge";
import { ChefHat } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectuser } from "@/Redux/features/authSlice";
const Hero1 = () => {
  const user = useSelector(selectuser);
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col justify-center items-center ">
  
      <div className="absolute inset-0 w-full h-full ">
        <Image
          src={Login}
          alt="Login Background"
          className="h-full w-full object-cover"
          fill
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative py-20 px-4 flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Badge variant="secondary" className="mb-4">
              <ChefHat className="h-3 w-3 mr-1" />
              Discover Amazing Recipes
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-serif text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Your Culinary Journey
            <br />
            <span className="text-[#007C4C]">Starts Here</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Explore thousands of delicious recipes from around the world. Save
            your favorites, discover new cuisines, and create memorable meals
            for every occasion.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" asChild>
              <Link href="/categories">Browse Categories</Link>
            </Button>
            {user ? (
              <Button variant="outline" size="lg" asChild>
                <Link href="/favorites">View Favorite Recipes</Link>
              </Button>
            ) : (
              <Button variant="outline" size="lg" asChild>
                <Link href="/auth/signup">Join Free Today</Link>
              </Button>
            )}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Hero1;
