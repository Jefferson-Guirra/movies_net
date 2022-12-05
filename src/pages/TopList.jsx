import React from 'react'
import { db } from '../services/firebaseConnection'
import {collection,getDocs,} from 'firebase/firestore'
import styles  from './Styles/TopList.module.css'
import SliderUser from '../components/SliderUse'
import {MdStarRate} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const TopList = () => {
  const [usersList,setUsersList] = React.useState([])
  const [loading,setLoading] = React.useState(false)
  const navigate = useNavigate()


  const compareVotes = (a, b)=> {
    if (a.userVote < b.userVote) {
      return 1
    }
    if (a.userVote > b.userVote) {
      return -1
    }
    return 0
  }
    const compareAvarege = (a, b) => {
      if (a.userAvarege < b.userAvarege) {
        return 1
      }
      if (a.userAvarege > b.userAvarege) {
        return -1
      }
      return 0
    }
  const getList = async ()=>{
    setLoading(true)
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
        const listFormatLength = listData?.filter(item=> item?.moviesList?.length > 0)
        const listFormatVotes = listFormatLength?.sort(compareVotes)
        const listFormatAvarege = listFormatVotes.sort(compareAvarege)
        listFormatLength?.length > 0 ? setUsersList(listFormatVotes) : ''
        setLoading(false)
      }

      const handleNavigate = (username,userId)=>{
        const url =
          `/user-favorite/${username}/${userId}`
          navigate(url)

      }
  React.useEffect(()=>{
    getList()
  },[])
  if(loading)return <Loading />
  if(!loading)
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
