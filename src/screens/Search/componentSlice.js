import { createSlice } from '@reduxjs/toolkit'
import { ComponentUsedCounter } from '../../common/ComponentUsedCounter'

const initialState=  {
  filterChipCancelCounter:0,
  intoleranceCheckboxCounter:0,
  cookingTimeSettingTextinputCounter:0
}
export const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    filterChipCancelCounterPressed: (state)=>{
        let added = state.filterChipCancelCounter+1
        state.filterChipCancelCounter =added
        ComponentUsedCounter(added, 'IngredientChipCancel')
    },
    intoleranceCheckboxCounterPressed: (state)=>{
      let added = state.intoleranceCheckboxCounter+1
      state.intoleranceCheckboxCounter =added
      ComponentUsedCounter(added, 'IntoleranceCheckbox')
  },
  cookingTimeSettingTextinputCounterPressed: (state)=>{
    let added = state.cookingTimeSettingTextinputCounter+1
    state.cookingTimeSettingTextinputCounter =added
    ComponentUsedCounter(added, 'cookingTimeSettingTextinput')
},
  }
})

// Action creators are generated for each case reducer function
export const { filterChipCancelCounterPressed, ingredientChipCancelCounterPressed ,intoleranceCheckboxCounterPressed,cookingTimeSettingTextinputCounterPressed} = componentSlice.actions

export default componentSlice.reducer