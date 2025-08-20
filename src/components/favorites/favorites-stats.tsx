import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, Star, ChefHat } from "lucide-react"

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
}

interface FavoritesStatsProps {
  favorites: Recipe[]
}

export function FavoritesStats({ favorites }: FavoritesStatsProps) {
  if (favorites.length === 0) {
    return null
  }

  const totalCookTime = favorites.reduce((sum, recipe) => sum + recipe.cookTime, 0)
  const averageRating = favorites.reduce((sum, recipe) => sum + recipe.rating, 0) / favorites.length
  const totalServings = favorites.reduce((sum, recipe) => sum + recipe.servings, 0)
  const categories = new Set(favorites.map((recipe) => recipe.category)).size

  const stats = [
    {
      icon: Clock,
      label: "Total Cook Time",
      value: `${Math.round(totalCookTime / 60)}h ${totalCookTime % 60}m`,
      description: "Combined cooking time",
    },
    {
      icon: Star,
      label: "Average Rating",
      value: averageRating.toFixed(1),
      description: "Across all favorites",
    },
    {
      icon: Users,
      label: "Total Servings",
      value: totalServings.toString(),
      description: "People you can feed",
    },
    {
      icon: ChefHat,
      label: "Categories",
      value: categories.toString(),
      description: "Different cuisines",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.description}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
