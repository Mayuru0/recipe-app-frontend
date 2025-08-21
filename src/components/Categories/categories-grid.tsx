"use client";

import { useGetCategoriesQuery } from "@/Redux/features/recipesApiSlice";
import { CategoryCard } from "./CategorieCard";
import { RecipeCategory } from "@/type/Recipes";



function CategoryCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-48 bg-gray-700"></div>

      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded mb-2"></div>

        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
}

export function CategoriesGrid() {
  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();

  

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 text-lg font-semibold">
        Failed to load categories.
      </p>
    );
  }

 return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {(categories as RecipeCategory[])
      .filter((_, index) => index !== 4) 
      .slice(0, 6) 
      .map((category) => (
        <CategoryCard key={category.idCategory} category={category} />
      ))}
  </div>
);


}
