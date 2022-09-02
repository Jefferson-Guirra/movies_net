import { useState, useEffect } from 'react'
import { GET_TRAILER } from '../Api'
const apiKey = import.meta.env.VITE_API_KEY
import styles from './Styles/Trailer.module.css'
const Trailer = ({id}) => {
  const [data,setData] = useState()
  const getTrailerMovie = async ()=>{
    const {url} = GET_TRAILER(apiKey,id)
    const response = await fetch(url)
    const data = await response.json()
    setData(data)
  }

  useEffect(()=>{
    getTrailerMovie()
  },[])
  const keyTrailer = data?.results[0]?.key
  const urlYoutube = 'https://www.youtube.com/watch?v=' + keyTrailer

  if(data?.results && keyTrailer && urlYoutube) 
  return (
    <div className={styles.trailer}>
      <div className={styles.boxVideo}>
      <iframe
        className="video"
        title="Youtube player"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        src={`https://youtube.com/embed/${keyTrailer}?autoplay=0`}
      ></iframe>
      </div>
    </div>
  )
}

export default Trailer