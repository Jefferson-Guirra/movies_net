import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearch } from '../store/searchMovie'
import styles from './Styles/Search.module.css'
import { BiMoviePlay } from 'react-icons/bi'
import Loading from '../components/Loading'
const apiKey = import.meta.env.VITE_API_KEY
const Search = ({ control }) => {
  const params = new URLSearchParams(window.location.search)
  const dispatch = useDispatch()
  const query = params.get('q')
  const { data, loading } = useSelector(state => state.searchMovie)

  let wait = false
  useEffect(() => {
    if (!wait && query) {
      dispatch(fetchSearch({ apiKey: apiKey, query: query }))
    }
    wait = true
  }, [control])

  if (data?.results.length === 0)
    return (
      <div className={styles.containerError}>
        <p className={styles.error}>
          {' '}
          <BiMoviePlay /> Filme não encontrado.
        </p>
      </div>
    )
  if (loading) return <Loading />
  if (data?.results)
    return (
      <div className={styles.searchContainer}>
        <h1 className={styles.searchTitle}>{query}</h1>
        <span></span>
        <MovieCard data={data} />
      </div>
    )
  else return null
}

export default Search
