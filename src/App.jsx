import './App.css'
import { useState } from 'react'
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
import MoviesGenre from './pages/MoviesGenre'
import PageNotFound from './pages/PageNotFound'

function App() {
  const { visibility } = useSelector(state => state.modal)
  const [searchMovie, setSearchMovie] = useState('')
  return (
    <BrowserRouter>
      <NavBar setSearchMovie={setSearchMovie} />
      {visibility && <ModalGenre />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<Movie />} />
        <Route path="top-movies" element={<TopMovies />} />
        <Route path="movie-genre/:genre/:id" element={<MoviesGenre />} />
        <Route path='*' element={<PageNotFound />}/>
        <Route path="search" element={<Search searchMovie={searchMovie} />} />
        <Route path="popular" element={<Popular />} />
        <Route path="releases" element={<Releases />} />
        <Route path="similar-movies/:id" element={<SimilarMovies />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
