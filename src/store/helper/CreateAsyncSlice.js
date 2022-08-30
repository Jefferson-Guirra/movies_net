import {createSlice} from '@reduxjs/toolkit'
/**
 * Cria um slice com uma função assíncrona
 * @param {Object} config
 * @param {String} config.name
 * @param {Object} config.initialState
 * @param {Object} config.reducers
 * @param {Function} config.fetchConfig
 */
const CreateAsyncSlice= (config)=>{
  const slice = createSlice({
    name:config.name,
    initialState:{
      loading:false,
      data:null,
      error:null,
      ...config.initialState
    },
    reducers:{
      fetchStarted(state){
        state.loading = true
      },
      fetchSucess(state,action){
        state.loading = false
        state.data = action.payload
        state.error = null
      },
      fetchError(state,action){
        state.loading = false
        state.data = null
        state.error = action.payload
      },
      ...config.reducers
    }
  })
  const {fetchError,fetchStarted,fetchSucess} = slice.actions
  const asynAction = (payload)=> async (dispatch)=>{
    try{
      dispatch(fetchStarted())
      const {url} = config.fetchConfig(payload)
      const response = await fetch(url)
      const data = await response.json()
      return await dispatch(fetchSucess(data))
    }
    catch (error){
      return dispatch(fetchError(error.message))
    }
  }

  return {...slice,asynAction}
}
export default CreateAsyncSlice