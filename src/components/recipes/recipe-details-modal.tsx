"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, ChefHat, ExternalLink, Play, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetRecipeByIdQuery } from "@/Redux/features/recipesApiSlice";
import { RecipeDetail } from "@/type/Recipes";
import Image from "next/image";
import { motion } from "framer-motion";

interface RecipeDetailsModalProps {
  idMeal: string | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorited?: boolean;
  onFavoriteToggle?: (recipeId: string, isFavorited: boolean) => void;
}

export function RecipeDetailsModal({
  idMeal,
  isOpen,
  onClose,
  isFavorited = false,
  onFavoriteToggle,
}: RecipeDetailsModalProps) {
  const [isLiked, setIsLiked] = useState(isFavorited);

  useEffect(() => {
    setIsLiked(isFavorited);
  }, [isFavorited]);

  const { data, isLoading } = useGetRecipeByIdQuery(idMeal!, { skip: !idMeal });
  const recipe =
    data && Array.isArray(data) && data.length > 0 ? data[0] : null;

  console.log("recipe", recipe);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!recipe) return;

    const newFavoriteState = !isLiked;
    setIsLiked(newFavoriteState);
    onFavoriteToggle?.(recipe.idMeal, newFavoriteState);
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

  if (!recipe)
    return isLoading ? (
      <div className="flex items-center justify-center h-64">Loading...</div>
    ) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[1400px] h-[95vh] p-0 overflow-hidden">
        <div className="flex flex-col lg:flex-row h-[95vh]">
          {/* Image Section */}
          <div className="relative lg:w-2/3 h-64 lg:h-full">
            <Image
              fill
              src={
                recipe.strMealThumb || "/placeholder.svg?height=400&width=600"
              }
              alt={recipe.strMeal}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 h-10 w-10 p-0 bg-white/90 hover:bg-white transition-colors cursor-pointer"
              onClick={handleFavoriteClick}
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors cursor-pointer",
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-600 "
                )}
              />
            </Button>

            {/* Category Badge */}
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
              {recipe.strCategory}
            </Badge>

            {/* Area Badge */}
            <Badge className="absolute top-16 left-4 bg-secondary text-secondary-foreground">
              <Globe className="h-3 w-3 mr-1" />
              {recipe.strArea}
            </Badge>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/3 flex flex-col h-full">
            <DialogHeader className="p-6 pb-4 flex-shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <DialogTitle className="font-serif text-2xl font-bold text-foreground mb-2">
                    {recipe.strMeal}
                  </DialogTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <ChefHat className="h-4 w-4" />
                    <span>{recipe.strArea} Cuisine</span>
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tags.map((tag: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </DialogHeader>

            <Separator className="flex-shrink-0" />

            {/* Scrollable Content */}
            <ScrollArea className="flex-1 overflow-hidden">
              <div className="px-6 py-6 space-y-6">
                {/* Quick Links */}
                <div className="flex gap-2">
                  {recipe.strYoutube && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => window.open(recipe.strYoutube, "_blank")}
                    >
                      <Play className="h-3 w-3" />
                      Watch Video
                    </Button>
                  )}
                  {recipe.strSource && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => window.open(recipe.strSource, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3" />
                      Source
                    </Button>
                  )}
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ChefHat className="h-5 w-5" />
                    Ingredients ({ingredients.length})
                  </h3>
                  <ul className="space-y-2">
                    {ingredients.map((ingredient: string, index: number) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-foreground capitalize">
                          {ingredient}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Instructions */}
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                    Instructions
                  </h3>
                  <div className="prose prose-sm max-w-none">
                    {recipe.strInstructions
                      .split("\r\n")
                      .filter((step: string) => step.trim())
                      .map((step: string, index: number) => (
                        <motion.div
                          key={index}
                          className="mb-3 p-3 bg-muted/30 rounded-lg"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <div className="flex items-start gap-3">
                            <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <p className="text-sm leading-relaxed m-0">
                              {step.trim()}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>

                {/* Recipe Metadata */}
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Recipe Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex">
                      <span className="font-medium">Category:</span>
                      <p className="text-muted-foreground">
                        {recipe.strCategory}
                      </p>
                    </div>
                    <div className="flex">
                      <span className="font-medium">Cuisine:</span>
                      <p className="text-muted-foreground">{recipe.strArea}</p>
                    </div>
                    {recipe.strMealAlternate && (
                      <div className="col-span-2">
                        <span className="font-medium">Alternative Name:</span>
                        <p className="text-muted-foreground">
                          {recipe.strMealAlternate}
                        </p>
                      </div>
                    )}
                    {recipe.dateModified && (
                      <div className="col-span-2">
                        <span className="font-medium">Last Modified:</span>
                        <p className="text-muted-foreground">
                          {new Date(recipe.dateModified).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Footer Actions */}
            <div className="p-6 pt-4 border-t flex-shrink-0 cursor-pointer">
              <div className="flex gap-3 cursor-pointer">
                <Button
                  variant={isLiked ? "default" : "outline"}
                  onClick={handleFavoriteClick}
                  className="flex-1 cursor-pointer"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4 mr-2 cursor-pointer",
                      isLiked && "fill-current"
                    )}
                  />
                  {isLiked ? "Saved to Favorites" : "Save Recipe"}
                </Button>
                {recipe.strYoutube && (
                  <Button
                    variant="secondary"
                    onClick={() => window.open(recipe.strYoutube, "_blank")}
                    className="cursor-pointer"
                  >
                    <Play className="h-4 w-4 mr-2 " />
                    Video
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="cursor-pointer"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
