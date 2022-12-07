import React from 'react'
import styles from './Styles/Alert.module.css'
import { BiCameraMovie} from 'react-icons/bi'


const MessageAlert = ({text}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <BiCameraMovie color="#f7d354" />
        <p>{text}</p>
      </div>
    </div>
  )
}

export default MessageAlert