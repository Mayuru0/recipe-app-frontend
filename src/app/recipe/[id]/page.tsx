"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Login from "../../../../public/assets/1.jpg";

import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/Redux/features/favoritesApiSlice";
import { useState, useMemo } from "react";
import { Recipe } from "@/type/Recipes";
import { useGetRecipesByCategoryQuery } from "@/Redux/features/recipesApiSlice";

import Recipesearch from "@/components/recipes/recipesearch";

const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  
  // Fetch favorites
  const { data: favoritesData } = useGetFavoritesQuery();
  const favorites = Array.isArray(favoritesData) ? favoritesData : [];

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

// Toggle favorite handler - now accepts all necessary parameters
  const handleFavoriteToggle = async (
    idMeal: string,
    newState: boolean,
    title: string,
    imageUrl: string
  ) => {
    try {
      if (newState) {
        // Add to favorites
        const res = await addFavorite({ 
          idMeal, 
          strMeal: title, 
          strMealThumb: imageUrl 
        }).unwrap();
        console.log("Added to favorites:", res);
      } else {
        // Remove from favorites
        const res = await removeFavorite(idMeal).unwrap();
        console.log("Removed from favorites:", res);
      }
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/2 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh]">
        <Image
          src={Login}
          alt="Login Background"
          className="object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recipes
          </h1>
          <p className="text-gray-200 text-lg">
            Discover recipes by category and cuisine
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 z-10">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
          </Button>

          {/* Recipesearch */}
          <Recipesearch
            idMeal={id}
            isFavorited={favorites.some((fav) => fav.idMeal === id)}
            onFavoriteToggle={handleFavoriteToggle}
        
          />
        </div>
      </main>
    </div>
  );
};

export default RecipeDetailsPage;
