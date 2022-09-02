import React from 'react'
import styles from './Styles/ModalGenre.module.css'
import { useState, useEffect } from 'react'
import { changeStateModal } from '../store/modal'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { GET_GENRE_MOVIE } from '../Api'
import Exclude from '../assets/exclude.svg'
const apiKey = import.meta.env.VITE_API_KEY

const ModalGenre = ({ genreTitle }) => {
  const [genre, setGenre] = useState()
  const dispatch = useDispatch()
  const getMoviesGenre = async () => {
    const { url } = GET_GENRE_MOVIE(apiKey)
    const response = await fetch(url)
    const data = await response.json()
    setGenre(data)
  }
  useEffect(() => {
    getMoviesGenre()
  }, [])

  if (genre)
    return (
      <div className={styles.container}>
        <div className={styles.outModal}>
          <button onClick={() => dispatch(changeStateModal())}>
            <img src={Exclude} alt="" />
          </button>
        </div>
        <div className={styles.genres}>
          {genre.genres.map(item => (
            <Link
              onClick={() => {
                dispatch(changeStateModal())
              }}
              key={item.name}
              to={`/movie-genre/${item.name}/${item.id}`}
            >
              <div className={styles.genre}>{item.name}</div>
            </Link>
          ))}
        </div>
      </div>
    )
  return null
}

export default ModalGenre
