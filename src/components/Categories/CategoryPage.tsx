"use client";
import { motion } from "framer-motion";

import { useState, useMemo } from "react";
import { Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCategoriesQuery } from "@/Redux/features/recipesApiSlice";
import { CategoryCard } from "./CategorieCard";
import { RecipeCategory } from "@/type/Recipes";

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

export function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [displayCount, setDisplayCount] = useState<number>(6);

  const { data: categories = [], isLoading } = useGetCategoriesQuery();

  // Filter categories based on search term and selected category
  const filteredCategories = useMemo(() => {
    if (!categories.length) return [];

    let filtered = categories as RecipeCategory[];

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (category) =>
          category.strCategory
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          category.strCategoryDescription
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected category (if not "All")
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (category) => category.strCategory === selectedCategory
      );
    }

    return filtered;
  }, [categories, searchTerm, selectedCategory]);

  // Get displayed categories (limited by displayCount)
  const displayedCategories = useMemo(() => {
    return filteredCategories.slice(0, displayCount);
  }, [filteredCategories, displayCount]);

  // Check if there are more categories to load
  const hasMoreCategories = filteredCategories.length > displayCount;

  // Get unique categories for filter pills
  const categoryNames = useMemo(() => {
    if (!categories.length) return [];
    return [
      "All",
      ...(categories as RecipeCategory[]).map((cat) => cat.strCategory),
    ];
  }, [categories]);

  // Handler functions
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  const handleSearch = () => {
    setDisplayCount(6);
    console.log("Searching for:", searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
    setDisplayCount(6);
  };

  const clearSelectedCategory = () => {
    setSelectedCategory("All");
    setDisplayCount(6);
  };

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setDisplayCount(6);
  };

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8">
      <div className="container mx-auto ">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Categories
          </h1>
          <p className="text-gray-600 text-lg">
            Discover recipes by category and cuisine
          </p>
        </div>

        {/* Category Pills */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recipe Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categoryNames
              .filter((_, index) => index !== 4)
              .slice(0, 6)
              .map((categoryName) => (
                <Button
                  key={categoryName}
                  variant={
                    selectedCategory === categoryName ? "default" : "secondary"
                  }
                  onClick={() => handleCategoryChange(categoryName)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    selectedCategory === categoryName
                      ? "bg-gray-900 text-white hover:bg-gray-800 shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {categoryName}
                </Button>
              ))}
          </div>
        </div>

        {/* Search and Filters Section */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search categories or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 pr-4 py-3 text-base border-gray-200 focus:border-gray-400 focus:ring-0"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 cursor-pointer"
              >
                Search
              </Button>

              {/* View Toggle */}
              <div className="flex gap-2 border rounded-lg p-1 bg-gray-100 ">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? " shadow-sm" : ""}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? " shadow-sm" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Filters */}
        {(selectedCategory !== "All" || searchTerm) && (
          <div className="mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-gray-900">
                Active Filters:
              </span>
              <div className="flex gap-2 flex-wrap">
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-900 text-white rounded-full text-sm">
                    {selectedCategory}
                    <button
                      onClick={clearSelectedCategory}
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
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedCategory !== "All" ? selectedCategory : "All"} Categories
              {searchTerm && (
                <span className="text-gray-500 font-normal">
                  {" "}
                  {`matching "${searchTerm}"`}
                </span>
              )}
            </h3>
            <span className="text-sm text-gray-500">
              Showing {displayedCategories.length} of{" "}
              {filteredCategories.length} categor
              {filteredCategories.length === 1 ? "y" : "ies"}
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        {isLoading ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {/* Skeleton cards */}
            {Array.from({ length: displayCount }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryCardSkeleton />
              </motion.div>
            ))}
          </div>
        ) : displayedCategories.length > 0 ? (
          <>
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {displayedCategories
                .filter((_, index) => index !== 4)
                .slice(0, 6)
                .map((category, index) => (
                  <motion.div
                    key={category.idCategory}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CategoryCard category={category} />
                  </motion.div>
                ))}
            </div>

            {/* Load More Button */}
            {hasMoreCategories && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Load More Categories (
                  {filteredCategories.length - displayCount} remaining)
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600">
              {
                "Try adjusting your search terms or filters to find what you're looking for."
              }
            </p>
            {(selectedCategory !== "All" || searchTerm) && (
              <div className="mt-4">
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchTerm("");
                    setDisplayCount(6);
                  }}
                  variant="outline"
                  className="mx-auto"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
