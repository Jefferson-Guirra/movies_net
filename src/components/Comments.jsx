import React, { useRef } from 'react'
import { COMMENTS_MOVIE } from '../Api'
import { useState } from 'react'
import styles from './Styles/Comments.module.css'
const imageUrl = import.meta.env.VITE_IMG
import userNotFound from '../assets/userNotFound.png'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import { useEffect } from 'react'
const apiKey = import.meta.env.VITE_API_KEY

const Comments = ({ id }) => {
  const regex = /T\d{2}:\d{2}:\d{2}.\d+\D/g
  const [comments, setComents] = useState('')
  let wait = useRef(false)


  const getComments = async (apiKey, id) => {
    const { url } = COMMENTS_MOVIE(apiKey, id)
    const response = await fetch(url)
    const comments = await response.json()
    setComents(comments)
  }
  useEffect(()=>{
    if(!wait.current){
      getComments(apiKey, id)
    }
    wait.current = true
  },[])
  if (comments?.results?.length)
    return (
      <div className={styles.commentsContainer}>
        {comments.results.map(user => (
          <div className={styles.contentComments} key={user.id}>
            <div className={styles.img}>
              <img
                src={
                  user.author_details.avatar_path
                    ? imageUrl + user.author_details.avatar_path
                    : userNotFound
                }
                alt={user.author}
                title={user.author}
              />

              <div className={styles.user}>
                <p>{user.author}</p>
                <p>{user.created_at.replace(regex, '')}</p>
              </div>
            </div>
            <p className={styles.comment}>{user.content}</p>
          </div>
        ))}
      </div>
    )
  else
    return (
      <p className={styles.notComments}>
        Sem comentários <HiOutlineEmojiSad />
      </p>
    )
}

export default Comments
