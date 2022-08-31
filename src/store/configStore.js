import {configureStore,combineReducers,getDefaultMiddleware} from '@reduxjs/toolkit'
import newMovies from './newMovies';
import topRatedMovies from './topRatedMovies';
import searchMovie from './searchMovie';
import popularMovies from './popularMovies';



const reducer = combineReducers({topRatedMovies,searchMovie,popularMovies,newMovies})
const middleware = [...getDefaultMiddleware()]
const store = configureStore({reducer,middleware})
export default store