import { createSlice } from "@reduxjs/toolkit";

const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

const favoriteSlice = createSlice({
  name: "favorites",

  initialState: {
    movies: savedFavorites,
  },

  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;

      const index = state.movies.findIndex((item) => item.id === movie.id);

      if (index !== -1) {
        state.movies.splice(index, 1);
      } else {
        state.movies.push(movie);
      }

      localStorage.setItem("favorites", JSON.stringify(state.movies));
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
