import { createSlice } from '@reduxjs/toolkit'
const ingredientData = [
  'apple',
  'banana',
  'carrot',
  'chicken',
  'beef',
  'potato',
  'tomato',
  'onion',
  'garlic',
  'pasta',
  'rice',
  'broccoli',
  'spinach',
  'lettuce',
  'mushroom',
  'pepper',
  'salt',
  'sugar',
  'oregano',
  'thyme',
  'basil',
  'paprika',
  'cumin',
  'curry powder',
  'soy sauce',
  'olive oil',
  'butter',
  'cheese',
  'egg',
];

const initialState=  {
  text:'',
  results: [],
  includedIngredients : [],
  excludedIngredients: []
}
export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    typing: (state, action)=>{
      //입력한 텍스트를 업데이트.
      let input = action.payload.text
      state.text = input
      let new_results = ingredientData.filter(item => item.startsWith(input))
      // state.results.push(action.payload.text)
      state.results = new_results
      // console.log("new ", new_results);
  },
    addIncluded: (state, action)=>{
        let input = action.payload.ingredient
        if(!state.includedIngredients.includes(input)){
          state.includedIngredients.push(input)
        }
        
    },
    addExcluded: (state, action)=>{
      let input = action.payload.ingredient
      if(!state.excludedIngredients.includes(input)){
        state.excludedIngredients.push(input)
      }
    },
    removeIncluded: (state, action)=>{
        let input = action.payload.ingredient
        state.includedIngredients = state.includedIngredients.filter(item => item!=input)
    },
    removeExcluded: (state, action)=>{
        let input = action.payload.ingredient
        state.excludedIngredients = state.excludedIngredients.filter(item => item!=input)
    },
    resetKeyword:(state, action)=>{
      state.text =''
      state.results =[]
    },
    cancelAdding:(state, action)=>{
      state.text =''
      // state.results ={...action.payload.previous}
      let original = action.payload.original
      let type = action.payload.type //is included or excluded etc.
      if (type == 0){
        state.includedIngredients=original
      }else if(type ==1){
        state.excludedIngredients=original
      }
      // console.log("log", action.payload.previous);
    }
    
  }
})

// Action creators are generated for each case reducer function
export const { typing } = ingredientSlice.actions
export const { addIncluded } = ingredientSlice.actions
export const { addExcluded } = ingredientSlice.actions
export const { removeIncluded } = ingredientSlice.actions
export const { removeExcluded } = ingredientSlice.actions
export const { resetKeyword } = ingredientSlice.actions
export const { cancelAdding } = ingredientSlice.actions
export default ingredientSlice.reducer