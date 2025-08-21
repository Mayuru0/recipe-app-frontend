"use client";
import Login from "../../../../public/assets/1.jpg";


import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  useGetCategoriesQuery,
  useGetRecipesByCategoryQuery,
} from "@/Redux/features/recipesApiSlice";
import { Recipe, RecipeCategory } from "@/type/Recipes";
import RecipePage from "@/components/recipes/RecipePage";

const Page = () => {
  const { recipes_id } = useParams<{ recipes_id: string }>();

  const { data, isLoading, isError } = useGetCategoriesQuery();
  const categories = (data ?? []) as RecipeCategory[];

  const { data: recipesData = [] } = useGetRecipesByCategoryQuery(
    recipes_id.toLowerCase()
  );
  const recipes = recipesData as Recipe[];

  console.log("Recipes:", recipes);

  if (isLoading) {
    return <p className="text-center mt-[20%]">Loading...</p>;
  }

  if (isError || !categories.length) {
    return <p className="text-center mt-[20%]">Failed to load categories.</p>;
  }

  console.log("Recipe ID:", recipes_id);

  const selectedCategory = categories.find(
    (cat: any) => cat.strCategory.toLowerCase() === recipes_id.toLowerCase() // match case-insensitive
  );

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-background z-10 mt-[10%]">
        <main className="container mx-auto px-4 py-8 text-center  ">
          <h1 className="font-serif text-2xl font-bold mb-4">
            Category Not Found
          </h1>
          <Button asChild>
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
          </Button>
        </main>
      </div>
    );
  }

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
          Recipes
        </h1>
        <p className="text-gray-200 text-lg">
          Discover recipes by category and cuisine
        </p>
      </div>
      </div>

      <main className="container mx-auto px-4 py-8 z-10">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
          </Button>
          <div className="mb-8 flex flex-col md:flex-row items-start gap-6">
            {/* Text section */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="font-serif text-4xl font-bold text-foreground">
                  {selectedCategory.strCategory} Recipes
                </h1>
                <span className="text-muted-foreground">
                  ({recipes.length} recipes)
                </span>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {selectedCategory.strCategoryDescription}
              </p>
            </div>

            {/* Image section */}
            <div className="w-full md:w-1/3">
              <Image
                src={selectedCategory.strCategoryThumb}
                alt={selectedCategory.strCategory}
                width={200}
                height={200}
                className="w-full h-auto object-cover rounded"
              />
            </div>
          </div>
        </div>

        <div>
          <RecipePage recipes={recipes} />
        </div>
      </main>
    </div>
  );
};

export default Page;
