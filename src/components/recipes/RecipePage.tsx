import { Recipe } from "@/type/Recipes";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RecipeCard } from "./recipe-card";
import { RecipeDetailsModal } from "./recipe-details-modal";
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/Redux/features/favoritesApiSlice";

interface RecipePageProps {
  recipes: Recipe[];
  isLoading?: boolean; // optional loading prop
}

function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 relative">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-300/50 to-transparent"></div>
      </div>

      <div className="p-6">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-3 w-3/4"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
        </div>
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32"></div>
      </div>
    </div>
  );
}

const RecipePage: React.FC<RecipePageProps> = ({
  recipes,
  isLoading = false,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayCount, setDisplayCount] = useState<number>(6);

  const [modalRecipeId, setModalRecipeId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: favorites = [] } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    if (searchTerm.trim()) {
      filtered = filtered.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRecipe !== "All") {
      filtered = filtered.filter((recipe) => recipe.strMeal === selectedRecipe);
    }

    return filtered;
  }, [recipes, searchTerm, selectedRecipe]);

  const categoryNames = useMemo(
    () => ["All", ...recipes.map((r) => r.strMeal)],
    [recipes]
  );

  const displayedRecipes = useMemo(
    () => filteredRecipes.slice(0, displayCount),
    [filteredRecipes, displayCount]
  );

  const hasMore = displayedRecipes.length < filteredRecipes.length;

  const handleLoadMore = () => setDisplayCount((prev) => prev + 6);
  const handleSearch = () => setDisplayCount(6);
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };
  const clearSearchTerm = () => {
    setSearchTerm("");
    setDisplayCount(6);
  };
  const clearSelectedRecipe = () => {
    setSelectedRecipe("All");
    setDisplayCount(6);
  };
  const handleRecipeChange = (name: string) => {
    setSelectedRecipe(name);
    setDisplayCount(6);
  };

  const handleViewDetails = (id: string) => {
    setModalRecipeId(id);
    setIsModalOpen(true);
  };

  // function to toggle favorite
  const handleFavoriteToggle = async (
    idMeal: string,
    newState: boolean,
    title: string,
    imageUrl: string
  ) => {
    try {
      if (newState) {
        // add to favorites
        await addFavorite({
          idMeal,
          strMeal: title,
          strMealThumb: imageUrl,
        }).unwrap();
      } else {
        // remove from favorites
        await removeFavorite(idMeal).unwrap();
      }
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };
  return (
    <div className="container mx-auto">
      {/* Category Pills */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recipe Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {categoryNames
            .filter((_, index) => index !== 4)
            .slice(0, 20)
            .map((name) => (
              <Button
                key={name}
                variant={selectedRecipe === name ? "default" : "secondary"}
                onClick={() => handleRecipeChange(name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedRecipe === name
                    ? "bg-gray-900 text-white hover:bg-gray-800 shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {name}
              </Button>
            ))}
        </div>
      </div>

      {/* Search */}
      <Card className="mb-8 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-4 py-3 text-base border-gray-200 focus:border-gray-400 focus:ring-0"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 cursor-pointer"
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {(selectedRecipe !== "All" || searchTerm) && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          {selectedRecipe !== "All" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-900 text-white rounded-full text-sm">
              {selectedRecipe}
              <button
                onClick={clearSelectedRecipe}
                className="ml-1 hover:bg-gray-700 rounded-full p-0.5 text-xs"
              >
                ×
              </button>
            </span>
          )}
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            &quot;{searchTerm}&quot;
              <button
                onClick={clearSearchTerm}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 text-xs"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Recipes Grid */}
      {isLoading ? (
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: displayCount }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </div>
      ) : displayedRecipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mb-6">
            {displayedRecipes.map((recipe) => {
              const isFavorited = favorites.some(
                (fav) =>
                  fav.idMeal === recipe.idMeal && fav.status === "favorite"
              );

              return (
                <RecipeCard
                  key={recipe.idMeal}
                  id={recipe.idMeal}
                  title={recipe.strMeal}
                  imageUrl={recipe.strMealThumb}
                  isFavorited={isFavorited}
                  onFavoriteToggle={(id, newState) =>
                    handleFavoriteToggle(
                      id,
                      newState,
                      recipe.strMeal,
                      recipe.strMealThumb
                    )
                  }
                  onViewDetails={handleViewDetails}
                />
              );
            })}
          </div>

          {hasMore && (
            <div className="text-center mt-12">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-500 cursor-pointer hover:border-gray-400 transition-all duration-200"
              >
                Load More ({filteredRecipes.length - displayedRecipes.length}{" "}
                remaining)
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No recipes found
          </h3>
          <p className="text-gray-600">
            {"Try adjusting your search terms or filters to find what you're looking for."}

          </p>
        </div>
      )}

      {/* Recipe Details Modal */}
      <RecipeDetailsModal
        idMeal={modalRecipeId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isFavorited={favorites.some(
          (fav) => fav.idMeal === modalRecipeId && fav.status === "favorite"
        )}
        onFavoriteToggle={(id, newState) => {
          
          const recipeItem = displayedRecipes.find((r) => r.idMeal === id);
          if (!recipeItem) return;

          handleFavoriteToggle(
            id,
            newState,
            recipeItem.strMeal,
            recipeItem.strMealThumb
          );
        }}
      />
    </div>
  );
};

export default RecipePage;
