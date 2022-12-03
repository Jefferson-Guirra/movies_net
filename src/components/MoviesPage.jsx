import Loading from './Loading'
import MovieCard from './MovieCard'
import styles from './Styles/MoviesPage.module.css'
import Head from './helper/Head'

const MoviesPage = ({data,loading,handleClick,title}) => {
  
  if (loading) return <Loading />
  if (data)
    return (
      <div className={styles.container}>
        <Head title ={title} />
        <h2 className={styles.title}>{title}</h2>
        <MovieCard data={data} />
        <div className={styles.buttons}>
          <button value="prev" onClick={(event)=>handleClick(event.target.value)}>
            prev
          </button>
          <button value="next" onClick={(event)=>handleClick(event.target.value)}>
            next
          </button>
        </div>
      </div>
    )
}

export default MoviesPage
