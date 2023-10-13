import { configureStore } from '@reduxjs/toolkit'
import searchBarSlice from '../screens/Search/searchBarSlice'
import  ingredientSlice  from '../screens/Search/ingredientSlice'

export const store = configureStore({
  reducer: {
    
    searchBar: searchBarSlice,
    ingredient: ingredientSlice,
    
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch