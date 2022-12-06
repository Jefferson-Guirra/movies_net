import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name:'userLogin',
  initialState:{
    token:null,
  },
  reducers:{
    LOGIN(state,{payload}){
      state.token = payload.token
    },
    LOGOUT(state){
      state.token = ""
    }
  }
})
export const {LOGIN,LOGOUT} = slice.actions
export default slice.reducer
