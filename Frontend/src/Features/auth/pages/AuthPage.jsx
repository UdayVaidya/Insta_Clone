import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Login from './Login'
import Register from './Register'

const AuthPage = ({ defaultView = 'login' }) => {
  const [isRegister, setIsRegister] = useState(defaultView === 'register')
  const navigate = useNavigate()

  const goToRegister = () => {
    setIsRegister(true)
    navigate('/register', { replace: true })
  }

  const goToLogin = () => {
    setIsRegister(false)
    navigate('/login', { replace: true })
  }

  return (
    <Layout
      isRegister={isRegister}
      login={<Login onSwitch={goToRegister} />}
      register={<Register onSwitch={goToLogin} />}
    />
  )
}

export default AuthPage