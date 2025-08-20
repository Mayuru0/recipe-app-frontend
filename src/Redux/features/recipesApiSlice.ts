import { Recipe, RecipeCategory, RecipeDetail } from "@/type/Recipes";
import { apiSlice } from "../apiSlice";


export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // Get all Recipes
    getCategories: builder.query<RecipeCategory, void>({
      query: () => "/recipe/categories",
      providesTags: ["Recipes"],
    }),
    // Get event by id
    getRecipeById: builder.query<RecipeDetail, string>({
      query: (id) => `/recipe/${id}`,
      providesTags: ["Recipes"],
    }),

    getRecipesByCategory: builder.query<Recipe, string>({
      query: (category) => `/recipe/categories/${category}`,
      providesTags: ["Recipes"],
    })
  
  }),
});

export const {
  
  useGetCategoriesQuery,
  useGetRecipeByIdQuery,
  useGetRecipesByCategoryQuery

  
} = eventApiSlice;
