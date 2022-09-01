import { SEARCH_MOVIE } from "../Api";
import CreateAsyncSlice from "./helper/CreateAsyncSlice";


const slice = CreateAsyncSlice({
  name:'searchMovie',
  fetchConfig:({searchKey,query,page})=> SEARCH_MOVIE(searchKey,query,page)
})

export const fetchSearch = slice.asynAction
export default slice.reducer