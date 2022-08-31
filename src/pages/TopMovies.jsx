import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/Loading'
import { topMovies } from '../store/topRatedMovies'
import MovieCard from '../components/MovieCard'
import styles from './Styles/Generic.module.css'
const key = import.meta.env.VITE_API_KEY
const TopMovies = () => {
  const {data,loading} = useSelector((state)=>state.topRatedMovies)
  const page = useRef(1)
  const dispatch = useDispatch()
  let wait = useRef(false)

  useEffect(()=>{
    if(!wait.current){
    dispatch(topMovies({ key, page: 1 }))
    }
    wait.current = true
  })

    function handleClick(event) {
      if (event.target.value === 'next') {
        page.current = page.current + 1
        topMovies({key, page:page.current})
        setTimeout(() => {
          movies ? window.scrollTo(0, 0) : ''
        }, 150)
      } else {
        if (page.current > 1) {
          page.current = page.current - 1
          topMovies({ key, page: page.current })
          setTimeout(() => {
            movies ? window.scrollTo(0, 0) : ''
          }, 150)
        }
      }
    }
  if(loading) <Loading />
  if(data)
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Melhores Filmes</h2>
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
}

export default TopMovies