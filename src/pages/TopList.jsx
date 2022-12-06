import React from 'react'
import { db } from '../services/firebaseConnection'
import {collection,getDocs,} from 'firebase/firestore'
import styles  from './Styles/TopList.module.css'
import SliderUser from '../components/SliderUse'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {MdOutlineLocalMovies} from 'react-icons/md'
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
      if (Number(a.userAvarege) < Number(b.userAvarege)) {
        return 1
      }
      if (Number(a.userAvarege) > Number(b.userAvarege)) {
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
        const finalList = listFormatAvarege.filter((item,index)=> index<10)
        listFormatLength?.length > 0 ? setUsersList(finalList) : ''
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
    <main className={styles.container}>
      <h1 className={styles.title}>TOP-LISTAS</h1>
      {usersList?.length > 0 &&
        usersList.map((list, index) => (
          <section key={index} className={styles.content}>
            <p
              onClick={() =>
                handleNavigate(
                  usersList[index].username,
                  usersList[index].userId
                )
              }
              className={styles.username}
            >
              <MdOutlineLocalMovies color="#f7d354" />
              {usersList[index].username}
            </p>
            <div className={styles.info}>
              <span className={styles.avarege}>
                {usersList[index].userAvarege}
                <FaStar color="#f7d354" />
              </span>

              <p className={styles.vote}>Votos {usersList[index].userVote}</p>
            </div>
            <SliderUser controls={false} list={usersList[index].moviesList} />
          </section>
        ))}
    </main>
  )
}

export default TopList
