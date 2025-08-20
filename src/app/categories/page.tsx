import { CategoriesGrid } from "@/components/Categories/categories-grid";



export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
    
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Recipe Categories</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover delicious recipes organized by cuisine and meal type. Find exactly what you're craving today.
          </p>
        </div>
        <CategoriesGrid />
      </main>
    </div>
  )
}
