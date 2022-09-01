import React from 'react'
import styles from './Styles/Title.module.css'
import { Link } from 'react-router-dom'
const Title = ({title,rota}) => {
  return (
    <div className={styles.container}>
      <Link to={rota}>
        <h2 className={styles.title}>{title}</h2>
      </Link>
    </div>
  )
}

export default Title