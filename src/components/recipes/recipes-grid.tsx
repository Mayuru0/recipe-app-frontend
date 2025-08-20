"use client"

import { RecipeCard } from "./recipe-card"

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
  isFavorited?: boolean
}

interface RecipesGridProps {
  recipes: Recipe[]
  onFavoriteToggle?: (id: string, isFavorited: boolean) => void
  onViewDetails?: (id: string) => void
}

export function RecipesGrid({ recipes, onFavoriteToggle, onViewDetails }: RecipesGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <span className="text-4xl">🍳</span>
          </div>
          <h2 className="font-serif text-2xl font-semibold mb-4">No Recipes Found</h2>
          <p className="text-muted-foreground">
            We couldn't find any recipes matching your criteria. Try adjusting your search or browse other categories.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} {...recipe} onFavoriteToggle={onFavoriteToggle} onViewDetails={onViewDetails} />
      ))}
    </div>
  )
}
