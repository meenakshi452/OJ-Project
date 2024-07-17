import React, { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'

const res = await fetch('http://localhost:8000/problemList', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});
var problems =  await (res.json());

const handleDelete = async (id,e) => {
  e.preventDefault();
  const res = await fetch('http://localhost:8000/' + id, {
    method: 'DELETE',
  });
}


export default function ProblemsList() {

  
  return (
    <div className='mt-4'>
      <div>
          <div className='flex flex-row text-center font-medium bg-black/70 mt-1 text-white max-w-6xl mx-auto rounded-t-lg'>
            <div className='basis-1/12 border-2 py-2 border-gray-300/50 border-r-0 rounded-tl-lg'>ID</div>
            <div className='basis-9/12 border-2 py-2 border-gray-300/50 border-r-0'>Problem Name</div>
            <div className='basis-2/12 border-2 py-2 border-gray-300/50 rounded-tr-lg'>Difficulty</div>
          </div>
      </div>

      {problems.map((problem) =>
        <div key={problem._id}>
          <div className='flex flex-row  text-black max-w-6xl mx-auto'>
            <div className='basis-1/12 border-2 py-3 border-gray-400/90 border-r-0 border-t-0'>1011</div>
            <div className='basis-9/12 border-2 py-3 border-gray-400/90 border-r-0 border-t-0'>{problem.name}</div>
            <div className='basis-2/12 border-2 py-3 border-gray-400/90 border-t-0'>{problem.difficulty}</div>
            <TrashIcon className="size-6 my-auto" onClick={(e) => handleDelete(problem._id,e)} />
          </div>
        </div>
      )}
      
    </div>
  )
}
