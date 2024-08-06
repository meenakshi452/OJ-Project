import React, { useState } from 'react'
import { TrashIcon, PencilSquareIcon, MagnifyingGlassIcon, MagnifyingGlassMinusIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import toast, { Toaster } from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';



// const res = await axios.get(
//   `http://localhost:7000/problems/problemList`
// );
var problem
const fetchProblem = async() =>  {
  const res = await fetch('https://oj-project-production.up.railway.app/problemList', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
   problem = await (res.json());
}
fetchProblem();


const handleDelete = async (id, e) => {
  e.preventDefault();
  if (!localStorage.getItem("token")) {
    toast.error("login to delete")
    // <Toaster/>
  }
  else {
    const res = await fetch('https://oj-project-production.up.railway.app/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

}





export default function ProblemsList() {
  const [problems, setProblems] = useState(problem);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleClick = async (id, e) => {
    e.preventDefault();

    navigate('/problem/' + id)
  }

  const handleUpdate = async (id, e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      toast.error("login to update")
    }
    else {
      navigate('/updateProblem/' + id)
    }
  }

  const geteasy = async () => {
    const res = await fetch('https://oj-project-production.up.railway.app/geteasy', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const x = await res.json();
    setProblems(x);
  }
  const getmedium = async () => {
    const res = await fetch('https://oj-project-production.up.railway.app/getmedium', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const x = await res.json();
    setProblems(x);
  }
  const gethard = async () => {
    const res = await fetch('https://oj-project-production.up.railway.app/gethard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const x = await res.json();
    setProblems(x);
  }

  const handleSearch = async () => {
    if(!searchInput){
      toast.error("you cannot search empty name")
    }
    const res = await fetch(`https://oj-project-production.up.railway.app/search?q=${searchInput}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const x = await res.json();
    setProblems(x); 
  }

  // const userId = async() => {
  //   const res = await fetch('http://localhost:8000/profile', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'authorization': `${localStorage.getItem("token")}`,
  //     },
  //   });
  //   const x = await res.json();
  //   console.log(x);
  // }
  // userId();

   const userId = localStorage.getItem("token")? jwtDecode(localStorage.getItem("token")).id : "null";
  


  return (
    <div>
      {/* <div className='text-center text-6xl m-10 bg-cyan-500'>
        <Typewriter
          options={{
            strings: ['Unlock Your Potential', 'Elevate Your Coding Game'],
            autoStart: true,
            loop: true,
            delay: 200,
          }}
        />
      </div> */}
      <div className='flex md:flex-row flex-col justify-between mx-10 md:mx-20 mt-10 gap-3'>
        <div className='flex flex-row gap-2 '>
          <p>Sort By:</p>
          <button onClick={geteasy} className='rounded-md bg-cyan-400 px-2 text-white'>Easy</button>
          <button onClick={getmedium} className='rounded-md bg-cyan-600 px-2 text-white'>Med</button>
          <button onClick={gethard} className='rounded-md bg-cyan-800 px-2 text-white'>Hard</button>
        </div>
        <div className='flex flex-row'>
          <input 
            type="text" 
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)} 
            placeholder='Search your problem here...' 
            className='border px-1 w-60 rounded-l-md bg-cyan-600/10'
            required={true} 
          />
          <MagnifyingGlassIcon onClick={handleSearch} className='size-8 text-white p-1 rounded-r-md hover:opacity-85 bg-cyan-800'/>
        </div>
        

      </div>
      <div className=' p-8 mx-10 m-4 bg-cyan-600 rounded-xl max-w-6xl md:mx-20'>
        {problems && problems.map((problem) =>
          <div key={problem._id} className=''>
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
              <div className='basis-2/6 flex flex-row overflow-x-hidden'>
                {problem.tags.length > 0 && problem.tags.map((tag) =>
                  // Math.random();
                  <div className=' mt-3.5 px-1 '>
                    <span className='bg-white/70 px-1 pb-0.5 rounded-md text-black/50 shadow-md'>
                      {tag.tags}
                    </span>
                  </div>

                )}
              </div>
              {userId === problem.createdBy ?
                <div className='basis-1/6 flex flex-row'>
                  <TrashIcon className="p-1 text-cyan-900 mx-1 size-9 my-auto rounded-md hover:bg-cyan-800 hover:text-gray-100" onClick={(e) => handleDelete(problem._id, e)} />
                  <PencilSquareIcon className="p-1 text-cyan-900 mx-1 size-9 my-auto rounded-md hover:bg-cyan-800 hover:text-gray-100" onClick={(e) => handleUpdate(problem._id, e)} />
                </div>
                : ""}

            </div>
          </div>
        )}

      </div>
      <Toaster />
    </div>
  )
}
