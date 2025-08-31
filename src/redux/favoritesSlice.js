// redux/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload; // The recipe object you send when dispatching
      const existingIndex = state.favoriterecipes.findIndex(
        (item) => item.id === recipe.id
      );

      if (existingIndex >= 0) {
        // If recipe already exists, remove it
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // If not, add it
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;