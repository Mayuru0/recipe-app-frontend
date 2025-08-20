"use client"

import { useState } from "react"
import { RecipesGrid } from "@/components/recipes/recipes-grid"
import { RecipeDetailsModal } from "@/components/recipes/recipe-details-modal"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getRecipesByCategory, getRecipeById } from "@/lib/mock-data"
import { useFavorites } from "@/hooks/use-favorites"

interface CategoryPageProps {
  params: {
    id: string
  }
}

// Category data mapping
const categoryData: Record<string, { name: string; description: string; color: string }> = {
  italian: {
    name: "Italian",
    description: "Classic pasta dishes, authentic pizzas, and traditional Italian comfort food",
    color: "#059669",
  },
  asian: {
    name: "Asian",
    description: "Flavorful stir-fries, aromatic curries, and fresh noodle dishes from across Asia",
    color: "#10b981",
  },
  desserts: {
    name: "Desserts",
    description: "Sweet treats, decadent cakes, and delightful pastries for every occasion",
    color: "#059669",
  },
  healthy: {
    name: "Healthy",
    description: "Nutritious salads, protein-packed bowls, and wholesome meals for wellness",
    color: "#10b981",
  },
  "quick-meals": {
    name: "Quick Meals",
    description: "Fast and easy recipes ready in 30 minutes or less for busy weeknights",
    color: "#059669",
  },
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null)

  const category = categoryData[params.id]
  const recipes = getRecipesByCategory(params.id.replace("-", " "))
  const selectedRecipe = selectedRecipeId ? getRecipeById(selectedRecipeId) : null

  const handleFavoriteToggle = (recipeId: string, isFavorited: boolean) => {
    toggleFavorite(recipeId)
  }

  const handleViewDetails = (recipeId: string) => {
    setSelectedRecipeId(recipeId)
  }

  const handleCloseModal = () => {
    setSelectedRecipeId(null)
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
       
        <main className="container mx-auto px-4 py-8 text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Category Not Found</h1>
          <Button asChild>
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
          </Button>
        </main>
      </div>
    )
  }

  const recipesWithFavorites = recipes.map((recipe) => ({
    ...recipe,
    isFavorited: isFavorite(recipe.id),
  }))

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
          </Button>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-serif text-4xl font-bold text-foreground">{category.name} Recipes</h1>
            <span className="text-muted-foreground">({recipes.length} recipes)</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">{category.description}</p>
        </div>

        <RecipesGrid
          recipes={recipesWithFavorites}
          onFavoriteToggle={handleFavoriteToggle}
          onViewDetails={handleViewDetails}
        />

        <RecipeDetailsModal
          recipe={selectedRecipe}
          isOpen={!!selectedRecipeId}
          onClose={handleCloseModal}
          isFavorited={selectedRecipe ? isFavorite(selectedRecipe.id) : false}
          onFavoriteToggle={handleFavoriteToggle}
        />
      </main>
    </div>
  )
}
