import React from 'react'
import styles from './Styles/Footer.module.css'
import { RiMovie2Line } from 'react-icons/ri'
const Footer = () => {
  
  
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <RiMovie2Line /> Todos os direitos reservados.
      </div>
    </div>
  )
}

export default Footer
