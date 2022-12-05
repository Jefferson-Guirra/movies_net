import React from 'react'
import { db } from '../services/firebaseConnection'
import {collection,getDocs,} from 'firebase/firestore'
import styles  from './Styles/TopList.module.css'
import SliderUser from '../components/SliderUse'
import {MdStarRate} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const TopList = () => {
  const [usersList,setUsersList] = React.useState([])
  const navigate = useNavigate()
  const getList = async ()=>{
    const ref = collection(db, 'movies')
      let list =
        await getDocs(
          ref
        ).then(querySnapshot => {
          const newData = querySnapshot.docs.map(doc => ({
            ...doc.data(),
          }))
          return newData
        })
        const listData = list?.map(item=>Object.assign(item))
        listData?.length > 0 ? setUsersList(listData) : ''
      }

      const handleNavigate = (username,userId)=>{
        const url =
          `/user-favorite/${username}/${userId}`
          console.log(url)
          navigate(url)

      }
  React.useEffect(()=>{
    getList()
  },[])
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TOP-LISTAS</h1>
      {usersList?.length > 0 &&
        usersList.map((list, index) => (
          <div key={index}>
            <p
              onClick={() =>
                handleNavigate(
                  usersList[index].username,
                  usersList[index].userId
                )
              }
              className={styles.username}
            >
              {usersList[index].username}- 
              <span className={styles.avarege}>
                {usersList[index].userAvarege}
              </span>
              <MdStarRate size={45} color="#f7d354" />
            </p>
            <SliderUser controls={false} list={usersList[index].moviesList} />
          </div>
        ))}
    </div>
  )
}

export default TopList
