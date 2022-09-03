import { useEffect, useRef,memo, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import styles from './Styles/Home.module.css'
import { Link } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import Loading from '../components/Loading'
import Slider from '../components/Slider'
import { fetchPopularMovies } from '../store/popularMovies'
import Image from '../components/helper/Image'
import MovieCardHome from '../components/MovieCardHome'
import { getNewMovies } from '../store/newMovies'
import { topMovies } from '../store/topRatedMovies'
import { IoIosArrowForward } from 'react-icons/io'

const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG

const Home = () => {
  const { popularMovies } = useSelector(state => state)
  const { loading, data } = popularMovies
  const dispatch = useDispatch()
  const overflow = 'false'
  const wait = useRef(false)

  const getPopularMovies = () => {
    dispatch(fetchPopularMovies({ apiKey, page: 1 }))
  }
  useEffect(() => {
    if ( !wait.current ) {
      getPopularMovies()
    }
    wait.current = true
  }, [])


  const getNewMoviesData = () => {
    dispatch(getNewMovies({ keyMovie: apiKey, page: 1 }))
  }
  const getTopMoviesData = () => {
    dispatch(topMovies({ key: apiKey, page: 1 }))
  }

  const settings = {
    //config swiper slide
    spaceBetween: 30,
    slidesPerView: 3.2
  }

  if (loading) return <Loading />
  if (data?.results)
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <Link to="/popular">
            <h2>Populares</h2>
          </Link>
          <Link to="/popular">
            veja mais <IoIosArrowForward />{' '}
          </Link>
        </div>

        {data && (
          <Slider settings={settings}>
            {data?.results.map(item => (
              <SwiperSlide key={item.id}>
                <div className="text">
                  <p>{item.title}</p>
                </div>
                <Link to={`/movie/${item.id}`}>
                  <Image
                    overflow={overflow}
                    src={`${imageUrl}${item.poster_path}`}
                    alt={item.title}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Slider>
        )}

        {data && (
          <MovieCardHome
            handleDispatch={getNewMoviesData}
            content={'newMovies'}
            title={'lançamentos'}
            rota={'/releases'}
          ></MovieCardHome>
        )}
        {data && (
          <MovieCardHome
            handleDispatch={getTopMoviesData}
            content={'topRatedMovies'}
            title={'Melhores Filmes'}
            rota={'/top-movies'}
          ></MovieCardHome>
        )}
      </div>
    )
  else return null
}

export default memo(Home)
