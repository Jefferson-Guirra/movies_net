import React from 'react'
import styles from './Styles/FavoriteMovies.module.css'
import Clipboard from '../components/Clipboard'
import { db } from '../services/firebaseConnection'
import {doc, getDoc} from 'firebase/firestore'
import Head from '../components/helper/Head'
import SliderUse from '../components/SliderUse'
import Loading from '../components/Loading'
import { GET_USER_LOGIN } from '../Api'

const FavoriteList = () => {
  const [movies, setMovies] = React.useState([])
  const [error,setError] = React.useState(false)
  const [user,setUser] = React.useState(null)
  const [loading,setLoading] = React.useState(false)
  const data = JSON.parse(localStorage.getItem('movies_net'))
  const token = window.localStorage.getItem('token')

  const getMoviesList = async () => {
    setLoading(true)
    const userLogin = await GET_USER_LOGIN(token)

    if(token && userLogin){
      const refMoviesList = doc(db, 'movies', userLogin.userId)
      const movies = await getDoc(refMoviesList)
      const movieList = movies.data()?.moviesList
      movieList?.length === 0 | !movieList ? setError('Lista vazia.') : setMovies(movieList)
      setUser(userLogin)
    }
    else{
      setError('É necessário efetuar o login.')
    }
    setLoading(false)
  }

  React.useEffect(() => {
      getMoviesList()
  }, [])
  if(loading) return <Loading />
  else
  return (
    <div className={styles.container}>
      <Head
        title={
          user
            ? user?.username[0].toUpperCase() + user?.username.substring(1)
            : 'Lista de Favoritos'
        }
      />
      <h1 className={styles.title}>
        Minha lista
        {user && <Clipboard data={user} /> }
      </h1>
      {error && <p style={{ color: '#f31', fontSize: '1.3rem' , marginBottom:'3rem'}}>{error}</p>}
      {movies?.length > 0 && <SliderUse controls={true} list={movies} />}
    </div>
  )
}

export default FavoriteList
