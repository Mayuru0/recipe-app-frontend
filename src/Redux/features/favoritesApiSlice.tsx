import { Favorites } from "@/type/Favorites";
import { apiSlice } from "../apiSlice";

export const favoriteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all favorites
    getFavorites: builder.query<Favorites[], void>({
      query: () => "/favorite/get",
      providesTags: ["Favorites"],
    }),

    // Add favorite
    addFavorite: builder.mutation<Favorites, { strMeal: string; strMealThumb: string; idMeal: string }>({
      query: (body) => ({
        url: "/favorite/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Favorites"],
    }),

    // Remove favorite
    removeFavorite: builder.mutation<{ message: string }, string>({
      query: (idMeal) => ({
        url: `/favorite/delete/${idMeal}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApiSlice;
