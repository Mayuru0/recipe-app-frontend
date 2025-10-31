"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Heart, User, Menu, X, LogOut, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectuser } from "@/Redux/features/authSlice";
import { useGetRecipesByCategoryQuery } from "@/Redux/features/recipesApiSlice";
import { SerachBar } from "../ui/SerachBar";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const router = useRouter();
  const user = useSelector(selectuser);
  const dispatch = useDispatch();

  // ✅ Fetch recipes only when searching
  const { data: recipesData } = useGetRecipesByCategoryQuery(searchQuery, {
    skip: !searchTriggered || searchQuery.trim() === "",
  });

  // ✅ Safe handling: recipes may be null
  const recipes = Array.isArray(recipesData) ? recipesData : [];

  // ✅ Case-insensitive local filtering
  const filteredRecipes =
    recipes.length > 0
      ? recipes.filter((r) =>
          r.strMeal?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setSearchTriggered(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClick = (idMeal: string) => {
    if (user) {
      router.push(`/recipe/${idMeal}`);
    } else {
      router.push("/auth/login");
    }
    setSearchQuery("");
    setSearchTriggered(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-colors duration-300 ${
        isScrolled ? "text-white bg-black/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                R
              </span>
            </div>
            <span className="font-serif text-xl text-white font-semibold">
              RecipeApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center lg:space-x-6 md:space-x-8">
            <Link
              href="/categories"
              className="text-white hover:text-green-400 transition-colors"
            >
              Categories
            </Link>
            {user && (
              <Link
                href="/favorites"
                className="text-white hover:text-green-400 transition-colors flex items-center gap-1"
              >
                <Heart className="h-4 w-4" />
                Favorites
              </Link>
            )}
          </nav>

          {/* ✅ Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
              <SerachBar
                type="search"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim() !== "") {
                    setSearchTriggered(true);
                  } else {
                    setSearchTriggered(false);
                  }
                }}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-4 text-white"
              />
            </div>

            {/* 🔽 Dropdown Suggestions */}
            {searchQuery && filteredRecipes.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-black/90 border border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                {filteredRecipes.map((recipe) => (
                  <button
                    key={recipe.idMeal}
                    onClick={() => handleClick(recipe.idMeal)}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition-colors text-left"
                  >
                    <Image
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                    <span className="text-white text-sm">{recipe.strMeal}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative h-8 rounded-full px-2 flex items-center space-x-2 cursor-pointer hover:bg-white/10">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={"/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-white">
                      {user?.name}
                    </span>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <Settings className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favorites">
                      <Heart className="mr-2 h-4 w-4" /> My Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-white"
                >
                  <Link href="/auth/login">
                    <User className="h-4 w-4 mr-2" /> Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4 bg-black p-8 relative">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
              <Input
                type="search"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim() !== "") {
                    setSearchTriggered(true);
                  } else {
                    setSearchTriggered(false);
                  }
                }}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-4 text-white"
              />

              {/* 🔽 Mobile Search Suggestions */}
              {searchQuery && filteredRecipes.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-black/90 border border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                  {filteredRecipes.map((recipe) => (
                    <button
                      key={recipe.idMeal}
                      onClick={() => handleClick(recipe.idMeal)}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition-colors text-left"
                    >
                      <Image
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                      <span className="text-white text-sm">
                        {recipe.strMeal}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              <Link
                href="/categories"
                className="text-white hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              {user && (
                <Link
                  href="/favorites"
                  className="text-white hover:text-primary transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-4 w-4" /> Favorites
                </Link>
              )}
            </nav>

            {/* Mobile User Section */}
            <div className="border-t border-white/10 pt-4">
              {user ? (
                <div className="space-y-3">
                  {/* User Info */}
                  <div className="flex items-center gap-3 px-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={"/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">
                        {user?.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  {/* User Actions */}
                  <div className="flex flex-col space-y-1">
                    <Link
                      href="/profile"
                      className="text-white hover:bg-white/10 transition-colors py-2 px-2 rounded flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:bg-white/10 transition-colors py-2 px-2 rounded flex items-center gap-2 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/auth/login">
                      <User className="h-4 w-4 mr-2" /> Sign In
                    </Link>
                  </Button>
                  <Button
                    className="w-full"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;