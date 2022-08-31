import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/Loading'
import { topMovies } from '../store/topRatedMovies'
import MovieCard from '../components/MovieCard'
import styles from './Styles/Generic.module.css'
import MoviesPage from '../components/MoviesPage'

const apiKey = import.meta.env.VITE_API_KEY
const TopMovies = () => {
  const {data,loading} = useSelector((state)=>state.topRatedMovies)
  const page = useRef(2)
  const dispatch = useDispatch()
  let wait = useRef(false)

  
  useEffect(()=>{
    console.log('ola')
    setTimeout(()=>{
    window.scrollTo(0, 0)
    },150)
    if(!wait.current){
    dispatch(topMovies({ key: apiKey, page: 2 }))
    }
    wait.current = true
  },[])
    function handleClick(value) {
      if (value === 'next' && page.current < data.total_pages) {
        page.current = page.current + 1
        dispatch(topMovies({key:apiKey, page:page.current}))
        setTimeout(() => {
          window.scrollTo(0, 0) 
        }, 200)
      } else {
        if ( value === 'prev' && page.current > 2) {
          page.current = page.current - 1
          dispatch(topMovies({ key:apiKey, page: page.current }))
          setTimeout(() => {
            window.scrollTo(0, 0) 
          }, 200)
        }
      }
    }
  
  if(loading) return  <Loading />
  else return(
    <MoviesPage handleClick={handleClick} data={data} loading={loading} />
  )
}

export default TopMovies