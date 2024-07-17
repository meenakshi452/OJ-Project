import React, { useState } from 'react'

export default function Problem() {
  const [selectedValue, setSelectedValue] = useState('Option 1'); 
  const handleChange = (event) => {
  setSelectedValue(event.target.value);
  };
  return (
    <div className='flex md:flex-row flex-col m-4 gap-2 '>
        <div className="question basis-1/2 border p-3 rounded-md shadow-md">
          <div className="problem-name text-3xl p-2">
            Two Sum Problem
          </div>
          <div className='flex flex-row gap-2 border-b p-2 pb-0'>
            <span>Description</span>
            <span>Submissions</span>
          </div>
          <div className="problem-desc p-2 pt-4">
          Linear Kingdom has exactly one tram line. It has n stops, numbered from 1 to n in the order of tram's movement. At the i-th stop ai passengers exit the tram, while bi passengers enter it. The tram is empty before it arrives at the first stop. Also, when the tram arrives at the last stop, all passengers exit so that it becomes empty.

Your task is to calculate the tram's minimum capacity such that the number of people inside the tram at any time never exceeds this capacity. Note that at each stop all exiting passengers exit before any entering passenger enters the tram.

Input
The first line contains a single number n (2 ≤ n ≤ 1000) — the number of the tram's stops.
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
              cdsc
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
