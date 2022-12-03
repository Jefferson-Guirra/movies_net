import { useEffect, useRef } from 'react'
import { fetchPopularMovies } from '../store/popularMovies'
import { useDispatch,useSelector } from 'react-redux'
import MoviesPage from '../components/MoviesPage'
const apiKey = import.meta.env.VITE_API_KEY
import ErrorMessage from '../components/helper/ErrorMessage'

const Recommended = () => {
  const page = useRef(1)
  let wait = false
  const dispatch = useDispatch()
  const {data,loading,error} = useSelector(state=>state.popularMovies)

  function handleClick(value) {
    if (value === 'next' && page.current < data.total_pages) {
      page.current = page.current + 1
      dispatch(fetchPopularMovies({apiKey,page:page.current}))
      setTimeout(() => {
        data ? window.scrollTo(0, 0) : ''
      }, 200)
    } else {
      if (page.current > 1 && value === 'prev') {
        page.current = page.current - 1
        dispatch(fetchPopularMovies({apiKey,page:page.current}))
        setTimeout(() => {
          data ? window.scrollTo(0, 0) : ''
        }, 200)
      }
    }
  }
  useEffect(() => {
    if (!wait) {
      window.scrollTo(0,0)
      dispatch(fetchPopularMovies({apiKey,page:page.current}))
    }
    wait = true
  }, [])
    if(error) return <ErrorMessage error={error} />
    return(
    <MoviesPage title={'Populares'} data={data} loading={loading} handleClick={handleClick} />
    )
  
}

export default Recommended
