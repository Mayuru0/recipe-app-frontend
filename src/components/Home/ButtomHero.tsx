"use client"

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { selectuser } from '@/Redux/features/authSlice';

const ButtomHero = () => {
  const user = useSelector(selectuser);
  return (
    <div>
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-card-foreground mb-4">Ready to Start Cooking?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of home cooks who have discovered their new favorite recipes with us
          </p>
          {user ? (
            <Link href="/categories">
              <Button className='cursor-pointer'>Explore Categories</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button className='cursor-pointer'>Get Started</Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default ButtomHero
