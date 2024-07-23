import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

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
  const [code, setCode] = useState('');
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

  const [output, setOutput] = useState('');

  const handleRun = async () => {
    const payload = {
      language: 'cpp',
      code
    };

    try {
      const res = await fetch('http://localhost:5000/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  }

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

  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber text-gray-400 '>${i + 1}</span>${line}`)
      .join("\n");
  

  
    
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
            {/* <textarea className="code w-11/12 min-h-96 bg-gray-400 overflow-y-auto my-4 mx-auto">
              
            </textarea> */}
            <div className="bg-gray-100 shadow-md w-full max-w-lg mb-4" style={{ height: '300px', overflowY: 'auto' }}>
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => hightlightWithLineNumbers(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                  outline: 'none',
                  border: 'none',
                  backgroundColor: '#f7fafc',
                  height: '100%',
                  overflowY: 'auto'
                }}
              />
            </div>
            {output &&
        <div className="outputbox mt-4 bg-gray-100 rounded-md shadow-md p-4">
          <p style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}>{output}</p>
        </div>
      }
            <div className="buttons flex flex-row w-11/12 mx-auto gap-2">
              <button className='border basis-1/3 py-2 text-white rounded-md bg-gray-500'>
                Console
              </button>
              <button
               className='border basis-1/3 py-2 text-white rounded-md bg-gray-700'
               onClick={handleRun}>
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
