import React, { createContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// import { TEAnimation } from "tw-elements-react";
import Animate from 'react-smooth'

export default function SignIn() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    // console.log(email);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  async function handleSubmit({email, password}, e){
    e.preventDefault();
    const formDataa = {email, password}
    const res = await fetch('http://localhost:8000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify(formDataa),
    });
    const data = await res.json();
    setError(data)
    if(data.success === true){
      const tok = localStorage.setItem("token", data.token);
      // console.log(res);
      navigate('/');
    }
  }
  const steps = [{
    style: {
      opacity: 0,
    },
    duration: 400,
  }, {
    style: {
      opacity: 1,
      transform: 'translate(0, 0)',
    },
    duration: 500,
  }];

  return (
    <Animate steps={steps}>
      <div className='h-screen py-32'>
    <div className='p-3 max-w-lg mx-auto border rounded-lg border-transparent  bg-[#f6fcffc2] shadow-lg'>
      
      <h1 className='text-3xl text-center font-semibold my-7 text-blue-500'>Sign In</h1>
      
        
      
      <form onSubmit={(e) => handleSubmit({email, password}, e)} className='flex flex-col gap-4 '>
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
        <button  type="submit" className='bg-blue-500 text-white font-semibold p-3 rounded-lg uppercase hover:opacity-95'>
          Sign In
        </button>
      </form>
      <div className='flex gap-2 my-4'>
        <Link to='/'>
          <p>New Here?</p>
        </Link>
        <Link to='/signup'>
          <span className='text-blue-700 hover:opacity-85 cursor-pointer'>Register</span>
        </Link>
      </div>
      <p className='text-red-500'>{error ? error.message: ""}</p>
    </div>
    </div>
    </Animate>
  )
}
