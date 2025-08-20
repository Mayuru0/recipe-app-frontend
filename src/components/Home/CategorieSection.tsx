import React from 'react'
import { CategoriesGrid } from '../Categories/categories-grid'

const CategorieSection = () => {
  return (
    <div>
       <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Recipe Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From quick weeknight dinners to elaborate weekend treats, find the perfect recipe for any occasion
            </p>
          </div>
          <CategoriesGrid />
        </div>
      </section>
    </div>
  )
}

export default CategorieSection
