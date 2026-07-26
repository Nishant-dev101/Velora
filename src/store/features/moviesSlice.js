import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   movies: []
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
      setMovies : (state,action) => {
            console.log(state.movies);
            
            state.movies = [...state.movies, ...action.payload]
      },

      setEmptyArray : (state) => {
         state.movies = []
      }
    
            
      
  },
})

// Action creators are generated for each case reducer function
export const { setMovies, setEmptyArray } = moviesSlice.actions

export default moviesSlice.reducer