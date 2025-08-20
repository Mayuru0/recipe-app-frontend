"use client"

import { RecipeCard } from "@/components/recipes/recipe-card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

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

interface FavoritesGridProps {
  favorites: Recipe[]
  onRemoveFromFavorites?: (id: string) => void
  onViewDetails?: (id: string) => void
}

export function FavoritesGrid({ favorites, onRemoveFromFavorites, onViewDetails }: FavoritesGridProps) {
  const handleFavoriteToggle = (id: string, isFavorited: boolean) => {
    if (!isFavorited && onRemoveFromFavorites) {
      onRemoveFromFavorites(id)
    }
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="font-serif text-2xl font-semibold mb-4">No Favorite Recipes Yet</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Start exploring our recipe collection and save your favorites by clicking the heart icon on any recipe card.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/categories">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Browse Recipes
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/recipes">View All Recipes</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">Your Favorite Recipes</h2>
          <p className="text-muted-foreground">
            {favorites.length} recipe{favorites.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/categories">Add More Recipes</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            {...recipe}
            isFavorited={true}
            onFavoriteToggle={handleFavoriteToggle}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  )
}
