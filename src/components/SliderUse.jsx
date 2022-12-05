import React from 'react'
import styles from './Styles/SliderUser.module.css'
import { GenreMovies } from '../helper/GenreMovies'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { BiSearchAlt2 } from 'react-icons/bi'
import Select from 'react-select'
import { db } from '../services/firebaseConnection'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import {
  AiOutlineCheck,
  AiOutlineFolderAdd,
  AiOutlineDelete
} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { FaStar } from 'react-icons/fa'
import { MdClear } from 'react-icons/md'
import Image from './helper/Image'

const SliderUse = ({list,controls}) => {
  const [movies, setMovies] = React.useState(list)
  const [active, setActive] = React.useState(0)
  const [position, setPosition] = React.useState(0)
  const [input, setInput] = React.useState('')
  const [select, setSelect] = React.useState('')
  const [cardMobile, setCardMobile] = React.useState(false)
  const contentRef = React.useRef()
  const count = React.useRef(3)
  const validateSlideActive = React.useRef(3)
  const genreMovies = GenreMovies.map(item => ({
    value: item,
    label: item,
    color: '#111'
  }))
   let options = [{ value: '', label: 'Gêneros', color: '#111' }]
   options = [...options, ...genreMovies]

   let filtredMovies = movies.filter(item => item.title.includes(input))
   
   if (input !== '') {
     filtredMovies = filtredMovies.filter(item => item.title.includes(input))
   }

   if (select !== '') {
     filtredMovies = filtredMovies.filter(item =>
       item.movieGenres.includes(select)
     )
   }
   const handleDelete = async idMovie => {
     const dataLogin = JSON.parse(window.localStorage.getItem('movies_net'))
     if (dataLogin?.userId && controls) {
       const newMovies = movies.filter(movie => movie.movieId !== idMovie)
       const newListView = await setDoc(doc(db, 'movies', dataLogin.userId), {
         moviesList: [...newMovies]
       })
       setMovies(newMovies)
     }
   }
   const handleSelect = selected => {
     setSelect(selected.value)
   }

   const handleFilter = event => {
     event.preventDefault()
     setInput(input.toLowerCase())
   }
   const handleInput = value => {
     setInput(value.toLowerCase())
   }
   const watchMediaQuery = () => {
     let mql = window.matchMedia('(max-width: 800px)')
     if (mql.matches) {
       setCardMobile(true)
       validateSlideActive.current = 1
       count.current = 1
     } else {
       setCardMobile(false)
       validateSlideActive.current = 3
       count.current = 3
     }
   }

   const handleAvarege = async (movieId, star) => {
     const dataLogin = JSON.parse(window.localStorage.getItem('movies_net'))
     if (dataLogin?.userId && controls) {
       const refMoviesList = doc(db, 'movies', dataLogin.userId)
       const response = await getDoc(refMoviesList)
       const movieList = response.data().moviesList
       let newList = movieList
       const index = newList.findIndex(item => item.movieId === movieId)
       newList[index].avarege = star
       const newListView = await setDoc(doc(db, 'movies', dataLogin.userId), {
         moviesList: [...newList]
       })
       setMovies(newList)
     } 
   }
   const handleView = async (movieId, view) => {
     const loginUser = JSON.parse(window.localStorage.getItem('movies_net'))
     if (loginUser?.userId && controls) {
       const refMoviesList = doc(db, 'movies', loginUser.userId)
       const response = await getDoc(refMoviesList)
       const movieList = response.data().moviesList
       let newList = movieList
       const index = newList.findIndex(item => item.movieId === movieId)
       newList[index].view = view
       const newListView = await setDoc(doc(db, 'movies', loginUser.userId), {
         moviesList: [...newList]
       })
       setMovies(newList)
     }
   }

   const handleTime = time => {
     const timeStamp = new Timestamp(time.seconds, time.nanoseconds)
     const timeFormat = timeStamp.toDate()
     return timeFormat
   }

   function slidePrev() {
     if (validateSlideActive.current > count.current) {
       validateSlideActive.current = validateSlideActive.current - count.current
       setActive(active - 1)
     }
   }

   function slideNext() {
     if (validateSlideActive.current < movies.length) {
       validateSlideActive.current = validateSlideActive.current + count.current
       setActive(active + 1)
     }
   }

   React.useEffect(() => {
     const { width } = contentRef.current.getBoundingClientRect()
     setPosition(-(width * active))
   }, [active])

   React.useEffect(() => {
     watchMediaQuery()
   }, [])


  return (
    <>
      {movies.length === 0 && <p style={{ color: '#f31', fontSize: '1.3rem' , marginBottom:'3rem'}}>Navegue e adicione filmes.</p>}
      <form onSubmit={handleFilter} className={styles.form}>
        <Select
          className={styles.selected}
          value={select}
          onChange={handleSelect}
          placeholder={select ? select : 'Filtrar'}
          options={options}
          styles={{
            menu: () => ({
              backgroundColor: '#1212',
              position: 'absolute',
              zIndex: '10'
            }),
            option: (provided, state) => ({
              ...provided,
              color: state.isFocused ? '#000000' : '#fff',
              backgroundColor: state.isFocused ? '#f7d354' : state.data.color
            }),
            control: () => ({
              backgroundColor: 'transparent',
              display: 'flex',
              width: '130px',
              overflow: 'hidden'
            }),
            placeholder: (provided, state) => ({
              textAlign: 'center',
              width: '100%',
              color: '#eee',
              position: 'absolute'
            }),
            input: () => ({
              color: '#FFF'
            })
          }}
        />

        <input
          value={input}
          onChange={({ target }) => handleInput(target.value)}
          placeholder="Buscar..."
          type="text"
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>
      <main className={styles.content}>
        <div
          ref={contentRef}
          className={styles.sliderContainer}
          style={{ transform: `translate(${position}px)` }}
        >
          {filtredMovies.length > 0
            ? filtredMovies.map((movie,index)=> (
                <div
                  style={{
                    width: cardMobile ? '80%' : '30%',
                    marginInline: cardMobile ? '10%' : '1,65%'
                  }}
                  key={index}
                  className={styles.cardMovie}
                >
                  <Link to={`/movie/${movie.movieId}`}>
                    <Image
                      overflow="true"
                      src={movie.cover}
                      alt={movie.title}
                    />
                  </Link>
                  <div className={styles.contentCard}>
                    <div className={styles.info}>
                      <div className={styles.stars}>
                        <button onClick={() => handleAvarege(movie.movieId, 1)}>
                          <FaStar
                            color={movie.avarege >= 1 ? '#f7d354' : '#eee'}
                          />
                        </button>
                        <button onClick={() => handleAvarege(movie.movieId, 2)}>
                          <FaStar
                            color={movie.avarege >= 2 ? '#f7d354' : '#eee'}
                          />
                        </button>
                        <button onClick={() => handleAvarege(movie.movieId, 3)}>
                          <FaStar
                            color={movie.avarege >= 3 ? '#f7d354' : '#eee'}
                          />
                        </button>
                        <button onClick={() => handleAvarege(movie.movieId, 4)}>
                          <FaStar
                            color={movie.avarege >= 4 ? '#f7d354' : '#eee'}
                          />
                        </button>
                        <button onClick={() => handleAvarege(movie.movieId, 5)}>
                          <FaStar
                            color={movie.avarege >= 5 ? '#f7d354' : '#eee'}
                          />
                        </button>
                      </div>
                      <p>
                        <AiOutlineFolderAdd size={30} />
                        {handleTime(movie.AddAt).toLocaleDateString('pt-br', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className={styles.actions}>
                      {movie.view ? (
                        <button
                          onClick={() => handleView(movie.movieId, false)}
                        >
                          <AiOutlineCheck size={25} color="green" />
                          Visto
                        </button>
                      ) : (
                        <button onClick={() => handleView(movie.movieId, true)}>
                          {' '}
                          <MdClear size={30} color="#f31" />
                          Visto
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(movie.movieId)}
                        className={styles.delete}
                      >
                        <AiOutlineDelete size={25} color="#f31" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : movies.map(movie => (
                <div
                  style={{
                    width: cardMobile ? '80%' : '30%',
                    marginInline: cardMobile ? '10%' : '1.65%'
                  }}
                  key={movie.movieId}
                  className={styles.cardMovie}
                >
                  <Link to={`/movie/${movie.movieId}`}>
                    <Image
                      overflow="true"
                      src={movie.cover}
                      alt={movie.title}
                    />
                  </Link>
                  <div className={styles.info}>
                    <div className={styles.stars}>
                      <button onClick={() => handleAvarege(movie.movieId, 1)}>
                        <FaStar
                          color={movie.avarege >= 1 ? '#f7d354' : '#eee'}
                        />
                      </button>
                      <button onClick={() => handleAvarege(movie.movieId, 2)}>
                        <FaStar
                          color={movie.avarege >= 2 ? '#f7d354' : '#eee'}
                        />
                      </button>
                      <button onClick={() => handleAvarege(movie.movieId, 3)}>
                        <FaStar
                          color={movie.avarege >= 3 ? '#f7d354' : '#eee'}
                        />
                      </button>
                      <button onClick={() => handleAvarege(movie.movieId, 4)}>
                        <FaStar
                          color={movie.avarege >= 4 ? '#f7d354' : '#eee'}
                        />
                      </button>
                      <button onClick={() => handleAvarege(movie.movieId, 5)}>
                        <FaStar
                          color={movie.avarege >= 5 ? '#f7d354' : '#eee'}
                        />
                      </button>
                    </div>
                    <p>
                      <AiOutlineFolderAdd size={30} />
                      {handleTime(movie.AddAt).toLocaleDateString('pt-br', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className={styles.actions}>
                    {movie.view ? (
                      <button onClick={() => handleView(movie.movieId, false)}>
                        <AiOutlineCheck size={25} color="green" />
                        Visto
                      </button>
                    ) : (
                      <button onClick={() => handleView(movie.movieId, true)}>
                        {' '}
                        <TiDeleteOutline size={25} color="#f7d354" />
                        Visto
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(movie.movieId)}
                      className={styles.delete}
                    >
                      <AiOutlineDelete size={25} color="#f31" />
                      Remover
                    </button>
                  </div>
                </div>
              ))}
        </div>
        {movies.length > 0 && (
          <div className={styles.navigation}>
            <button onClick={slidePrev}>
              <IoIosArrowBack size={35} color="#f7d354" />
            </button>
            <button onClick={slideNext}>
              <IoIosArrowForward size={35} color="#f7d354" />
            </button>
          </div>
        )}
      </main>
    </>
  )
}

export default SliderUse
