import { useEffect, useState, useRef } from 'react'
import { NEW_MOVIES } from '../Api'
import Loading from '../components/Loading'
import MovieCard from '../components/MovieCard'
import styles from './Styles/Generic.module.css'
const apiKey = import.meta.env.VITE_API_KEY

const Releases = () => {
  const [movies, setMovies] = useState('')
  const [loading, setLoading] = useState(false)
  const page = useRef(1)
  let wait = false
  const getNewMovie = async (apiKey, page = 1) => {
    setLoading(true)
    const { url } = NEW_MOVIES(apiKey, page)
    const response = await fetch(url)
    const data = await response.json()
    setMovies(data)
    setLoading(false)
  }

  useEffect(() => {
    if (!wait) {
      getNewMovie(apiKey)
    }
  }, [])

  function handleClick(event) {
    if (event.target.value === 'next') {
      page.current = page.current + 1
      getNewMovie(apiKey, page.current)
      setTimeout(() => {
        movies ? window.scrollTo(0, 0) : ''
      }, 150)
    } else {
      if (page.current > 1) {
        page.current = page.current - 1
        getNewMovie(apiKey, page.current)
        setTimeout(() => {
          movies ? window.scrollTo(0, 0) : ''
        }, 150)
      }
    }
  }

  if (loading) return <Loading />
  if (movies)
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Lançamentos</h2>
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
  else return null
}

export default Releases
