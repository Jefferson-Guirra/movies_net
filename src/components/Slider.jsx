import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import Debounced from '../helper/Debounced'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Styles/slider.css'
import { useState } from 'react'
import { useEffect } from 'react'
export default function Slider({ settings, children }) {
  const [resize,setResize] = useState(false) /// atualiza no resize
  const resizeSlide = Debounced(changeResize,200)
  function changeResize(){
    console.log('ola')
    setResize((state)=> !state)
  }

  useEffect(()=>{
    window.addEventListener('resize',resizeSlide)
    return () => window.removeEventListener('resize',resizeSlide)
  },[])
  return (
    <Swiper modules={[Navigation, Pagination, A11y]} {...settings}>
      {children}
    </Swiper>
  )
}
