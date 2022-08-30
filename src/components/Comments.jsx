import React from 'react'
import styles from './Styles/Comments.module.css'
const imageUrl = import.meta.env.VITE_IMG
import userNotFound from '../assets/userNotFound.png'
import { HiOutlineEmojiSad } from 'react-icons/hi'
const Comments = ({ data }) => {
  const regex = /T\d{2}:\d{2}:\d{2}.\d+\D/g

  if (data.length)
    return (
      <div className={styles.commentsContainer}>
        {data.map(user => (
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
