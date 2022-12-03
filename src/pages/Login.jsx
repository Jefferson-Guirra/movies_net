import { Route, Routes } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import LoginCreate from '../components/LoginCreate'

const Login = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="criar" element={<LoginCreate />} />
      </Routes>
  )
}

export default Login
