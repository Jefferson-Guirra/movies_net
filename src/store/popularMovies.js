import CreateAsyncSlice from './helper/CreateAsyncSlice'
import { POPULAR_MOVIES} from '../Api'
const slice = CreateAsyncSlice({
  name: 'popularMovies',
  fetchConfig: ({ apiKey, page }) => POPULAR_MOVIES(apiKey,page)
})

export const fetchPopularMovies = slice.asynAction
export default slice.reducer
