import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux/es/exports'
import {Link} from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import Loading from '../components/Loading'
import Slider from '../components/Slider'
import { fetchPopularMovies } from '../store/popularMovies'
import Image from '../components/helper/Image'
const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG
const Home = () => {
  const {popularMovies} = useSelector((state)=>state)
  const dispatch = useDispatch()

  const getPopularMovies = () =>{
    dispatch(fetchPopularMovies({key:apiKey,page:1}))
  }
  const {loading,data} = popularMovies
  useEffect(()=>{
    getPopularMovies(apiKey)
  },[])
  const settings = {
    spaceBetween: 50,
    slidesPerView: 6,
    navigation: true
  }
  console.log(popularMovies)
  if(loading) return <Loading />
  if(data) return (
    <Slider settings={settings}>
      {data.results.map(item => (
        <SwiperSlide key={item.id}>
          <Link to={`/movie/${item.id}`}>
            <Image src={`${imageUrl}${item.poster_path}`} alt={item.title} />
            
          </Link>
        </SwiperSlide>
      ))}
    </Slider>
  )
}

export default Home
