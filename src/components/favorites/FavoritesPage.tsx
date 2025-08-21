"use client";

import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/Redux/features/favoritesApiSlice";
import React, { useState } from "react";
import { RecipeCard } from "../recipes/recipe-card";
import { RecipeDetailsModal } from "../recipes/recipe-details-modal";
import { motion } from "framer-motion";

const FavoritesPage = () => {
  const [modalRecipeId, setModalRecipeId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: favorites = [], isLoading } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  // function to toggle favorite
  const handleFavoriteToggle = async (
    idMeal: string,
    newState: boolean,
    title: string,
    imageUrl: string
  ) => {
    try {
      if (newState) {
        // add to favorites
        await addFavorite({
          idMeal,
          strMeal: title,
          strMealThumb: imageUrl,
        }).unwrap();
      } else {
        // remove from favorites
        await removeFavorite(idMeal).unwrap();
      }
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading favorites...
        </p>
      </div>
    );
  }

  const handleViewDetails = (id: string) => {
    setModalRecipeId(id);
    setIsModalOpen(true);
  };

  const selectedRecipe = favorites.find((r) => r.idMeal === modalRecipeId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            ❤️ Favorite Recipes
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Your saved recipes in one place. Explore & cook with love.
          </p>
        </div>

        {/* Recipes Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((recipe, index) => (
              <motion.div
                key={recipe.idMeal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <RecipeCard
                  id={recipe.idMeal}
                  title={recipe.strMeal}
                  imageUrl={recipe.strMealThumb}
                  isFavorited={
                    recipe.status === true || recipe.status === "favorite"
                  }
                  onFavoriteToggle={(id, newState) =>
                    handleFavoriteToggle(
                      id,
                      newState,
                      recipe.strMeal,
                      recipe.strMealThumb
                    )
                  }
                  onViewDetails={handleViewDetails}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl font-semibold text-gray-500">
              No favorites added yet. ⭐
            </p>
            <p className="text-sm text-gray-400">
              Start exploring recipes and add them to your favorites.
            </p>
          </div>
        )}

        {/* Recipe Details Modal */}
        <RecipeDetailsModal
          idMeal={modalRecipeId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isFavorited={
            selectedRecipe?.status === true ||
            selectedRecipe?.status === "favorite"
          }
          onFavoriteToggle={(id, newState) =>
            selectedRecipe &&
            handleFavoriteToggle(
              id,
              newState,
              selectedRecipe.strMeal,
              selectedRecipe.strMealThumb
            )
          }
        />
      </div>
    </div>
  );
};

export default FavoritesPage;
