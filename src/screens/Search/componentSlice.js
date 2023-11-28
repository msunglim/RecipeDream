import { createSlice } from '@reduxjs/toolkit'
import { ComponentUsedCounter } from '../../common/ComponentUsedCounter'

const initialState=  {
  filterChipCancelCounter:0,
  includeButtonCounter:0,
  excludeButtonCounter:0,
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
        ComponentUsedCounter(added, 'filterChipCancel')
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
export const { filterChipCancelCounterPressed,includeButtonCounterPressed,excludeButtonCounterPressed, intoleranceCheckboxCounterPressed,cookingTimeSettingTextinputCounterPressed} = componentSlice.actions

export default componentSlice.reducer