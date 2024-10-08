import { doc, getDoc } from 'firebase/firestore'
import { db } from './services/firebaseConnection'
const URL_API = import.meta.env.VITE_API
const SEARCH_URL = import.meta.env.VITE_SEARCH

export function TOP_RATED_MOVIES(apiKey, page = 1) {
  return {
    url: `${URL_API}top_rated?${apiKey}&language=pt-BR&page=${page}`
  }
}

export function SEARCH_MOVIE(apiKey, query, page) {
  return {
    url: `${SEARCH_URL}?${apiKey}&query=${query}&language=pt-BR&page=${page}`
  }
}

export function POPULAR_MOVIES(apiKey, page = 1) {
  return {
    url: `https://api.themoviedb.org/3/trending/movie/week?${apiKey}&language=pt-BR&page=${page}`
  }
}

export function COMMENTS_MOVIE(apiKey, id) {
  return {
    url: `https://api.themoviedb.org/3/movie/${id}/reviews?${apiKey}`
  }
}

export function NEW_MOVIES(apiKey, page = 1) {
  return {
    url: `https://api.themoviedb.org/3/movie/now_playing?${apiKey}&language=pt-BR&page=${page}`
  }
}

export function SIMILAR_MOVIES(apiKey, page = 1, id) {
  return {
    url: `https://api.themoviedb.org/3/movie/${id}/similar?${apiKey}&page=${page}&language=pt-BR`
  }
}

export function GET_MOVIE_ID(apiKey, id) {
  return {
    url: `https://api.themoviedb.org/3/movie/${id}?${apiKey}&language=pt-BR`
  }
}

export function GET_TRAILER(apikey, id) {
  return {
    url: `${URL_API}${id}/videos?${apikey}`
  }
}

export function GET_GENRE_MOVIE(apikey) {
  return {
    url: `https://api.themoviedb.org/3/genre/movie/list?${apikey}&language=pt-BR`
  }
}

export function MOVIES_BY_GENRE(apikey, id, page) {
  return {
    url: `https://api.themoviedb.org/3/discover/movie?${apikey}&with_genres=${id}&page=${page}&language=pt-BR`
  }
}

export async function GET_USER_LOGIN (id) {
  try{
  const docRef = doc(db, 'usersLogin', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    return null
  }
}catch{
  return null
}
}
