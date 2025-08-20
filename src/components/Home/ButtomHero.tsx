import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const ButtomHero = () => {
  return (
    <div>
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-card-foreground mb-4">Ready to Start Cooking?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of home cooks who have discovered their new favorite recipes with us
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/signup">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default ButtomHero
