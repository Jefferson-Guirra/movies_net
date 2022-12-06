import React from 'react'
import styles from './Styles/LoginCreate.module.css'
import moviesPng from '../assets/movies-background.webp'
import Input from '../components/Input'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom' 
import { IoIosArrowBack } from 'react-icons/io'
import Image from './helper/Image'
import useForm from '../Hooks/useForm'
import Head from '../components/helper/Head'
import { v4 as uuid } from 'uuid'
import {collection,query,getDocs,where,setDoc,doc} from 'firebase/firestore'
import { AiFillEye } from 'react-icons/ai'
import ErrorLogin from '../components/helper/ErrorLogin'
import {db} from '../services/firebaseConnection'
const LoginCreate = () => {
  const [error,setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [hidePassword, setHidePassword] = React.useState(false)
  const navigate = useNavigate()
  const username = useForm()
  const email = useForm('email')
  const password = useForm('password')

  const validateUserCreate = async () =>{
    let usernameValidate
    let emailValidate
    try{
      setError(null)
      setLoading(true)
    const ref = collection(db, 'users')
    usernameValidate = await getDocs(
      query(ref, where('username', '==', username.value))
    ).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      return newData
    })

    emailValidate = await getDocs(
      query(ref, where('email', '==', email.value))
    ).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      return newData
    })
  }catch(err){
    console.log(err)
    setError('Error Desconhecido')
  }finally{
    setLoading(false)
  }
    if(emailValidate.length>0){
      setError('Email já Cadastrado')
      return false
    }
    else if(usernameValidate.length>0){
      setError('Nome de usuario já cadastrado')
      return false
    }
    return true

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validate = username.validate(username.value) && password.validate(password.value) && email.validate(email.value)

    if(validate && await validateUserCreate()){
      try{
        const keyUser= uuid()
        const user = await setDoc(doc(db,'users',keyUser),{
          userId:keyUser,
          username:username.value,
          email:email.value,
          password:password.value,
          dateCreate: new Date(),
          votes:0,
          avarege:0,
          totalNotes:0
        })
        navigate('/login')
      }catch(err){
        console.log(err)

      }
    }
  }
  return (
    <main className={styles.container}>
      <Head title="Cadastre-se" />
      <Image overflow="true" src={moviesPng} alt="lista de filmes" />
      <section className={styles.loginContent}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h1 className="title">Cadastre-se</h1>

          <Input label="Usuário" name="user" type="text" {...username} />

          <Input label="Email" name="email" type="email" {...email} />
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
              <AiFillEye color='#fff' />
            </span>
          </div>
          <ErrorLogin error={error} />
          {!loading ? (
            <button className={styles.button}>Cadastrar</button>
          ) : (
            <button className={styles.button} disabled>
              Cadastrando...
            </button>
          )}
          <Link to="/login">
            <IoIosArrowBack size={30} color="#f7d354" />
            voltar
          </Link>
        </form>
      </section>
    </main>
  )
}

export default LoginCreate
