import React from 'react'
import styles from './Styles/ErrorLogin.module.css'

const ErrorLogin = ({error}) => {
  return (
    <p className={styles.error}>{error}</p>
  )
}

export default ErrorLogin