const URL_API = import.meta.env.VITE_API
const SEARCH_URL = import.meta.env.VITE_SEARCH

export function TOP_RATED_MOVIES(apiKey, page = 1){
  return{
    url:`${URL_API}top_rated?${apiKey}&language=pt-BR&page=${page}`
  }

}

export function SEARCH_MOVIE(apiKey,query){
  return{
    url:`${SEARCH_URL}?${apiKey}&query=${query}&language=pt-BR`
  }
}


export function RECOMMENDED_MOVIE(apiKey,page = 1){
  return{
    url:`https://api.themoviedb.org/3/trending/movie/week?${apiKey}&language=pt-BR&page=${page}`
  }
}


  export function COMMENTS_MOVIE(apiKey,id){
    return{
      url:`https://api.themoviedb.org/3/movie/${id}/reviews?${apiKey}`
    }
    
  }

  export function NEW_MOVIES(apiKey,page = 1){
    return{
      url:`https://api.themoviedb.org/3/movie/now_playing?${apiKey}&page=${page}`
    }
  }

  export function SIMILAR_MOVIES (apiKey,page = 1,id){
    return {
      url:`https://api.themoviedb.org/3/movie/${id}/similar?${apiKey}&page=${page}&language=pt-BR`
    }
  }

  export function GET_MOVIE_ID(apiKey,id){
    return{
      url:`https://api.themoviedb.org/3/movie/${id}?${apiKey}&language=pt-BR`
    }
  }