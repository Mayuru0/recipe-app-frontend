"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { RecipeCategory } from "@/type/Recipes";
import Image from "next/image";
import { ChefHat, ArrowRight } from "lucide-react";

export function CategoryCard({ category }: { category: RecipeCategory }) {
  return (
    <Link href={`/categories/${category.strCategory}`} className="group block">
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
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating Elements */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <ChefHat className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Category</span>
            </div>
          </div>
          
          {/* Hover Action Button */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
          
          {/* Bottom Glow Effect */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <CardContent className="p-6 relative">
          {/* Category Title */}
          <div className="mb-3">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
              {category.strCategory}
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 group-hover:translate-x-0" />
          </div>
          
          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 group-hover:text-foreground/80 transition-colors duration-300">
            {category.strCategoryDescription}
          </p>
          
          {/* Bottom Action Area */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
              <span className="text-sm font-semibold">Explore recipes</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            
            {/* Decorative dots */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
              <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse delay-100" />
              <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse delay-200" />
            </div>
          </div>
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="w-full h-full bg-gradient-to-br from-transparent via-primary/5 to-transparent" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}