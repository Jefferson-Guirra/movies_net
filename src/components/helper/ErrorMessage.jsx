import React from 'react'
import styles from './Styles/errorMessage.module.css'
import { BiMoviePlay } from 'react-icons/bi'


const ErrorMessage = () => {
  return (
    <div className={styles.container}>
      <h1> <BiMoviePlay /> Error Forbidden</h1>
    </div>
  )
}

export default ErrorMessage