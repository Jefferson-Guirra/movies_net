import CreateAsyncSlice from './helper/CreateAsyncSlice'
import { RECOMMENDED_MOVIE } from '../Api'
const slice = CreateAsyncSlice({
  name: 'popularMovies',
  fetchConfig: ({ key, page }) => RECOMMENDED_MOVIE(key,page)
})

export const fetchPopularMovies = slice.asynAction
export default slice.reducer
