import { createSlice } from '@reduxjs/toolkit'
import { ComponentUsedCounter } from '../../common/ComponentUsedCounter'

const initialState=  {
  ingredientChipCancelCounter:0,
  includeButtonCounter:0,
  excludeButtonCounter:0
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
    includeButtonCounterPressed: (state)=>{
      let added = state.includeButtonCounter+1
      state.includeButtonCounter =added
      ComponentUsedCounter(added, 'includeIngredientButton')
    },
    excludeButtonCounterPressed: (state)=>{
      let added = state.excludeButtonCounter+1
      state.excludeButtonCounter =added
      ComponentUsedCounter(added, 'excludeIngredientButton')
    },
  }
})

// Action creators are generated for each case reducer function
export const { ingredientChipCancelCounterPressed, includeButtonCounterPressed,excludeButtonCounterPressed } = componentSlice.actions

export default componentSlice.reducer