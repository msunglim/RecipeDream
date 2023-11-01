import { createSlice } from '@reduxjs/toolkit'
import { ComponentUsedCounter } from '../../common/ComponentUsedCounter'

const initialState=  {
  ingredientChipCancelCounter:0
}
export const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    ingredientChipCancelCounterPressed: (state)=>{
        let added = state.ingredientChipCancelCounter+1
        state.ingredientChipCancelCounter =added
        ComponentUsedCounter(added, 'IngredientChipCancel')
    },
  }
})

// Action creators are generated for each case reducer function
export const { ingredientChipCancelCounterPressed } = componentSlice.actions

export default componentSlice.reducer