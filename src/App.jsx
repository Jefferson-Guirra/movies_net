import './App.css'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'
import Search from './pages/Search'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Recommended from './pages/Recommended'
import Releases from './pages/Releases'
import SimilarMovies from './pages/SimilarMovies'

function App() {
  const [control, setControl] = useState('')

  return (
    <BrowserRouter>
      <NavBar setControl={setControl} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<Movie />} />
        <Route path="search" element={<Search control={control} />} />
        <Route path="recommended" element={<Recommended />} />
        <Route path="releases" element={<Releases />} />
        <Route path="similar-movies/:id" element={<SimilarMovies />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
