import React, { useState } from 'react'
import "./logreg.css";

export default function LogRegForm({type, handleForm}) {
  const [form, setForm] = useState({})
  const handleChange = (e) => {
    let target = {...form, [e.currentTarget.name]: e.currentTarget.value }
    setForm(target)
  }
  return (
    <>
      <form action="" className='logregForm' onSubmit={(e) => handleForm(e, form)}>
        <h1>{type ? "Login" : "Sign Up"}</h1>
        <input type="text" onChange={handleChange} name="username" id="username" value={form?.username ? form.username : ""}/>
        <input type="password" onChange={handleChange} name="password" id="password" value={form?.password ? form.password : ""}/>
        <button>{type ? "Login" : "Create Acccout"}</button>
      </form>
    </>
  )
}
