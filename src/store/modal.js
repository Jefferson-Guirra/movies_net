import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name:'modal',
  initialState:{
    visibility:false
  },
  reducers:{
    changeStateModal(state){
      state.visibility = !state.visibility
    }
  }
})

export const {changeStateModal} = slice.actions
export default slice.reducer