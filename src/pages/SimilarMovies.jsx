import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { GET_MOVIE_ID, SIMILAR_MOVIES } from '../Api'
import Loading from '../components/Loading'
import MovieCard from '../components/MovieCard'
import styles from './Styles/Generic.module.css'
const apiKey = import.meta.env.VITE_API_KEY

const SimilarMovies = () => {
  const { id } = useParams()
  const page = useRef(1)
  const [movies, setMovies] = useState('')
  const [movieTitle, setMovieTitle] = useState('')
  let wait = false

  const getSimilarMovies = async (apiKey, page, id) => {
    const { url } = SIMILAR_MOVIES(apiKey, page, id)
    const response = await fetch(url)
    const data = await response.json()
    setMovies(data)
  }

  const getMovieTitle = async (apiKey, id) => {
    const { url } = GET_MOVIE_ID(apiKey, id)
    const response = await fetch(url)
    const data = await response.json()
    setMovieTitle(data)
  }

  useEffect(() => {
    if (!wait) {
      getSimilarMovies(apiKey, 1, id)
      window.scrollTo(0, 0)
      getMovieTitle(apiKey, id)
    }
    wait = true
  }, [])

  function handleClick(event) {
    if (event.target.value === 'next') {
      page.current = page.current + 1
      getSimilarMovies(apiKey, page.current, id)
      setTimeout(() => {
        movies ? window.scrollTo(0, 0) : ''
      }, 150)
    } else {
      if (page.current > 1) {
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
        <h2 className={styles.title}>Títulos Similares á {movieTitle.title}</h2>
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
