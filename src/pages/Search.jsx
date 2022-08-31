import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearch } from '../store/searchMovie'
import styles from './Styles/Search.module.css'
import { BiMoviePlay } from 'react-icons/bi'
import Loading from '../components/Loading'
import MoviesPage from '../components/MoviesPage'
const apiKey = import.meta.env.VITE_API_KEY
const Search = ({ control }) => {
  const params = new URLSearchParams(window.location.search)
  const dispatch = useDispatch()
  const query = params.get('q')
  const { data, loading } = useSelector(state => state.searchMovie)
  let wait = false
  useEffect(() => {
    if (!wait && query) {
      dispatch(fetchSearch({ apiKey, query }))
    }
    wait = true
  }, [control])



  function handleClick(event) {
    if (event.target.value === 'next' && page.current < data.total_pages) {
      page.current = page.current + 1
      dispatch(fetchSearch({ key, page: page.current }))
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 150)
    } else {
      if (event.target.value === 'prev' && page.current > 2) {
        page.current = page.current - 1
        dispatch(topMovies({ key, page: page.current }))
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 150)
      }
    }
  }

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
  else
    return (
      <MoviesPage handleClick={handleClick} data={data} loading={loading} />
    )
  
}

export default Search
