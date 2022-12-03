import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name:'userLogin',
  initialState:{
    username:"",
    userId:"",
  },
  reducers:{
    LOGIN(state,{payload}){
      state.username = payload.updateUsername
      state.userId = payload.upadateUserId
    },
    LOGOUT(state){
      state.userId ="",
      state.username = ""
    }
  }
})
export const {LOGIN,LOGOUT} = slice.actions
export default slice.reducer
