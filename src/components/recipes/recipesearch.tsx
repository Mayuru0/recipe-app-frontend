"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, ChefHat, ExternalLink, Play, Globe, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetRecipeByIdQuery } from "@/Redux/features/recipesApiSlice";
import { RecipeDetail } from "@/type/Recipes";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Recipesearch {
  idMeal: string | null;
  isFavorited?: boolean;
  onFavoriteToggle?: (recipeId: string, isFavorited: boolean, title: string, imageUrl: string) => void;
}

const Recipesearch: React.FC<Recipesearch> = ({
  idMeal,
  isFavorited = false,
  onFavoriteToggle,
}) => {
  const [isLiked, setIsLiked] = useState(isFavorited);

  useEffect(() => {
    setIsLiked(isFavorited);
  }, [isFavorited]);

  const { data, isLoading } = useGetRecipeByIdQuery(idMeal!, { skip: !idMeal });
  const recipe = data && Array.isArray(data) && data.length > 0 ? data[0] : null;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!recipe) return;

    const newState = !isLiked;
    setIsLiked(newState);
    
    onFavoriteToggle?.(
      recipe.idMeal,
      newState,
      recipe.strMeal,
      recipe.strMealThumb
    );
  };

  // Extract ingredients dynamically
  const ingredients = useMemo(() => {
    if (!recipe) return [];
    const result: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof RecipeDetail]
        ?.toString()
        .trim();
      const measure = recipe[`strMeasure${i}` as keyof RecipeDetail]
        ?.toString()
        .trim();
      if (ingredient)
        result.push(measure ? `${measure} ${ingredient}` : ingredient);
    }
    return result;
  }, [recipe]);

  // Extract tags
  const tags = useMemo(() => {
    if (!recipe?.strTags) return [];
    return recipe.strTags
      .split(",")
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag);
  }, [recipe]);

  if (!recipe) {
    return isLoading ? (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <ChefHat className="h-16 w-16 text-amber-600 mx-auto" />
          </motion.div>
          <p className="text-lg font-medium text-gray-700">Preparing your recipe...</p>
        </motion.div>
      </div>
    ) : (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        Recipe not found
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-3/5 lg:sticky lg:top-8 lg:self-start"
          >
            <div className="relative h-[400px] lg:h-[85vh] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                fill
                src={recipe.strMealThumb || "/placeholder.svg?height=400&width=600"}
                alt={recipe.strMeal}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Floating Action Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-6 right-6 h-14 w-14 p-0 bg-white/95 hover:bg-white backdrop-blur-sm transition-all shadow-lg rounded-full cursor-pointer"
                  onClick={handleFavoriteClick}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isLiked ? "liked" : "unliked"}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Heart
                        className={cn(
                          "h-6 w-6 transition-colors",
                          isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                        )}
                      />
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </motion.div>

              {/* Category & Area Badges */}
              <div className="absolute top-6 left-6 space-y-3">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg px-4 py-2 text-sm font-semibold">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {recipe.strCategory}
                </Badge>

                <Badge className="bg-white/95 text-gray-800 border-0 shadow-lg backdrop-blur-sm px-4 py-2 text-sm font-semibold flex items-center gap-2">
                  <Globe className="h-3 w-3" />
                  {recipe.strArea}
                </Badge>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg"
                >
                  {recipe.strMeal}
                </motion.h1>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5" />
                    <span className="text-sm font-medium">{recipe.strArea} Cuisine</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-2/5 flex flex-col"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col h-full">
              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((tag: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge
                        variant="outline"
                        className="text-xs border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Quick Links */}
              <div className="flex gap-3 mb-6">
                {recipe.strYoutube && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(recipe.strYoutube, "_blank")}
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Video Tutorial
                  </Button>
                )}
                {recipe.strSource && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(recipe.strSource, "_blank")}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Source
                  </Button>
                )}
              </div>

              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-8">
                  {/* Ingredients */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg">
                          <ChefHat className="h-5 w-5 text-white" />
                        </div>
                        Ingredients
                      </h3>
                      <Badge className="bg-amber-100 text-amber-700 border-0">
                        {ingredients.length} items
                      </Badge>
                    </div>
                    <ul className="space-y-3">
                      {ingredients.map((ingredient, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-amber-50 transition-colors group"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.03 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="text-sm text-gray-700 capitalize leading-relaxed">
                            {ingredient}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <Separator className="bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

                  {/* Instructions */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      Instructions
                    </h3>
                    <div className="space-y-4">
                      {recipe.strInstructions
                        .split("\r\n")
                        .filter((step: string) => step.trim())
                        .map((step: string, index: number) => (
                          <motion.div
                            key={index}
                            className="relative p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 hover:shadow-md transition-all group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                          >
                            <div className="flex items-start gap-4">
                              <span className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                                {index + 1}
                              </span>
                              <p className="text-sm leading-relaxed text-gray-700 pt-1">
                                {step.trim()}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Footer Actions */}
              <div className="pt-6 mt-6 border-t border-amber-100 flex gap-3">
                <Button
                  variant={isLiked ? "default" : "outline"}
                  onClick={handleFavoriteClick}
                  className={cn(
                    "flex-1 font-semibold transition-all shadow-md hover:shadow-lg",
                    isLiked 
                      ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600" 
                      : "border-2 border-red-200 text-red-600 hover:bg-red-50"
                  )}
                >
                  <Heart className={cn("h-4 w-4 mr-2", isLiked && "fill-current")} />
                  {isLiked ? "Saved to Favorites" : "Save Recipe"}
                </Button>

                {recipe.strYoutube && (
                  <Button
                    variant="secondary"
                    onClick={() => window.open(recipe.strYoutube, "_blank")}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Video
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Recipesearch;