import { NEW_MOVIES } from '../Api'
import CreateAsyncSlice from './helper/CreateAsyncSlice'
const slice = CreateAsyncSlice({
  name: 'newMoives',
  fetchConfig: ({ keyMovie, page }) => NEW_MOVIES(keyMovie,page)
})

export const getNewMovies = slice.asynAction
export default slice.reducer
