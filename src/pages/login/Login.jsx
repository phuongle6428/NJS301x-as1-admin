import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogRegForm from '../../components/LogRegForm/LogReg'
import Navbar from '../../components/navbar/Navbar'

export default function Login() {
  const navigate = useNavigate()
  const handleLogin = async (e, form) => {
    e.preventDefault();
    let response = await fetch('http://localhost:5000/admin/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    let data = await response.json()
    if(response.ok) {
      let admin = JSON.stringify(data)
      localStorage.setItem("admin", admin)
      navigate('/')
    } else {
      alert(data)
    }
  }
  return (
    <>
      <Navbar />
      <LogRegForm type={1} handleForm={handleLogin} />
    </>
  )
}
