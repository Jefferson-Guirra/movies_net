import React from 'react'
import styles from './Styles/Login.module.css'
import moviesPng from '../assets/movies-background.webp'
import ErrorLogin from '../components/helper/ErrorLogin'
import { Link } from 'react-router-dom'
import useForm from '../Hooks/useForm'
import Image from './helper/Image'
import Input from '../components/Input'
import { useNavigate } from 'react-router-dom'
import Head from '../components/helper/Head'
import { db } from '../services/firebaseConnection'
import {AiFillEye} from 'react-icons/ai'
import {getDocs,collection,where,query,setDoc,doc} from 'firebase/firestore'
import { v4 as uuid } from 'uuid'

const LoginForm = () => {
  const [errorLogin,setErrorLogin] = React.useState(null)
  const [ loading, setLoading] = React.useState(false)
  const [hidePassword,setHidePassword] = React.useState(false)
  const navigate = useNavigate()
  const email = useForm('email')
  const password = useForm('password')
  
const loginUser = async(userId,username)=>{
  const keyUser = uuid()
  localStorage.setItem('token',keyUser)
  const userLogin = await setDoc(doc(db, 'usersLogin', keyUser), {
    userId: userId,
    username
  })
}
  const validateUser = (userPassword,userId,username) =>{
    if(userPassword === password.value){
      const user = {
        username : username,
        userId
      }
      setLoading(null)
      navigate('/')
      loginUser(userId,username)
    }
    else{
      setErrorLogin('Senha incorreta, tente novamente.')
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const validate = email.validate(email.value) && password.validate(password.value)
    if(validate){
      try{
        setLoading(true)
        setErrorLogin(null)
      const ref = collection(db, 'users')
      let user =
        await getDocs(
          query(
            ref,
            where('email', '==', email.value)
          )
        ).then(querySnapshot => {
          const newData = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }))
          return newData
        })
        user.length === 0
          ? setErrorLogin(
              'O email que você inseriu não está conectado a uma conta.'
            )
          : validateUser(user[0].password, user[0].userId, user[0].username)
      }catch(err){
        console.log(err)
        setErrorLogin('Error Desconhecido')
      }finally{
        setLoading(false)
      }
      
    }
  }
  return (
    <main className={styles.container}>
      <Head title="Login" description="página de login" />
      <Image overflow="true" src={moviesPng} alt="lista de filmes" />
      <section className={styles.loginContent}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h1 className="title">Login</h1>
          <Input name="email" type="email" label="Email" {...email} />
          <div className={styles.password}>
            <Input
              name={password}
              label="Senha"
              type={hidePassword ? 'text' : 'password'}
              {...password}
            />
            <span
              onClick={() => setHidePassword(state => !state)}
              className={styles.hide}
            >
              <AiFillEye color="#fff" />
            </span>
          </div>
          {<ErrorLogin error={errorLogin} />}
          {!loading ? (
            <button className={styles.button} type="submit">
              Login
            </button>
          ) : (
            <button disabled className={styles.button} type="submit">
              entrando...
            </button>
          )}
          <p>
            Ainda não possui conta ? <Link to="/login/criar">Cadastre-se</Link>
          </p>
        </form>
      </section>
    </main>
  )
}

export default LoginForm