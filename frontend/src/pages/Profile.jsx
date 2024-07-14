import React from 'react'
import MiniTable from '../components/MiniTable'

export default function Profile() {
  return (
    <div className='flex md:flex-row flex-col justify-around m-5 gap-7 mt-10 '>
        <div className="personal-details flex flex-col basis-5/12 gap-5 p-4 border  rounded-md bg-cyan-100/20">
            <img 
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                className='max-h-32 mb-5 rounded-full mx-auto'
            />
            <div>
                <h1 className='text-cyan-800 font-medium text-base'>
                    Username
                </h1>
                <input 
                    type="text" 
                    placeholder='Username'
                    className='border rounded-lg w-full p-2 mt-2 bg-slate-100 hover:opacity-85'
                />
            </div>
            <div>
                <h1 className='text-cyan-800 font-medium text-base'>Email</h1>
                <input 
                    type="email" 
                    placeholder='Email'
                    className='border rounded-lg w-full p-2 mt-2 bg-slate-100 hover:opacity-85'
                />
            </div>
            <div>
                <h1 className='text-cyan-800 font-medium text-base'>Password</h1>
                <input 
                    type="password" 
                    placeholder='Password'
                    className='border rounded-lg w-full p-2 mt-2 bg-slate-100 hover:opacity-85'
                />
            </div>
            <button 
                className='border rounded-md w-14 p-2 bg-cyan-500 text-white shadow-lg hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
            >
                Edit
            </button>
        </div>
        <div className="activity-details basis-7/12 flex flex-col gap-5">
            <div className="contest-history p-2 border rounded-md">
                <h1 className='bg-cyan-500  p-2 text-white shadow-sm'>
                    Contest History
                </h1>
                <div className=''>
                    <MiniTable/>
                </div>
            </div>
            
            <div className="bookmark p-2 border rounded-md">
                <h1 className='bg-cyan-500  p-2 text-white shadow-sm'>
                    Bookmark questions
                </h1>
                <div className=''>
                    <MiniTable/>
                </div>
            </div>
        </div>
    </div>
  )
}
