"use client";

import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectuser } from '@/Redux/features/authSlice';
import { motion } from "framer-motion";

const ButtomHero = () => {
  const user = useSelector(selectuser);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-3xl font-bold text-card-foreground mb-4"
          >
            Ready to Start Cooking?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
          >
            Join thousands of home cooks who have discovered their new favorite recipes with us
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-4"
          >
            {user ? (
              <Link href="/categories">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className='cursor-pointer'>Explore Categories</Button>
                </motion.div>
              </Link>
            ) : (
              <Link href="/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className='cursor-pointer'>Get Started</Button>
                </motion.div>
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default ButtomHero;
