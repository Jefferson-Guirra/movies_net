import { TOP_RATED_MOVIES } from '../Api'
import CreateAsyncSlice from './helper/CreateAsyncSlice'
const slice = CreateAsyncSlice({
  name: 'topMovies',
  fetchConfig: ({ key , page }) => TOP_RATED_MOVIES(key, page)
})

export const topMovies = slice.asynAction
export default slice.reducer
