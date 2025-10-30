import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";
import Providers from "@/Redux/provider";
import AOSInit from "@/utils/AOSInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe App ",
  description:
    "Explore delicious recipes, view detailed ingredients and cooking instructions, and save your favorite dishes easily with the Recipe App.",
    verification: {
    google: "rRFuBD3_SnrZBwn9Pc7ynG6AM2YF_TdD9rWdCfD64ws",
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
        url: "https://www.recipeapp.gleeze.com/og-image.jpg", // replace with actual image URL
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
   robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="monetag" content="de045f2b50829b22a41d7c51ad590bed"></meta>
        <meta name="google-site-verification" content="rRFuBD3_SnrZBwn9Pc7ynG6AM2YF_TdD9rWdCfD64ws" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AOSInit />
          <Header />
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
