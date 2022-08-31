import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi'
import styles from './Styles/NavBar.module.css'

const NavBar = ({ setControl }) => {
  const [search, setSearch] = useState('')
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const location = window.location.href

  function handleSubmit(event) {
    event.preventDefault()
    if (search) {
      setMenu(false)
    }
    if (!search) return
    else {
      setControl(search)
      navigate(`/search?q=${search}`)
      setSearch('')
    }
  }

  useEffect(() => {
    if (menu) {
      setMenu(false)
    }
  }, [location])

  function handleMenu(event) {
    setMenu(menu => !menu)
  }
  console.log(window.scrollY)
  return (
    <nav id="navbar" className={styles.navBar}>
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

        <Link to="/recommended">Recomendados</Link>
        <Link to="/releases">Lançamentos</Link>
      </form>

      <div
        id="menuMob"
        onClick={handleMenu}
        className={menu ? `${styles.menu} ${styles.active}` : styles.menu}
      >
        <span className={styles.hamburguer}></span>
      </div>
    </nav>
  )
}

export default NavBar
