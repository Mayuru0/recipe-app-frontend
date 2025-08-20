"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Clock, Users, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RecipeCardProps {
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
  onFavoriteToggle?: (id: string, isFavorited: boolean) => void
  onViewDetails?: (id: string) => void
}

export function RecipeCard({
  id,
  title,
  description,
  imageUrl,
  cookTime,
  servings,
  difficulty,
  rating,
  category,
  isFavorited = false,
  onFavoriteToggle,
  onViewDetails,
}: RecipeCardProps) {
  const [isLiked, setIsLiked] = useState(isFavorited)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newFavoriteState = !isLiked
    setIsLiked(newFavoriteState)
    onFavoriteToggle?.(id, newFavoriteState)
  }

  const handleCardClick = () => {
    onViewDetails?.(id)
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

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <div className="relative" onClick={handleCardClick}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg?height=200&width=300"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white transition-colors"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={cn("h-4 w-4 transition-colors", isLiked ? "fill-red-500 text-red-500" : "text-gray-600")}
            />
          </Button>

          {/* Category Badge */}
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{category}</Badge>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-900">{rating.toFixed(1)}</span>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-lg font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <Badge variant="outline" className={getDifficultyColor(difficulty)}>
              {difficulty}
            </Badge>
          </div>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{description}</p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{cookTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{servings} servings</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
