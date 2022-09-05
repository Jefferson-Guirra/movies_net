import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import {SIMILAR_MOVIES } from '../Api'
import Loading from '../components/Loading'
import MovieCard from '../components/MovieCard'
import styles from './Styles/SimilarMovies.module.css'
const apiKey = import.meta.env.VITE_API_KEY

const SimilarMovies = () => {
  const { id,movie } = useParams()
  const page = useRef(2)
  const [movies, setMovies] = useState('')
  let wait = false

  const getSimilarMovies = async (apiKey, page, id) => {
    const { url } = SIMILAR_MOVIES(apiKey, page, id)
    const response = await fetch(url)
    const data = await response.json()
    setMovies(data)
  }

  useEffect(() => {
    if (!wait) {
      getSimilarMovies(apiKey, 2, id)
      window.scrollTo(0, 0)
    }
    wait = true
  }, [])

  function handleClick(event) {
    if (event.target.value === 'next' && page.current < data.total_pages) {
      page.current = page.current + 1
      getSimilarMovies(apiKey, page.current, id)
      setTimeout(() => {
        movies ? window.scrollTo(0, 0) : ''
      }, 150)
    } else {
      if ( event.target.value === 'prev' && page.current > 2) {
        page.current = page.current - 1
        getSimilarMovies(apiKey, page.current, id)
        setTimeout(() => {
          movies ? window.scrollTo(0, 0) : ''
        }, 150)
      }
    }
  }

  if (!movies) return <Loading />
  else
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Títulos Similares á {movie}</h2>
        <MovieCard data={movies} />
        <div className={styles.buttons}>
          <button value="prev" onClick={handleClick}>
            prev
          </button>
          <button value="next" onClick={handleClick}>
            next
          </button>
        </div>
      </div>
    )
}

export default SimilarMovies
