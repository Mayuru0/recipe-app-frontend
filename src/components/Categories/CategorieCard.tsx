import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface CategoryCardProps {
  id: string
  name: string
  description: string
  imageUrl: string
  recipeCount: number
  color: string
}

export function CategoryCard({ id, name, description, imageUrl, recipeCount, color }: CategoryCardProps) {
  return (
    <Link href={`/categories/${id}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <Badge className="absolute top-3 right-3 text-white border-white/20" style={{ backgroundColor: color }}>
            {recipeCount} recipes
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-serif text-xl font-semibold text-card-foreground mb-2">{name}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
