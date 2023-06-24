import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogRegForm from '../../components/LogRegForm/LogReg'
import Navbar from '../../components/navbar/Navbar'
import { API_URL } from '../../ultis/env'

export default function Register() {
  const navigate = useNavigate()
  const handleRegister = async (e, form) => {
    e.preventDefault();
    let response = await fetch(`${API_URL}/admin/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    let data = await response.json()
    if(response.ok) {
      navigate('/login')
    } else {
      alert(data)
    }
  }
  return (
    <>
      <Navbar />
      <LogRegForm type={0} handleForm={handleRegister} />
    </>
  )
}
