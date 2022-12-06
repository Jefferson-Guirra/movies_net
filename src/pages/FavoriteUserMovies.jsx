import React from 'react'
import styles from './Styles/UserFavoriteMovies.module.css'
import Clipboard from '../components/Clipboard'
import { db } from '../services/firebaseConnection'
import {doc, getDoc,updateDoc} from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import {MdStarRate} from 'react-icons/md'
import Head from '../components/helper/Head'
import SliderUse from '../components/SliderUse'
import Loading from '../components/Loading'


const FavoriteList = () => {
  const [movies, setMovies] = React.useState([])
  const [note,setNote] = React.useState('')
  const [avarege,setAvarege] = React.useState(null)
  const [loading,setLoading] = React.useState(false)
  const [loadingPage,setLoadingPage] = React.useState(false)
  const token = window.localStorage.getItem('token')
  const {username,userId} = useParams()
  
  const updateInfoVotes = async(votes,totalNotes) =>{
    if(note !== ''){
      const votesTot = votes + 1
      const updateTotalNotes = totalNotes + Number(note)
      const media = (updateTotalNotes / votesTot).toFixed(1)
      const userRef = doc(db, 'users', userId)
      const moviesRef = doc(db,'movies',userId)
      await updateDoc(userRef, {
        avarege:media,
        votes:votesTot,
        totalNotes:updateTotalNotes
      })
       await updateDoc(moviesRef, {
         userAvarege:media,
         userVote:votesTot
       })
      setAvarege(media)
      setNote('')
    }
  }

  const handleInput = (event)=>{
    setNote(event.target.value)
  }

  const handleVotes = async (event)=> {
    event.preventDefault()
    const token = window.localStorage.getItem('token')
   if(token){
      try{
      setLoading(true)
      const refMoviesList = doc(db, 'users', userId)
      const response = await getDoc(refMoviesList)
      const{votes,totalNotes} = response.data()
      updateInfoVotes(votes,totalNotes)
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }
    }
  }
  
  const getUser = async () => {
    const refUser = doc(db, 'users', userId)
    const data = await getDoc(refUser)
    const user = data.data()
    setAvarege(user?.avarege)
  }

  const getMoviesList = async () => {
    try{
      setLoadingPage(true)
      const refMoviesList = doc(db, 'movies', userId)
      const data = await getDoc(refMoviesList)
      const movieList = data.data()?.moviesList
      if(movieList.length>0){
        setMovies(movieList) 
        getUser()
      }
      else{
        const userRef = doc(db, 'users', userId)
        const moviesRef = doc(db, 'movies', userId)
        await updateDoc(userRef, {
          avarege: 0,
          votes: 0,
          totalNotes: 0
      })
      await updateDoc(moviesRef, {
        userAvarege: 0,
        username: username,
        userId: userId
      })
        setMovies([])
        setAvarege(0)
      }
    }catch(err){
      console.log(err)
    }finally{
      setLoadingPage(false)
    }
  }


  React.useEffect(() => {
    getMoviesList()
  }, [])
  if(loadingPage) return <Loading />
  else
  return (
    <div className={styles.container}>
      <Head title={username[0].toUpperCase() + username.substring(1)} />
      <h1 className={styles.title}>
        {username}
        <Clipboard data={{username,userId}} />
      </h1>
      {!token && (
        <p style={{ color: '#f31', marginTop: '0.5rem', fontSize: '1.2rem' }}>
          É necessario fazer login para habilitar a votação.
        </p>
      )}
      {movies.length === 0 && (
        <p style={{ color: '#f31', marginTop: '0.5rem', fontSize: '1.2rem' }}>
          Lista Vazia.
        </p>
      )}
      {token && movies.length > 0 && (
        <div className={styles.containerAvarege}>
          <div className={styles.avarege}>
            <p>{avarege}</p>
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
              {!loading ? (
                <button type="submit">Vote</button>
              ) : (
                <button disabled>votando...</button>
              )}
            </form>
          </div>
        </div>
      )}
      {movies.length > 0 && <SliderUse controls={false} list={movies} />}
    </div>
  )
}

export default FavoriteList
