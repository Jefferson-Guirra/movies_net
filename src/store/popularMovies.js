import CreateAsyncSlice from './helper/CreateAsyncSlice'
import { RECOMMENDED_MOVIE } from '../Api'
const slice = CreateAsyncSlice({
  name: 'popularMovies',
  fetchConfig: ({ apiKey, page }) => RECOMMENDED_MOVIE(apiKey,page)
})

export const fetchPopularMovies = slice.asynAction
export default slice.reducer
