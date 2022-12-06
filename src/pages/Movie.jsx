import { useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import Trailer from '../components/Trailer'
import styles from './Styles/Movie.module.css'
import Loading from '../components/Loading'
import { TbMovie } from 'react-icons/tb'
import { IoAdd } from 'react-icons/io5'
import { AiOutlineCheck } from 'react-icons/ai'
import Image from '../components/helper/Image'
import { doc,getDoc, setDoc,updateDoc } from 'firebase/firestore'
import { db } from '../services/firebaseConnection'
import { GET_USER_LOGIN } from '../Api'
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/bs'
import { FaStar, FaRegComments } from 'react-icons/fa'
import Comments from '../components/Comments'
import Slide from '../components/Slide'
import ErrorMessage from '../components/helper/ErrorMessage'
import Head from '../components/helper/Head'

const regex = /\-\d{2}/g
const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG

const Movie = () => {
  const [movie, setMovie] = useState(null)
  const [favoriteMovie,setFavoriteMovie] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [user,setUser] = useState(false)
  const { id } = useParams()
  const movieUrl = `${moviesUrl}${id}?${apiKey}&language=pt-BR`
  const token = window.localStorage?.getItem('token')
  
  const movieIsFavorite = async()=>{
    try{
    const usersLogin = await GET_USER_LOGIN(token)
    const {username,userId} = usersLogin
    setUser(usersLogin)
    setFavoriteMovie(false)
    const refMoviesList = doc(db, 'movies',userId)
    const response = await getDoc(refMoviesList)
    const movieList = response.data().moviesList
    const validate = movieList.findIndex(item=>item.movieId === Number(id))
    if(validate !== -1){
      setFavoriteMovie(true)
    }
    else{
      setFavoriteMovie(false)
    }
    }catch(err){
      console.log(err)
      setFavoriteMovie(false)
    }
  
  }
  const handleAddMovie = async () => {
    const usersLogin = await GET_USER_LOGIN(token)
    if (!favoriteMovie && usersLogin) {
      try{
      const refMoviesList = doc(db, 'movies',user.userId)
      const response = await getDoc(refMoviesList)
      const {moviesList} = response.data()
      const favoriteMovie = {
        title: movie.title.toLowerCase(),
        view: false,
        movieId: movie.id,
        movieGenres: movie.genres.map(item=>item.name),
        cover: imageUrl + movie.poster_path,
        userId: user.userId,
        avarage: 0,
        AddAt: new Date()
      } 
        const favoriteListMovie = await updateDoc(
          doc(db, 'movies', user.userId),
          {
            moviesList: [...moviesList, favoriteMovie]
          }
        )
      

      setFavoriteMovie(true)
      }catch(err){
        console.log(err)
        const favoriteMovie = {
          title: movie.title.toLowerCase(),
          view: false,
          avarage: 0,
          movieId: movie.id,
          movieGenres: movie.genres.map(item => item.name),
          cover: imageUrl + movie.poster_path,
          userId: user.userId,
          AddAt: new Date()
        } 
        const favoriteListMovie = await setDoc(doc(db, 'movies', user.userId), {
          userAvarege:0,
          username: user.username,
          userId:user.userId,
          moviesList: [favoriteMovie]
        })
          setFavoriteMovie(true)
      }
     
    }
    else if (!usersLogin){
      alert('É necessario efetuar o login')
    }
  }
  const getMovie = async url => {
    setError(false)
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    data.status_message ? setError(data.status_message) : setMovie(data)
    setLoading(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getMovie(movieUrl)
    movieIsFavorite()
  }, [id])

  const formatCurrency = number => {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage error={error} />
  if (movie)
    return (
      <div className={styles.movieContainer}>
        <Head title={movie.title} />
        <div
          style={{
            backgroundImage: `url(${imageUrl}${movie.backdrop_path})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left left',
            backgroundSize: 'cover',
            marginTop: '2rem'
          }}
        >
          <div className={styles.header}>
            <Image src={imageUrl + movie.poster_path} alt={movie.title} />

            <div className={styles.contentHeader}>
              <h3>{movie.title}</h3>
              <p>{movie.tagline}</p>
              <p>{movie.release_date.replace(regex, '')}</p>
              {favoriteMovie === true ? (
                <button
                  onClick={handleAddMovie}
                  className={styles.addMovieList}
                >
                  <AiOutlineCheck />
                  minha Lista
                </button>
              ) : (
                <button
                  onClick={handleAddMovie}
                  className={styles.addMovieList}
                >
                  <IoAdd />
                  minha Lista
                </button>
              )}
              <p className={styles.movieStar}>
                {' '}
                <FaStar /> {movie.vote_average}
              </p>
              <div className={styles.genres}>
                {movie.genres.map(genre => (
                  <Link
                    key={genre.id}
                    to={`/movie-genre/${genre.name}/${genre.id}`}
                  >
                    <div>{genre.name}</div>
                  </Link>
                ))}
              </div>

              <div className={styles.info}>
                <h3>
                  <BsWallet2 /> Orçamento:
                </h3>
                <p>{formatCurrency(movie.budget)}</p>
              </div>

              <div className={styles.info}>
                <h3>
                  <BsGraphUp /> Receita:
                </h3>
                <p>{formatCurrency(movie.revenue)}</p>
              </div>
              <div className={styles.info}>
                <h3>
                  <BsHourglassSplit /> Duração:
                </h3>
                <p>{movie.runtime} minutos</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.infoDescription}>
          <h3 style={{ marginBottom: '.5rem' }}>
            <BsFillFileEarmarkTextFill /> Descrição:
          </h3>
          <p>{movie.overview}</p>
        </div>
        <Trailer id={id} />
        <div
          style={{ marginBottom: '1rem', paddingInline: '1rem' }}
          className={styles.info}
        >
          <h3>
            <TbMovie />{' '}
            <Link to={`/similar-movies/${movie.title}/${id}`}>
              Títulos Similares a {movie.title}
            </Link>
          </h3>
        </div>

        <Slide id={id} apiKey={apiKey} />

        <div
          style={{ marginBottom: '1rem', paddingInline: '1rem' }}
          className={styles.info}
        >
          <h3>
            <FaRegComments /> Comentários:
          </h3>
        </div>
        <Comments id={movie.id} />
        <p className={styles.backTop} onClick={() => window.scrollTo(0, 0)}>
          voltar ao topo
        </p>
      </div>
    )
  else return null
}

export default Movie
