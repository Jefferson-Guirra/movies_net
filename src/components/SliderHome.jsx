import { Swiper} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Styles/sliderHome.css'
export default function Slider({ children, settings}) {



  return (
    <Swiper  {...settings}>
      {children}
    </Swiper>
  )
}
