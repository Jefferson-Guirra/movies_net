import { useEffect,useRef,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import styles from './Styles/Home.module.css'
import { Link } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import Loading from '../components/Loading'
import Slider from '../components/Slider'
import { fetchPopularMovies } from '../store/popularMovies'
import Image from '../components/helper/Image'
import MovieCardHome from '../components/MovieCardHome'
import ModalHome from '../components/ModalHome'


const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG
let cardsHome

const Home = () => {
  const { popularMovies,modal } = useSelector(state => state)
  const dispatch = useDispatch()
  const overflow = 'false'
  const wait = useRef(false)

  const getPopularMovies = () => {
    dispatch(fetchPopularMovies({ apiKey, page: 1 }))
  }
  const { loading, data } = popularMovies

  const settings = { //config swiper slide
    spaceBetween: 30,
    slidesPerView:  3.2
  }

  useEffect(() => {
    cardsHome = [
      { title: 'Lançamentos', rota: '/releases', content: 'newMovies' },
      { title: 'Melhores Filmes', rota: '/top-movies', content: 'topMovies' }
    ]
    if (!wait.current) {
      getPopularMovies()
    }
    wait.current === true
  }, [])


  if (loading) return <Loading />
  if (data?.results)
    return (
      <div className={styles.container}>
        {modal.visibility && <ModalHome/>}
        <div className={styles.title}>
          <Link to="/recommended">
            <div className={styles.rotaLink}>
              <h2>Populares</h2>
            </div>
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

        {cardsHome &&
          cardsHome.map(item => (
            <MovieCardHome
              key={item.title}
              content={item.content}
              title={item.title}
              rota={item.rota}
            ></MovieCardHome>
          ))}
      </div>
    )
  else return null
}

export default Home
