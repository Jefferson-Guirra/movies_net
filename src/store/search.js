import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name:'findMovie',
  initialState:{
    value:''
  },
  reducers:{
    findMovie(state,{payload}){
      state.value = payload
    }
  }
})
export const {findMovie} = slice.actions
export default slice.reducer