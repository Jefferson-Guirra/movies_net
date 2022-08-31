import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux/es/exports'
import styles from './Styles/Home.module.css'
import {Link} from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import Loading from '../components/Loading'
import Slider from '../components/Slider'
import { fetchPopularMovies } from '../store/popularMovies'
import Image from '../components/helper/Image'
import MovieCardHome from '../components/MovieCardHome'
import { useRef } from 'react'
const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG
const Home = () => {
  const {popularMovies, topRatedMovies} = useSelector((state)=>state)
  const dispatch = useDispatch()
  const overflow = 'false'
  const wait = useRef(false)
  
  const getPopularMovies = () =>{
    dispatch(fetchPopularMovies({key:apiKey,page:1}))
  }
  const {loading, data} = popularMovies

  useEffect(()=>{
      if(!wait.current){
      getPopularMovies(apiKey)
      }
      wait.current = true
  },[])
  const settings = {
    spaceBetween: window.innerWidth > 700 ? 50 :30,
    slidesPerView: window.innerWidth > 700 ? 5 : 4,
  }

  if(loading) return <Loading />
  if(data) return (
    <div className={styles.container}>
      <Slider settings={settings}>
        {data.results.map(item => (
          <SwiperSlide key={item.id}>
            <Link to={`/movie/${item.id}`}>
              <Image overflow={overflow} src={`${imageUrl}${item.poster_path}`} alt={item.title} />
            </Link>
          </SwiperSlide>
        ))}
      </Slider>
      <MovieCardHome title={`Melhores filmes`} />
    </div>
  )
  else return null
}

export default Home
