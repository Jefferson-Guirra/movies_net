import { useEffect, useRef, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Styles/MovieCardHome.module.css'
import { topMovies } from '../store/topRatedMovies'
import { getNewMovies } from '../store/newMovies'
import Image from './helper/Image'
import Title from './Title'
import { IoIosArrowForward } from 'react-icons/io'

const apikey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG

const MovieCardHome = ({ title, rota, content }) => {
  const store = useSelector(state => state)
  const dispatch = useDispatch()
  const overflow = 'false'

  let wait = useRef(false)
  useEffect(() => {
    if (!wait.current) {
      content === 'newMovies'
        ? dispatch(topMovies({ key: apikey, page: 1 }))
        : dispatch(getNewMovies({keyMovie: apikey, page:1}))
    }
    wait.current = true
  })

  if (content === 'topMovies' && store.topRatedMovies.data)
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Title rota={rota} title={title} />
          <Link to={rota}>veja mais <IoIosArrowForward /> </Link>
        </div>
        <div className={styles.cards}>
          {store.topRatedMovies.data.results.map(item => (
            <div className={styles.card} key={item.id}>
              <Link to={`/movie/${item.id}`}>
                <Image
                  overflow={overflow}
                  src={`${imageUrl}${item.poster_path}`}
                  alt=""
                />
                <div className={styles.titleMovie}>
                  <p>{item.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  if (content === 'newMovies' && store.newMovies.data) {
      return (
        <div className={styles.container}>
          <div className={styles.header}>
            <Title rota={rota} title={title} />
            <Link to={rota}>
              veja mais <IoIosArrowForward />
            </Link>
          </div>
          <div className={styles.cards}>
            {store.newMovies.data.results.map(item => (
              <div key={item.id}>
                <Link to={`/movie/${item.id}`}>
                  <Image
                    overflow={overflow}
                    src={`${imageUrl}${item.poster_path}`}
                    alt=""
                  />
                  <div className={styles.titleMovie}>
                    <p>{item.title}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )
  } else return null
}

export default memo(MovieCardHome)
