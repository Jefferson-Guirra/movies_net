import {configureStore,combineReducers,getDefaultMiddleware} from '@reduxjs/toolkit'
import newMovies from './newMovies';
import topRatedMovies from './topRatedMovies';
import searchMovie from './searchMovie';
import popularMovies from './popularMovies';
import modal from './modal';
import search from './search';
import userLogin from './userLogin'



const reducer = combineReducers({topRatedMovies,searchMovie,popularMovies,newMovies,modal,search,userLogin})
const middleware = [...getDefaultMiddleware()]
const store = configureStore({reducer,middleware})
export default store