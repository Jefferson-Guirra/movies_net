import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Styles/MovieCardHome.module.css'
import { topMovies } from '../store/topRatedMovies'
import Image from './helper/Image'
import { useRef } from 'react'
const key = import.meta.env.VITE_API_KEY
const MovieCardHome = ({ title }) => {
  const store = useSelector(state => state)
  const imageUrl = import.meta.env.VITE_IMG
  const dispatch = useDispatch()
  const overflow = 'false'
  let wait = useRef(false)
  useEffect(() => {
    if(!wait.current){
      dispatch(topMovies({ key, page: 1 }))
    }
    wait.current = true
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <Link to='/top-movies'>veja mais...</Link>
      </div>
      <div className={styles.cards}>
        {store.topRatedMovies.data?.results.map(item => (
          <div key={item.id}>
            <Link to={`/movie/${item.id}`}>
              <Image
                overflow={overflow}
                src={`${imageUrl}${item.poster_path}`}
                alt=""
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieCardHome
