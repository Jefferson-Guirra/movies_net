import { useState,useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { MOVIES_BY_GENRE } from '../Api'
import MoviesPage from '../components/MoviesPage'


const apiKey = import.meta.env.VITE_API_KEY

const MoviesGenre = ({genreTitle}) => {
  const [data,setData] = useState()
  const [loading,setLoading] = useState(false)
  const page = useRef(1)
  const {id,genre} = useParams()

  useEffect(() => {
    getMoviesGenre(apiKey, id)
  }, [id])

  const getMoviesGenre= async (apiKey,id)=>{
    const {url} = MOVIES_BY_GENRE(apiKey,id)
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    setData(data)
    setLoading(false)
  }
   
  function handleClick(value) {
    if (value === 'next' && page.current < data.total_pages) {
      page.current = page.current + 1
      getMoviesGenre(apiKey,id,page)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 200)
    } else {
      if (value === 'prev' && page.current > 1) {
        page.current = page.current - 1
        getMoviesGenre(apiKey, id, page)
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 200)
      }
    }
  }

  
  console.log(genre)
  return (
    <MoviesPage data={data} loading={loading} handleClick={handleClick} title={genre} />
  )
}

export default MoviesGenre