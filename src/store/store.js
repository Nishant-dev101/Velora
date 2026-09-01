import { configureStore } from "@reduxjs/toolkit";
import favoritesreducer from "./features/favoritesSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesreducer,
  },
});
