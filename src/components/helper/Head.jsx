import React from 'react'

const Head = ({ title, description }) => {
  React.useEffect(() => {
    const titulo = 'Movies Net | ' + title 
    document.title = titulo
  }, [title])
  return null
}

export default Head
