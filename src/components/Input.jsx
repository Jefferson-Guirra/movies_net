import React from 'react'
import styles from './Styles/input.module.css'
const Input = ({
  label,
  type,
  name,
  onChange,
  setValue,
  value,
  erro,
  onBlur
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      <input
        id={name}
        type={type}
        className={styles.input}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />

      {erro && <p className={styles.error}>{erro}</p>}
    </div>
  )
}

export default Input
