import React from 'react'

const Stats = () => {
  return (
    <div>
      <section className="py-12 px-4 border-b border-black/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">205+</div>
              <div className="text-muted-foreground">Delicious Recipes</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">15 min</div>
              <div className="text-muted-foreground">Average Cook Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10k+</div>
              <div className="text-muted-foreground">Happy Cooks</div>
            </div>
          </div>
        </div>
        
      </section>
    </div>
  )
}

export default Stats
