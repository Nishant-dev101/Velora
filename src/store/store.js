import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../store/features/moviesSlice'

export const store = configureStore({
  reducer: {
       movies: moviesReducer,
  },
})