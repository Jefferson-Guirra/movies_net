import { useRef, useEffect, useState } from 'react'
import styles from './Styles/Slide.module.css'
import { Link } from 'react-router-dom'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { SIMILAR_MOVIES } from '../Api'
import Image from './helper/Image'

const imageUrl = 'https://image.tmdb.org/t/p/w300/'

const Slide = ({ id, apiKey }) => {
  const [active, setActive] = useState(0)
  const [position, setPosition] = useState(0)
  const [movies, setMovies] = useState(null)
  const out = useRef(0)
  const contentRef = useRef()

  const getSimilarMovies = async (apiKey, page, id) => {
    const { url } = SIMILAR_MOVIES(apiKey, page, id)
    
    const response = await fetch(url)
    const data = await response.json()
    setMovies(data)
  }

  useEffect(() => {
    getSimilarMovies(apiKey, 1, id)
  }, [])

  useEffect(() => {
    const { width } = contentRef.current.getBoundingClientRect()
    setPosition(-(width * active))
  }, [active])

  function slidePrev() {
    if (active > 0) {
      out.current = out.current - 3
      setActive(active - 1)}
  }

  function slideNext() {
    if (out.current < movies.results.length - 2) {
      out.current = out.current + 3
      setActive(active + 1)
    }
  }
  
  return (
    <section className={styles.container}>
      <div
        ref={contentRef}
        className={styles.content}
        style={{ transform: `translate(${position}px)` }}
      >
        {movies &&
          movies.results.map(movie => (
            <div key={movie.id} className={styles.item}>
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to={`/movie/${movie.id}`}
              >
                <span className={styles.img}>
                  <Image src={imageUrl + movie.poster_path} />
                </span>
              </Link>
            </div>
          ))}
      </div>
      <nav className={styles.nav}>
        <button onClick={slidePrev}>
          <GrFormPrevious />
        </button>
        <button onClick={slideNext}>
          <GrFormNext />
        </button>
      </nav>
    </section>
  )
}

export default Slide
