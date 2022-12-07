import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name:'userLogin',
  initialState:{
    username:"",
    userId:""
  },
  reducers:{
    LOGIN(state,{payload}){
      state.username = payload.username
      state.userId = payload.userId
    },
    LOGOUT(state){
      state.userId ="",
      state.username = ""
    }
  }
})
export const {LOGIN,LOGOUT} = slice.actions
export default slice.reducer
