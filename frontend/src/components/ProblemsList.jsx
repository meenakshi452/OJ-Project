import React, { useState } from 'react'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Typewriter from 'typewriter-effect';



// const res = await axios.get(
//   `http://localhost:7000/problems/problemList`
// );
const res = await fetch('http://localhost:8000/problemList', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});
const problems = await (res.json());

const handleDelete = async (id, e) => {
  e.preventDefault();
  const res = await fetch('http://localhost:8000/' + id, {
    method: 'DELETE',
  });
}




export default function ProblemsList() {
  const navigate = useNavigate();

  const handleClick = async (id, e) => {
    e.preventDefault();
    navigate('/problem/' + id)
  }


  return (
    <div>
      <div className='text-center text-6xl m-10 bg-cyan-500'>
        <Typewriter
          options={{
            strings: ['Unlock Your Potential', 'Elevate Your Coding Game'],
            autoStart: true,
            loop: true,
            delay: 200,
          }}
        />
      </div>
      <div className=' p-8 mx-auto m-4 bg-cyan-600 rounded-xl max-w-6xl'>
        {problems.map((problem) =>
          <div key={problem._id}>
            <div className='flex flex-row text-black  mx-auto mb-2 border-b bg-white/90 rounded-lg shadow-md'>
              <div className='basis-2/6 text-cyan-950 font-medium text-xl p-3 cursor-pointer' onClick={(e) => handleClick(problem._id, e)}>{problem.name}</div>
              {problem.difficulty === "easy" ?
                <div className='basis-1/6 mt-0.5 p-3  '>
                  <span className='bg-cyan-400 rounded-md px-1 pb-0.5 text-white shadow-md '>
                    {problem.difficulty}
                  </span>
                </div> : problem.difficulty === "medium" ?
                  <div className='basis-1/6 mt-0.5 p-3  '>
                    <span className='bg-cyan-600 rounded-md px-1 pb-0.5 text-white shadow-md'>
                      {problem.difficulty}
                    </span>
                  </div> :
                  <div className='basis-1/6 mt-0.5 p-3  '>
                    <span className='bg-cyan-800 rounded-md px-1 pb-0.5 text-white shadow-md'>
                      {problem.difficulty}
                    </span>
                  </div>}
              <div className='basis-3/6 flex flex-row overflow-x-hidden'>
                {problem.tags.length > 0 && problem.tags.map((tag) =>
                  // Math.random();
                  <div className=' mt-3.5 px-1 '>
                    <span className='bg-white/70 px-1 pb-0.5 rounded-md text-black/50 shadow-md'>
                      {tag}
                    </span>
                  </div>

                )}
              </div>
              <TrashIcon className="p-1 text-cyan-900 mx-1 size-9 my-auto rounded-md hover:bg-cyan-800 hover:text-gray-100" onClick={(e) => handleDelete(problem._id, e)} />
              <PencilSquareIcon className="p-1 text-cyan-900 mx-1 size-9 my-auto rounded-md hover:bg-cyan-800 hover:text-gray-100" onClick={(e) => handleDelete(problem._id, e)} />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
