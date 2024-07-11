import React from 'react'
import Navbar from '../components/Navbar'
import TableReact from '../components/Table'
import Searchbar from '../components/Searchbar'

export default function Home() {
  return (
    <div>
      <Navbar/>
      {/* <Searchbar/> */}
      <TableReact/>
    </div>
  )
}
