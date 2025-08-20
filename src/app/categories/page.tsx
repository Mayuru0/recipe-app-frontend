import { CategoryPage } from "@/components/Categories/CategoryPage";
import Image from "next/image";
import Login from "../../../public/assets/1.jpg";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/2 flex flex-col items-center justify-center ">
      <div className="absolute inset-0 w-full h-1/3 ">
        <Image
          src={Login}
          alt="Login Background"
          className="h-[10px] w-full object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-black/50 " />
      </div>

      <div className="mb-8 relative z-10 mt-[8%] text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Categories
        </h1>
        <p className="text-gray-200 text-lg">
          Discover recipes by category and cuisine
        </p>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center w-full px-4 py-8 ">
        <CategoryPage />
      </div>
    </div>
  );
}
