import React from 'react'
import Navbar from '../components/Navbar'
// import TableReact from '../components/Table'
// import Searchbar from '../components/Searchbar'

export default function Home() {
  return (
    <div>
      {/* <Navbar/> */}
      <img src="https://img.freepik.com/free-vector/cute-man-working-laptop-with-coffee-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3869.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722729600&semt=ais_hybrid" className='w-full opacity-80 relative' />
      <div className='absolute m-2 text-4xl text-center text-white p-20 top-20'>
        Welcome, coders! Sharpen your skills by creating unique questions 
        and tackling challenges designed by a thriving community of fellow problem solvers.
      </div>
    </div>
  )
}
