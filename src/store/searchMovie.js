import { SEARCH_MOVIE } from "../Api";
import CreateAsyncSlice from "./helper/CreateAsyncSlice";


const slice = CreateAsyncSlice({
  name:'searchMovie',
  fetchConfig:({key,query})=> SEARCH_MOVIE(apiKey,query)
})

export const fetchSearch = slice.asynAction
export default slice.reducer