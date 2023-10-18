import { createSlice } from '@reduxjs/toolkit'

const sampleData =[
  'apple',
  'ape',
  'alligator',
  'american',
  'americano',
  'banana',
  'brazil',
  'bomb',
  'cat',
  'canada',
  'car',
  'dog',
  'demon',
  'doravile',
  'egg',
  'england',
  'english',
  'fire',
  'fish',
  'georgia',
  'georgia tech',
  'hat',
  'ice',
  'ice cream',
  'jam',
  'jazz',
  'korea',
  'korean',
  'lion',
  'love',
  'me',
  'mouse',
  'nurse',
  'no means no',
  'oh',
  'oops',
  'pikachu',
  'punch',
  'queen',
  'q.q',
  'robot',
  'ramen',
  'silver',
  'sauce',
  'tiger',
  'team',
  'umm',
  'victory',
  'www.google.com',
  'x-ray',
  'yellow',
  'zoo'
]
const initialState=  {
  text:'',
  results : []
}
export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    typing: (state, action)=>{
        //입력한 텍스트를 업데이트.
        let input = action.payload.text
        state.text = input
        let new_results = sampleData.filter(item => item.startsWith(input))
        // state.results.push(action.payload.text)
        state.results = new_results
        // console.log("new ", new_results);
    },
    resetKeyword:(state, action)=>{
      state.text =''
      state.results =[]
    }
    
  }
})

// Action creators are generated for each case reducer function
export const { typing } = searchBarSlice.actions
export const { resetKeyword } = searchBarSlice.actions

export default searchBarSlice.reducer