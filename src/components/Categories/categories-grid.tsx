import { CategoryCard } from "./CategorieCard"


const categories = [
  {
    id: "italian",
    name: "Italian",
    description: "Classic pasta dishes, authentic pizzas, and traditional Italian comfort food",
    imageUrl: "/placeholder.svg?height=200&width=300",
    recipeCount: 45,
    color: "#059669",
  },
  {
    id: "asian",
    name: "Asian",
    description: "Flavorful stir-fries, aromatic curries, and fresh noodle dishes from across Asia",
    imageUrl: "/placeholder.svg?height=200&width=300",
    recipeCount: 38,
    color: "#10b981",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Sweet treats, decadent cakes, and delightful pastries for every occasion",
    imageUrl: "/placeholder.svg?height=200&width=300",
    recipeCount: 52,
    color: "#059669",
  },
  {
    id: "healthy",
    name: "Healthy",
    description: "Nutritious salads, protein-packed bowls, and wholesome meals for wellness",
    imageUrl: "/placeholder.svg?height=200&width=300",
    recipeCount: 41,
    color: "#10b981",
  },
  {
    id: "quick-meals",
    name: "Quick Meals",
    description: "Fast and easy recipes ready in 30 minutes or less for busy weeknights",
    imageUrl: "/placeholder.svg?height=200&width=300",
    recipeCount: 29,
    color: "#059669",
  },
]

export function CategoriesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  )
}
