import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'
import Search from './pages/Search'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Popular from './pages/Popular'
import Releases from './pages/Releases'
import SimilarMovies from './pages/SimilarMovies'
import TopMovies from './pages/TopMovies'
import ModalGenre from './components/ModalGenre'
import { useSelector } from 'react-redux'
import TopList from './pages/TopList'
import MoviesGenre from './pages/MoviesGenre'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import FavoriteList from './pages/FavoriteList'
import FavoriteUserMovies from './pages/FavoriteUserMovies'
import ProtectedRoute from './components/helper/ProtectedRoute'

function App() {
  const { visibility } = useSelector(state => state.modal)
  return (
    <div className="App">
      <div className="page-container">
        <div className="content-wrapper">
          <BrowserRouter>
            <NavBar />
            {visibility && <ModalGenre />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="login/*"
                element={
                  <ProtectedRoute>
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route path="movie/:id" element={<Movie />} />
              <Route path="top-movies" element={<TopMovies />} />
              <Route path="favorite-movies" element={<FavoriteList />} />
              <Route
                path="user-favorite/:username/:userId"
                element={<FavoriteUserMovies />}
              />
              <Route path="top-list"  element={<TopList />}/>
              <Route path="movie-genre/:genre/:id" element={<MoviesGenre />} />
              <Route path="*" element={<PageNotFound />} />
              <Route
                path="search"
                element={<Search />}
              />
              <Route path="popular" element={<Popular />} />
              <Route path="releases" element={<Releases />} />
              <Route
                path="similar-movies/:movie/:id"
                element={<SimilarMovies />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
