"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Clock, Users, Star, ChefHat } from "lucide-react"
import { cn } from "@/lib/utils"

interface Recipe {
  id: string
  title: string
  description: string
  imageUrl: string
  cookTime: number
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  rating: number
  category: string
  ingredients: string[]
  instructions: string[]
}

interface RecipeDetailsModalProps {
  recipe: Recipe | null
  isOpen: boolean
  onClose: () => void
  isFavorited?: boolean
  onFavoriteToggle?: (recipeId: string, isFavorited: boolean) => void
}

export function RecipeDetailsModal({
  recipe,
  isOpen,
  onClose,
  isFavorited = false,
  onFavoriteToggle,
}: RecipeDetailsModalProps) {
  const [isLiked, setIsLiked] = useState(isFavorited)

  const handleFavoriteClick = () => {
    if (!recipe) return
    const newFavoriteState = !isLiked
    setIsLiked(newFavoriteState)
    onFavoriteToggle?.(recipe.id, newFavoriteState)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  if (!recipe) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Section */}
          <div className="relative lg:w-1/2 h-64 lg:h-auto">
            <img
              src={recipe.imageUrl || "/placeholder.svg?height=400&width=600"}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 h-10 w-10 p-0 bg-white/90 hover:bg-white transition-colors"
              onClick={handleFavoriteClick}
            >
              <Heart
                className={cn("h-5 w-5 transition-colors", isLiked ? "fill-red-500 text-red-500" : "text-gray-600")}
              />
            </Button>

            {/* Category Badge */}
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{recipe.category}</Badge>

            {/* Rating */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 rounded-full px-3 py-1.5">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">{recipe.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 flex flex-col">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <DialogTitle className="font-serif text-2xl font-bold text-foreground mb-2">
                    {recipe.title}
                  </DialogTitle>
                  <p className="text-muted-foreground leading-relaxed">{recipe.description}</p>
                </div>
                <Badge variant="outline" className={getDifficultyColor(recipe.difficulty)}>
                  {recipe.difficulty}
                </Badge>
              </div>
            </DialogHeader>

            {/* Recipe Stats */}
            <div className="px-6 pb-4">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.cookTime} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="h-4 w-4" />
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Scrollable Content */}
            <ScrollArea className="flex-1 px-6">
              <div className="py-6 space-y-6">
                {/* Ingredients */}
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Ingredients</h3>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-foreground capitalize">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Instructions */}
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Instructions</h3>
                  <ol className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-4 text-sm">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="text-foreground leading-relaxed">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </ScrollArea>

            {/* Footer Actions */}
            <div className="p-6 pt-4 border-t">
              <div className="flex gap-3">
                <Button variant={isLiked ? "default" : "outline"} onClick={handleFavoriteClick} className="flex-1">
                  <Heart className={cn("h-4 w-4 mr-2", isLiked && "fill-current")} />
                  {isLiked ? "Saved to Favorites" : "Save Recipe"}
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
