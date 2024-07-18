import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect( () => {
    const handleLogin = async () =>{
      const tok = localStorage.getItem("token")
      const res = await fetch('http://localhost:8000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + tok,
          credentials: 'include',
        },
        body: JSON.stringify(),
      });
      const data = await res.json();
        console.log(data);
      if (data.success === true) {
        setLoggedIn(true);
      }
      else{
        setLoggedIn(false);
      }
    }
    handleLogin()
  }, []);

  const handleSignout = async () => {
    localStorage.clear();
    localStorage.removeItem("token");
    await fetch('http://localhost:8000/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setLoggedIn(false);
  }


  return (
    <>
      <div className="mx-auto flex items-center justify-between bg-cyan-500 text-white p-4">
        <h1 className="text-3xl font-bold">
          <Link to="/">CodeQuest</Link>
        </h1>
        <div className="flex items-center space-x-6">
          
        {loggedIn ? (
          <div>
            <button onClick={handleSignout} className='bg-cyan-700/70 py-2 px-4 rounded-md shadow-md hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'>Signout</button>
          </div>
          
        ) : (
          <div className='flex gap-2'>
            <Link
              to="/signin"
              className=" bg-cyan-700/70 py-2 px-4 rounded-md shadow-md hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className=" bg-cyan-700/50 py-2 px-4 rounded-md shadow-md hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              Signup
            </Link>
          </div>
        )}
        </div>
      </div>
    </>
  )
}
