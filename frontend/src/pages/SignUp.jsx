import React from 'react'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl text-center font-semibold my-7 text-blue-500'>Register</h1>
      <form className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder='Username' 
          id='username' 
          className='bg-slate-100 p-3 rounded-lg hover:bg-slate-200'
        />
        <input
          type="email"
          placeholder='Email' 
          id='email' 
          className='bg-slate-100 p-3 rounded-lg hover:bg-slate-200'
        />
        <input 
          type="password"
          placeholder='Password' 
          id='password' 
          className='bg-slate-100 p-3 rounded-lg hover:bg-slate-200'
        />
        <button className='bg-blue-400 text-white font-semibold p-3 rounded-lg uppercase hover:opacity-95'>
          Register
        </button>
      </form>
      <div className='flex gap-2 my-4'>
        <p>Already Registered?</p>
        {/* <Link to='/sign-in'> */}
          <span className='text-blue-700 hover:opacity-85 cursor-pointer'>Sign In</span>
        {/* </Link> */}
      </div>
    </div>
  )
}
