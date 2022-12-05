import styles from './Styles/Loading.module.css'
const Loading = () => {
  console.log('carregando')
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.loader__filmstrip}></div>
        <p className={styles.loader__text}>loading</p>
      </div>
    </div>
  )
}

export default Loading
