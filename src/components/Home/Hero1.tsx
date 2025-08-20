import Image from 'next/image'
import React from 'react'
import Login from "../../../public/assets/1.jpg";
const Hero1 = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden ">
      {/* Background image - full screen */}
      <div className="absolute inset-0 w-full h-full ">
        <Image
          src={Login}
          alt="Login Background" 
          className="h-full w-full object-cover"
          fill
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
    </div>
  )
}

export default Hero1
