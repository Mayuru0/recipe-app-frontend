"use client";

import { Card, CardContent } from "@/components/ui/card";

import { RecipeCategory } from "@/type/Recipes";
import Image from "next/image";
import { ChefHat, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { selectuser } from "@/Redux/features/authSlice";

import { useRouter } from "next/navigation";
export function CategoryCard({ category }: { category: RecipeCategory }) {
 const user = useSelector(selectuser);
 const router = useRouter();

const handleClick = () => {
    if (user) {
      router.push(`/categories/${category.strCategory}`);
    } else {
      router.push("/auth/login"); // redirect to login if not logged in
    }
  };
  return (
    
    <div  onClick={handleClick} className="group block cursor-pointer">
      <Card className="overflow-hidden bg-white dark:bg-gray-900/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm group-hover:ring-2 group-hover:ring-primary/20">
        <div className="relative h-56 overflow-hidden">
          {/* Main Image */}
          <Image
            src={category.strCategoryThumb || "/placeholder.svg"}
            alt={category.strCategory || "Category"}
            width={500}
            height={500}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-black/5" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-black/40">
              <ChefHat className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Category</span>
            </div>
          </div>

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <div className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <CardContent className="p-6 relative">
          <div className="mb-3">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
              {category.strCategory}
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 group-hover:translate-x-0" />
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 group-hover:text-foreground/80 transition-colors duration-300">
            {category.strCategoryDescription}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
              <span className="text-sm font-semibold">Explore recipes</span>
              <ArrowRight className="w-4 h-4" />
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
              <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse delay-100" />
              <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse delay-200" />
            </div>
          </div>

          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="w-full h-full bg-gradient-to-br from-transparent via-primary/5 to-transparent" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
