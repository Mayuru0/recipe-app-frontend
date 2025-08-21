import { CategoryPage } from "@/components/Categories/CategoryPage";
import Image from "next/image";
import Login from "../../../public/assets/1.jpg";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/2 flex flex-col  ">
      <div className="relative  w-full  h-[50vh] ">
        <Image
          src={Login}
          alt="Login Background"
          className="h-[10px] w-full object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-black/50 " />
    

      <div className=" absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Categories
        </h1>
        <p className="text-gray-200 text-lg">
          Discover recipes by category and cuisine
        </p>
      </div>
      </div>

     <div className="flex-1 relative z-10 w-full px-4 py-12 flex items-center justify-center">
        <CategoryPage />
      </div>
    </div>
  );
}
