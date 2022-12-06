import { useState, useEffect} from 'react'
import { MdStarRate } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi'
import { AiOutlineTrophy } from 'react-icons/ai'
import {MdOutlineFiberNew} from 'react-icons/md'
import {HiOutlineClipboardList} from 'react-icons/hi'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import {GiProgression} from 'react-icons/gi'
import {ImManWoman} from 'react-icons/im'
import styles from './Styles/NavBar.module.css'
import { changeStateModal } from '../store/modal'
import {findMovie} from '../store/search'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../services/firebaseConnection'

const NavBar = () => {
  const dispatch = useDispatch()
  let isLogged = localStorage.getItem('token') === null ? false : true
  const [logged,setLogged] = useState(isLogged)
  const [search, setSearch] = useState('')
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  
  useEffect(()=>{
    isLogged = localStorage.getItem('token') === null ? false : true
    setLogged(isLogged)
  },[isLogged])
  
  const handleLogin = async()=>{
    const token = window.localStorage.getItem('token')
    await deleteDoc(doc(db, 'usersLogin', token))
    localStorage.removeItem('token')

    setLogged(false)
    setMenu(false)
    navigate('/')
  }
  function handleSubmit(event) {
    event.preventDefault()
    if (search) {
      setMenu(false)
    }
    if (!search) return
    else {
      dispatch(findMovie(search))
      navigate(`/search?q=${search}`)
      setSearch('')
    }
  }


  function handleMenu() {
    setMenu(menu => !menu)
  }

  return (
    <nav id="navbar" className={styles.navBar}>
      <div className={styles.content}>
        <h2>
          <Link to="/" className={styles.title}>
            <BiCameraMovie /> MoviesNet
          </Link>
        </h2>
        <form
          className={menu ? `${styles.form} ${styles.visibility}` : styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.search}>
            <input
              type="text"
              placeholder="buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit">
              <BiSearchAlt2 />
            </button>
          </div>
          <div className={styles.links}>
            <Link onClick={() => setMenu(false)} to="/popular">
              <GiProgression size={25} />
              Populares
            </Link>
            <Link onClick={() => setMenu(false)} to="/releases">
              <MdOutlineFiberNew size={40} />
              Lançamentos
            </Link>
            <Link
              onClick={() => setMenu(false)}
              className={styles.link}
              to="/top-movies"
            >
              <AiOutlineTrophy onClick={() => setMenu(false)} size={25} />
              Top Filmes
            </Link>
            <a
              href="#"
              onClick={() => {
                setMenu(false)
                dispatch(changeStateModal())
              }}
            >
              <ImManWoman size={25} />
              Gêneros
            </a>
            <Link onClick={() => setMenu(false)} to={'/top-list'}>
              <MdStarRate size={25} />
              Top Listas
            </Link>
            <Link onClick={() => setMenu(false)} to={'/favorite-movies'}>
              <HiOutlineClipboardList size={25} />
              Minha Lista
            </Link>
            {logged ? (
              <a onClick={handleLogin} to="/login">
                <FiLogOut size={25} />
                Logout
              </a>
            ) : (
              <Link onClick={()=>setMenu(false)} to="/login">
                <FiLogIn size={25} />
                Login
              </Link>
            )}
          </div>
        </form>
        <div
          id="menuMob"
          onClick={handleMenu}
          className={menu ? `${styles.menu} ${styles.active}` : styles.menu}
        >
          <span className={styles.hamburguer}></span>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
