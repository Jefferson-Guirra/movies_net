import React from 'react'
import styles from './Styles/Clipboard.module.css'
import { FiShare2 } from 'react-icons/fi'


const Clipboard = ({data}) => {
  const [clipboard, setClipboard] = React.useState(false)
  const handleClipBoard = () => {
    const url =
      window.location.origin +
      `/user-favorite/${data.username}/${data.userId}`
    navigator.clipboard.writeText(url)
    setClipboard(true)
    setTimeout(() => {
      setClipboard(false)
    }, 1500)
  }
  return (
    <button
      className={
        clipboard
          ? `${styles.clipBoard} ${styles.visibility}`
          : styles.clipBoard
      }
      onClick={handleClipBoard}
    >
      <FiShare2 color="#fff" size={35} />
    </button>
  )
}

export default Clipboard
