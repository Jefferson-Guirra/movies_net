import React from 'react'
import styles from './Styles/ModalHome.module.css'
import { useState, useEffect} from 'react'
import { changeStateModal } from '../store/modal'
import { useDispatch} from 'react-redux'
import { GET_GENRE_MOVIE } from '../Api'
import Exclude from '../assets/exclude.svg'
const apiKey = import.meta.env.VITE_API_KEY

const ModalHome = () => {
  const [genre,setGenre] = useState()
  const dispatch = useDispatch()
  const getMoviesGenre = async()=>{
    const {url} = GET_GENRE_MOVIE(apiKey)
    const response = await fetch(url)
    const data = await response.json()
    setGenre(data)
  }
  useEffect(()=>{
    getMoviesGenre()
  },[])
  if(genre)return (
    <div className={styles.container}>
      <div className={styles.outModal}>
        <button onClick={() => dispatch(changeStateModal())}>
          <img src={Exclude} alt="" />
        </button>
      </div>
      <div className={styles.genres}>
        {genre.genres.map(item => (
          <div className={styles.genre}>{item.name}</div>
        ))}
      </div>
    </div>
  )
  return null
}

export default ModalHome