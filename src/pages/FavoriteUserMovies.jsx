import React from 'react'
import styles from './Styles/UserFavoriteMovies.module.css'
import Clipboard from '../components/Clipboard'
import { db } from '../services/firebaseConnection'
import {doc, getDoc,updateDoc} from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import {MdStarRate} from 'react-icons/md'
import Head from '../components/helper/Head'
import SliderUse from '../components/SliderUse'



const FavoriteList = () => {
  const params = new URLSearchParams(window.location)
  const [user,setUser] = React.useState()
  const [movies, setMovies] = React.useState([])
  const [error,setError] = React.useState(false)
  const [note,setNote] = React.useState('')
  const data = JSON.parse(window.localStorage.getItem('movies_net'))
  const {username,userId} = useParams()
  
  const updateInfoVotes = async(votes,totalNotes) =>{
    if(note !== ''){
      const votesTot = votes + 1
      const updateTotalNotes = totalNotes + Number(note)
      const media = (updateTotalNotes / votesTot).toFixed(1)
      const userRef = doc(db, 'users', data.userId)
      await updateDoc(userRef, {
        avarege:media,
        votes:votesTot,
        totalNotes:updateTotalNotes
      })
      getUser()
      setNote('')

    }
  }

  const handleInput = (event)=>{
    setNote(event.target.value)
  }

  const handleVotes = async (event)=> {
    event.preventDefault()
    const userLogin = JSON.parse(window.localStorage.getItem('movies_net'))
   if(userLogin.userId){
      const refMoviesList = doc(db, 'users', userId)
      const response = await getDoc(refMoviesList)
      const{votes,totalNotes} = response.data()
      updateInfoVotes(votes,totalNotes)

    }
    else{
      alert('login not')
      setError(true)
    }
  }

  const getUser = async () => {
      const refUser = doc(db, 'users', userId)
      const data = await getDoc(refUser)
      const user = data.data()
      setUser(user)
  }
  const getMoviesList = async () => {
    const refMoviesList = doc(db, 'movies', userId)
    const data = await getDoc(refMoviesList)
    const movieList = data.data()?.moviesList
    movieList ? setMovies(movieList) : setMovies([])
  }


  React.useEffect(() => {
    getUser()
    getMoviesList()
  }, [])
  return (
    <div className={styles.container}>
      <Head title={username[0].toUpperCase() + username.substring(1)} />
      <h1 className={styles.title}>
        Minha lista
        <Clipboard data={data} />
      </h1>
      {data?.userId && (
        <div className={styles.containerAvarege}>
          <div className={styles.avarege}>
            <p>{user?.avarege}</p>
            <MdStarRate size={45} color="#f7d354" />
          </div>
          <div className={styles.vote}>
            <p>Gostou da lista?</p>
            <form onSubmit={handleVotes}>
              <label htmlFor="vote">
                <span>Avalie:</span>
              </label>
              <input
                onChange={handleInput}
                value={note}
                id="vote"
                type="number"
                step="0.1"
                min={0}
                max={10}
              />
              <button type="submit">Vote</button>
            </form>
          </div>
        </div>
      )}
      {error && (
        <p style={{ color: '#f31', marginTop: '0.5rem', fontSize: '1.2rem' }}>
          É necessário efetuar o Login.
        </p>
      )}
      {movies.length > 0 && <SliderUse controls={false} list={movies} />}
    </div>
  )
}

export default FavoriteList
