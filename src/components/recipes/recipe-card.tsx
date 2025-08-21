"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface RecipeCardProps {
  id: string
  title: string
  imageUrl: string
  isFavorited?: boolean
  onFavoriteToggle?: (id: string, isFavorited: boolean) => void
  onViewDetails?: (id: string) => void
}

export function RecipeCard({
  id,
  title,
  imageUrl,
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

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer" onClick={handleCardClick}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg?height=200&width=300"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

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
      </div>

      <CardContent className="p-4">
        <h3 className="font-serif text-lg font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
      </CardContent>
    </Card>
  )
}
