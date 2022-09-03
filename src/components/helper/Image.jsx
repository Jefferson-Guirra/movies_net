import { useState } from "react"
import styles from './Styles/Image.module.css'


const Image = (props) => {
  const [skeleton,setSkeleton] = useState(true)
  function handleOnload(event){
    setSkeleton(false)
    event.target.style.opacity = 1
  }

  return (
    <div className={props.overflow === 'true' ?styles.wrapper : styles.wrapperNoneOverflow}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img className={props.overflow === 'true' ? styles.img : `${styles.img} ${styles.animated}`} onLoad={handleOnload} src="" alt="" {...props} />

    </div>
  )
}

export default Image