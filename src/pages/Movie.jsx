import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Trailer from '../components/Trailer'
import styles from './Styles/Movie.module.css'
import Loading from '../components/Loading'
import { TbMovie } from 'react-icons/tb'
import Image from '../components/helper/Image'

import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/bs'
import { FaStar, FaRegComments } from 'react-icons/fa'
import Comments from '../components/Comments'
import Slide from '../components/Slide'


const regex =/\-\d{2}/g
const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG

const Movie = () => {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const getMovie = async url => {
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    setMovie(data)
    setLoading(false)
  }

  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}&language=pt-BR`
    getMovie(movieUrl)
    
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
        <div className={styles.header}>
          <Image src={imageUrl + movie.poster_path} alt={movie.title} />

          <div className={styles.contentHeader}>
            <h3>{movie.title}</h3>
            <p>{movie.tagline}</p>
            <p>{movie.release_date.replace(regex, '')}</p>
            <p className={styles.movieStar}>
              {' '}
              <FaStar /> {movie.vote_average}
            </p>
            <div className={styles.genres}>
              {movie.genres.map(genre => (
                <div key={genre.name}>{genre.name}</div>
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
            <Link to={`/similar-movies/${id}`}>
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
