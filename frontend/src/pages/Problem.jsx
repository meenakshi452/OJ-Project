import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';

// const location = useLocation();
  // const p = location.pathname;
  // const id =  p.split('/')[2];
  // console.log(id);

  // const res = await fetch('http://localhost:8000/' + id, {
  //   method: 'GET',
  // });
  // const data = await res.json();
  // console.log(data);
  
  


export default function Problem () {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch('http://localhost:8000/' + id, {
          method: 'GET',
        });
        const prob = await res.json();
      setData(prob)
      } catch (error) {
        // setError("Problem not found");
      }
    };

    fetchProblem();
  }, [id]);

  // useEffect(() => {
  //   const handle = async () => {
  //     // e.preventDefault();
  //     const location = useLocation();
  //     const p = location.pathname;
  //     const id =  p.split('/')[2];
  //     console.log(id);

  //     const res = await fetch('http://localhost:8000/' + id, {
  //       method: 'GET',
  //     });
  //     const prob = await res.json();
  //     setData(prob)
  //     console.log(data);
  //   };
  //   handle();
  // }, [])

  
  const [selectedValue, setSelectedValue] = useState('Option 1'); 
  const handleChange = (event) => {
  setSelectedValue(event.target.value);
  };

  
    
  return (

    <div className='flex md:flex-row flex-col m-4 gap-2 '>
        <div className="question basis-1/2 border p-3 rounded-md shadow-md">
          <div className="problem-name text-3xl p-2">
          {data && data.existingProblem.name}
          </div>
          <div className='flex flex-row gap-2 border-b p-2 pb-0'>
            <span className='hover:border hover:border-b-0'>Description</span>
            <span className='hover:border hover:border-b-0'>Submissions</span>
          </div>
          <div className="problem-desc p-2 pt-4">
          {data && data.existingProblem.description}
          </div>
          <div className="input-desc p-2">
            <h1 className='text-xl'>Input:</h1>
            <div>
            {data && data.existingProblem.inputDesc}
            </div>
          </div>
          <div className="output-desc p-2">
            <h1 className='text-xl'>Output:</h1>
            <div>
              {data && data.existingProblem.outputDesc}
            </div>
          </div>
        </div>
        <div className="solution basis-1/2 flex flex-col border p-3 rounded-md shadow-md">
            <div className='flex flex-row p-2 gap-4' >
                <h1>Language:</h1>
                <select value={selectedValue} onChange={handleChange} className='border-2 border-black/80 rounded-md'>
                  <option value="Option 1">C++</option>
                  <option value="Option 2">Java</option>
                  <option value="Option 3">C</option>
                </select>
            </div>
            <div className="code w-11/12 min-h-96 bg-gray-400 overflow-y-auto my-4 mx-auto">
              
            </div>
            <div className="buttons flex flex-row w-11/12 mx-auto gap-2">
              <button className='border basis-1/3 py-2 text-white rounded-md bg-gray-500'>
                Console
              </button>
              <button className='border basis-1/3 py-2 text-white rounded-md bg-gray-700'>
                Run
              </button>
              <button className='border basis-1/3 py-2 text-white rounded-md bg-green-700'>
                Submit
              </button>
            </div>
        </div>
    </div>
  )
}



// export default Problem;
