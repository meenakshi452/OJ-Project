import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const response = await fetch('https://oj-project-production.up.railway.app/profile', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(),
    });
    const res = await response.json();

export default function Profile() {
    const [canEdit, setCanEdit] = useState(false);
    // const [tok, setTok] = useState(localStorage.getItem("token"));
    const [data, setData] = useState(res.user);
    
    const [isAuth, setIsAuth] = useState(false)
    // async function handleSubmit(e){
    //     e.preventDefault();
    //     const formDataa = {token: `${tok}`};
    //     const response = await fetch('http://localhost:8000/profile', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'authorization': `Bearer ${tok}`,
    //     },
    //     body: JSON.stringify(),
    //     });
    //     const res = await response.json();
    //     setData(res.user);
    // }
    // handleSubmit();

    // async function handleSubmit(e){
    //     e.preventDefault();
    //     const formDataa = {token: `${tok}`};
        
        // setData(res.user);
    // }
    // handleSubmit();

    const handleClick = (e) => {
        e.preventDefault();
        setCanEdit(!canEdit);
    }
    // const notify = () => toast('Here is your toast.');
    
    return (
        
    <div>
        {/* <button onClick={(e) => handleSubmit(e)}>CLickMe</button>
        <button onClick={notify}>Make me a toast</button>
        <Toaster /> */}
        {data &&
            <div className='flex md:flex-row flex-col justify-around m-5 gap-7 mt-10 '>
            <div className="personal-details flex flex-col basis-5/12 gap-5 p-4 border  rounded-md bg-cyan-100/20">
                
                <img 
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    className='max-h-32 mb-5 rounded-full mx-auto'
                />
                <div>
                    <h1 className='text-cyan-800 font-medium text-base'>
                        Userame
                    </h1>
                    <input 
                        disabled={!canEdit}
                        type="text" 
                        value={(data) ? data.name : "Username"}
                        className='border rounded-lg w-full p-2 mt-2 bg-slate-100 hover:opacity-85'
                    />
                </div>
                <div>
                    <h1 className='text-cyan-800 font-medium text-base'>Email</h1>
                    <input 
                        disabled={!canEdit}
                        type="email" 
                        value={data ? data.email : 'Email'}
                        className='border rounded-lg w-full p-2 mt-2 bg-slate-100 hover:opacity-85'
                    />
                </div>
                <div>
                    <h1 className='text-cyan-800 font-medium text-base'>Password</h1>
                    <input 
                        disabled={!canEdit}
                        type="password" 
                        placeholder='Password'
                        className='border rounded-lg w-full p-2 mt-2 bg-slate-100 hover:opacity-85'
                    />
                </div>
                <button 
                    onClick={(e) => handleClick(e)}
                    className='border rounded-md w-14 p-2 bg-cyan-500 text-white shadow-lg hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
                >
                    {canEdit? "Save" : "Edit"}
                </button>
            </div>
            <div className="activity-details basis-7/12 flex flex-col gap-5">
                <div className="contest-history p-2 border rounded-md bg-cyan-100/20">
                    <h1 className='bg-cyan-500  p-2 text-white shadow-sm'>
                        Contest History
                    </h1>
                    <div className=''>
                        <MiniTable/>
                    </div>
                </div>
                
                <div className="bookmark p-2 border rounded-md bg-cyan-100/20">
                    <h1 className='bg-cyan-500  p-2 text-white shadow-sm'>
                        Bookmark questions
                    </h1>
                    <div className=''>
                        <MiniTable/>
                    </div>
                </div>
            </div>
        </div>
        }
        {(!data ) && 
            <div className='text-center h-screen '>
                <h1 className='text-9xl text-red-500'>401</h1>
                <span className='text-6xl '>Not Autherised to view this page</span>
            </div>
        }
        
        </div>

    

    
  )
}
