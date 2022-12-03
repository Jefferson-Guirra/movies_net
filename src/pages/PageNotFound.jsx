import React from 'react'
import { BiMoviePlay } from 'react-icons/bi'
import Head from '../components/helper/Head'


const PageNotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
      }}
    >
      <Head title={'Página não encontrada'} />
      <h1 style={{color:'red', display:'flex',alignItems:'center',gap:'.5rem'}}> <BiMoviePlay /> Página não encontrada.</h1>
    </div>
  )
}

export default PageNotFound
