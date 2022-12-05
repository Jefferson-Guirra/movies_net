import React from 'react'
import styles from './Styles/FavoriteMovies.module.css'
import Clipboard from '../components/Clipboard'
import { db } from '../services/firebaseConnection'
import {doc, getDoc} from 'firebase/firestore'
import Head from '../components/helper/Head'
import SliderUse from '../components/SliderUse'

const FavoriteList = () => {
  const [movies, setMovies] = React.useState([])
  const [error,setError] = React.useState(false)
  const data = JSON.parse(localStorage.getItem('movies_net'))
  const getMoviesList = async () => {
    if(data){
      const refMoviesList = doc(db, 'movies', data.userId)
      const movies = await getDoc(refMoviesList)
      const movieList = movies.data()?.moviesList
      console.log(movieList)
      movieList?.length === 0 | !movieList ? setError('Lista vazia.') : setMovies(movieList)
    }
    else{
      setError('É necessário efetuar o login.')
    }
  }

  React.useEffect(() => {
      getMoviesList()
  }, [])
  return (
    <div className={styles.container}>
      <Head
        title={
          data
            ? data?.username[0].toUpperCase() + data?.username.substring(1)
            : 'Lista de Favoritos'
        }
      />
      <h1 className={styles.title}>
        Minha lista
        <Clipboard data={data} />
      </h1>
      {error && <p style={{ color: '#f31', fontSize: '1.3rem' , marginBottom:'3rem'}}>{error}</p>}
      {movies?.length > 0 && <SliderUse controls={true} list={movies} />}
    </div>
  )
}

export default FavoriteList
