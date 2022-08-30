import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './Styles/Movie.module.css'
import Loading from '../components/Loading'
import { COMMENTS_MOVIE } from '../Api'
import { TbMovie } from 'react-icons/tb'
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/bs'
import { FaStar, FaRegComments } from 'react-icons/fa'
import Comments from '../components/Comments'
import Slide from '../components/Slide'

const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG

const Movie = () => {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [comments, setComents] = useState('')
  const { id } = useParams()

  const getMovie = async url => {
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    setMovie(data)
    setLoading(false)
  }
  const getComments = async (apiKey, id) => {
    const { url } = COMMENTS_MOVIE(apiKey, id)
    const response = await fetch(url)
    const comments = await response.json()
    setComents(comments)
  }
  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}&language=pt-BR`
    getMovie(movieUrl)
    getComments(apiKey, id)
  }, [id])

  const formatCurrency = number => {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }
  if (loading) return <Loading />
  if (movie)
    return (
      <div className={styles.movieContainer}>
        <img src={imageUrl + movie.poster_path} alt={movie.title} />

        <h3 className={styles.movieTitle}>{movie.title}</h3>
        <p className={styles.movieStar}>
          {' '}
          <FaStar /> {movie.vote_average}
        </p>

        <p className={styles.tagline}>{movie.tagline}</p>
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

        <div className={styles.infoDescription}>
          <h3 style={{ marginBottom: '.5rem' }}>
            <BsFillFileEarmarkTextFill /> Descrição:
          </h3>
          <p>{movie.overview}</p>
        </div>
        <div className={styles.info}>
          <h3>
            <TbMovie />{' '}
            <Link to={`/similar-movies/${id}`}>
              Títulos Similares a {movie.title}
            </Link>
          </h3>
        </div>
        <div className={styles.info}>
          <Slide id={id} apiKey={apiKey} />
        </div>
        <div className={styles.info}>
          <h3>
            <FaRegComments /> Comentários:
          </h3>
        </div>
        {comments && <Comments data={comments.results} />}
        <p className={styles.backTop} onClick={() => window.scrollTo(0, 0)}>
          voltar ao topo
        </p>
      </div>
    )
  else return null
}

export default Movie
