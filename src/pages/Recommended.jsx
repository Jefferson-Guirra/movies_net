import { useEffect, useState, useRef } from 'react'
import { RECOMMENDED_MOVIE } from '../Api'
import Loading from '../components/Loading'
import MovieCard from '../components/MovieCard'
import styles from './Styles/Generic.module.css'
const apiKey = import.meta.env.VITE_API_KEY

const Recommended = () => {
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const page = useRef(1)
  let wait = false

  const getMoviesWeek = async (apiKey, page) => {
    setLoading(true)
    const { url } = RECOMMENDED_MOVIE(apiKey, page)
    const response = await fetch(url)
    const data = await response.json()
    setData(data)
    setLoading(false)
  }

  function handleClick(event) {
    if (event.target.value === 'next') {
      page.current = page.current + 1
      getMoviesWeek(apiKey, page.current)
      setTimeout(() => {
        data ? window.scrollTo(0, 0) : ''
      }, 150)
    } else {
      if (page.current > 1) {
        page.current = page.current - 1
        getMoviesWeek(apiKey, page.current)
        setTimeout(() => {
          data ? window.scrollTo(0, 0) : ''
        }, 150)
      }
    }
  }

  useEffect(() => {
    if (!wait) {
      getMoviesWeek(apiKey)
    }
    wait = true
  }, [])

  if (loading) return <Loading />
  if (data?.results)
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Recomendados</h2>
        <MovieCard data={data} />
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

export default Recommended
