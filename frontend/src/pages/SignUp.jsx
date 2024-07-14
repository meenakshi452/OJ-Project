import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeName= (e) => {
    setName(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  async function handleSubmit({name, email, password}, e){
    e.preventDefault();
    const formData = {name, email, password}
    const response = await axios.post("http://localhost:8000/signup", formData)
    console.log(response.data);
  }

  return (
    <div className='p-3 max-w-lg my-10 mx-auto border rounded-lg border-transparent  bg-[#f6fcffc2] shadow-lg'>
      <h1 className='text-3xl text-center font-semibold my-7 text-blue-500'>Register</h1>
      <form onSubmit={(e) => handleSubmit({name, email, password}, e)} className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder='Username' 
          id='username' 
          onChange={handleChangeName}
          className='bg-slate-100 p-3 rounded-lg hover:bg-slate-200'
        />
        <input
          type="email"
          placeholder='Email' 
          id='email' 
          onChange={handleChangeEmail}
          className='bg-slate-100 p-3 rounded-lg hover:bg-slate-200'
        />
        <input 
          type="password"
          placeholder='Password' 
          id='password' 
          onChange={handleChangePassword}
          className='bg-slate-100 p-3 rounded-lg hover:bg-slate-200'
        />
        <button type='submit' className='bg-blue-400 text-white font-semibold p-3 rounded-lg uppercase hover:opacity-95'>
          Register
        </button>
      </form>
      <div className='flex gap-2 my-4'>
        <p>Already Registered?</p>
          <Link to='/signin'>
            <span className='text-blue-700 hover:opacity-85 cursor-pointer'>Sign In</span>
          </Link>
      </div>
    </div>
  )
}
