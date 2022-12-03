import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { topMovies } from '../store/topRatedMovies'
import MoviesPage from '../components/MoviesPage'
import ErrorMessage from '../components/helper/ErrorMessage'

const apiKey = import.meta.env.VITE_API_KEY
const TopMovies = () => {
  const {data,loading,error} = useSelector((state)=>state.topRatedMovies)
  const page = useRef(2)
  const dispatch = useDispatch()
  let wait = useRef(false)
  
  useEffect(()=>{
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
  
  if(error)return <ErrorMessage />
  return(
    <MoviesPage handleClick={handleClick} data={data} loading={loading} title={'Melhores Filmes'} />
  )
}

export default TopMovies