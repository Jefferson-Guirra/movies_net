import { useState } from "react"
import styles from './Styles/Image.module.css'


const Image = (props) => {
  const [skeleton,setSkeleton] = useState(true)
  function handleOnload(event){
    setSkeleton(false)
    event.target.style.opacity = 1
  }
  return (
    <div className={styles.warapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img className={styles.img} onLoad={handleOnload} src="" alt="" {...props} />

    </div>
  )
}

export default Image