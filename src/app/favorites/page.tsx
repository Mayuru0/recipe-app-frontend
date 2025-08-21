import Image from 'next/image'
import React from 'react'
import Login from "../../../public/assets/1.jpg";
import FavoritesPage from '@/components/favorites/FavoritesPage';
const page = () => {
  return (
  <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/2 flex flex-col  ">
      <div className="relative w-full h-[50vh] ">
        <Image
          src={Login}
          alt="Login Background"
          className="h-[10px] w-full object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-black/50 " />
      

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Favorites
        </h1>
        <p className="text-gray-200 text-lg">
          Your saved recipes, all in one place
        </p>
      </div>
      </div>

      <div>
        <FavoritesPage />
      </div>
      
    </div>
  )
}

export default page
