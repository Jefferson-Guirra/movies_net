import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import styles from './Styles/MoviesCard.module.css'
import Image from './helper/Image'

const imageUrl = import.meta.env.VITE_IMG
const overflow = 'true'
const MovieCard = ({ data, showLink = true }) => {
  if (data?.results)
    return (
      <div className={styles.containerCard}>
        {data.results.map(movie => (
          <div key={movie.id}>
            <div className={styles.contentCard}>
              <Image overflow={overflow} src={imageUrl + movie.poster_path} alt={movie.title}/>
              <h3 style={{ marginTop: '.5rem' }}>{movie.title}</h3>
              <p>
                {' '}
                <FaStar /> {movie.vote_average}
              </p>
              {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
            </div>
          </div>
        ))}
      </div>
    )
  else return null
}

export default MovieCard
