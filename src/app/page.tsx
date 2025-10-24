import ButtomHero from "@/components/Home/ButtomHero";
import CategorieSection from "@/components/Home/CategorieSection";
import Hero1 from "@/components/Home/Hero1";
import Stats from "@/components/Home/Stats";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Recipe App | Discover & Save Your Favorite Recipes",
  description:
    "Explore delicious recipes, view detailed ingredients and cooking instructions, and save your favorite dishes easily with the Recipe App.",
      verification: {
    google: "XYZ123abc456",
  },
  keywords: [
    "Recipe App",
    "Cooking",
    "Food Recipes",
    "Healthy Meals",
    "Baking",
    "Sri Lankan Recipes",
    "Dinner Ideas",
  ],
  authors: [{ name: "Mayuru Madhuranga" }],
  openGraph: {
    title: "Recipe App | Cook, Discover, and Save Recipes",
    description:
      "Discover and save your favorite recipes with the Recipe App — explore a variety of cuisines, ingredients, and cooking tips.",
    url: "https://www.recipeapp.gleeze.com/",
    siteName: "Recipe App",
    images: [
      {
        url: "https://www.recipeapp.gleeze.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Recipe App - Delicious Recipes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipe App | Discover & Save Your Favorite Recipes",
    description:
      "Explore a world of recipes and save your favorites in one place.",
    images: ["https://www.recipeapp.gleeze.com/og-image.jpg"],
  },
  metadataBase: new URL("https://www.recipeapp.gleeze.com"),
  alternates: {
    canonical: "https://www.recipeapp.gleeze.com",
  },
};


export default function Home() {
  return (
   
    <main className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/2 ">
      <section className="w-full h-screen">
        <Hero1 />
      </section>
      <section className="w-full ">
      <Stats />
      </section>
      <section className="w-full ">
        <CategorieSection />
      </section>
      <section className="w-full">
        <ButtomHero />
      </section>

    </main>
  );
}
