import { useEffect, useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getNewMovies } from '../store/newMovies'
import MoviesPage from '../components/MoviesPage'
import ErrorMessage from '../components/helper/ErrorMessage'
const apiKey = import.meta.env.VITE_API_KEY

const Releases = () => {
  const dispatch = useDispatch()
  const {data,loading,error} = useSelector(state=>state.newMovies)
  const page = useRef(2)
  let wait = useRef(false)

  useEffect(() => {
    window.scrollTo(0,0)
    if (!wait.current) {
      dispatch(getNewMovies({keyMovie:apiKey,page:2}))
    }
    wait.current = true
  }, [])

  function handleClick(value) {
    if (value === 'next') {
      page.current = page.current + 1
      dispatch(getNewMovies({keyMovie:apiKey,page:page.current}))
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 200)
    } else {
      if (page.current > 2 && value === 'prev') {
        page.current = page.current - 1
        dispatch(getNewMovies({keyMovie:apiKey,page:page.current}))
        setTimeout(() => {
          window.scrollTo(0, 0) 
        }, 200)
      }
    }
  }
    if(error) return <ErrorMessage error={error} />
    return (
      <MoviesPage data={data} handleClick={handleClick} title={'Lançamentos'} loading={loading}  />
    )
}

export default Releases
