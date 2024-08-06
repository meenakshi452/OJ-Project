
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { MinusCircleIcon, PlusIcon } from '@heroicons/react/24/outline';

let nextId = 0;
let testId = 0;

export default function ProblemCreate() {
  
  const [selectedValue, setSelectedValue] = useState('easy'); 
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setDifficulty(event.target.value)
  };
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [outputDesc, setOutputDesc] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [testCases, setTestCases] = useState([])
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  
  const [tok, setTok] = useState(localStorage.getItem("token"))
  const [name, setName] = useState('');
  const [tags, setTags] = useState([]);
  const [err, setErr] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
        const fetchProblem = async () => {
          try {
            // const res = await axios.get(`http://localhost:8000/${id}`);
            const response = await fetch('https://oj-project-production.up.railway.app/' + id, {
              method: 'GET',
            });
            const res = await response.json();
            const prob = res.existingProblem;
            setTitle(prob.name);
            setDesc(prob.description);
            setInputDesc(prob.inputDesc);
            setOutputDesc(prob.outputDesc);
            setSelectedValue(prob.difficulty);
            const t = prob.tags
            // t.map(tag => (setTags(tag))
              
            // )
            setTags(prob.tags)
            setTestCases(prob.testCases);
          } catch (error) {
            // setError("Problem not found");
          }
        };
    
        fetchProblem();
      }, [id]);

  const handleSubmit = async ({title, desc, difficulty, inputDesc, outputDesc, tags, testCases, tok}, e) => {
    e.preventDefault();
    const res = await fetch('https://oj-project-production.up.railway.app/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({name:title, description:desc, difficulty, inputDesc, outputDesc, tags, testCases, tok}),
    });
    const data = await res.json();
    if(data.success == false){
      setErr(true);
      setMessage( data.message);
    }
    else{
      setErr(false);
      setMessage(data.message);
    }

  }

  const handleClick = (e) => {
    e.preventDefault();
  }


  return (
    <form onSubmit={(e) => handleSubmit({title, desc, difficulty, inputDesc, outputDesc, tags, testCases, tok}, e)} className=''>
        <div className='flex md:flex-row flex-col m-4 gap-2 '>
        <div className=" basis-1/2 border p-3 rounded-md shadow-md bg-cyan-600 flex flex-col justify-between ">
          <div className='flex flex-row m-2'>
            <div className="problem-name text-3xl text-white/90">
              Title:
            </div>
            <input 
              type="text"
              placeholder="what's the problem name?"
              className='border w-full ml-3 pl-2 bg-white/90 rounded-lg'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='m-2'>
            <div className="problem-desc pt-4 text-3xl text-white/90">
              Description:
            </div>
            <textarea 
              placeholder="Tell me about the problem..." 
              rows="7" 
              className='border w-full mt-2 pl-2 pt-1 resize-none hover:resize-y bg-white/90 rounded-lg'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="input-desc p-2">
            <div className=" text-3xl text-white/90">
              Input Description:
            </div>
            <div>
            <textarea 
              placeholder="How will the input be..." 
              rows="3" 
              className='border w-full mt-2 pl-2 pt-1 resize-none hover:resize-y bg-white/90 rounded-lg'
              value={inputDesc}
              onChange={(e) => setInputDesc(e.target.value)}
            ></textarea>
            </div>
          </div>
          <div className="output-desc p-2">
            <div className=" text-3xl text-white/90">
              Output Description:
            </div>
            <div>
            <textarea 
              placeholder="How will the output be..."
              rows="3" 
              className='border w-full mt-2 pl-2 pt-1 resize-none hover:resize-y bg-white/90 rounded-lg'
              value={outputDesc}
              onChange={(e) => setOutputDesc(e.target.value)}
            ></textarea>
            </div>
          </div>
        </div>
        <div className=" basis-1/2 flex flex-col border p-3 rounded-md shadow-md bg-cyan-600 ">
            <div className='flex flex-row p-2 gap-4 basis-1/12' >
                <h1 className='text-3xl text-white/80'>Difficulty:</h1>
                <select value={selectedValue} onChange={handleChange} className='border-2 border-black/80 rounded-md'>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
            </div>
            <div className='flex flex-row p-2 gap-4 basis-1/12' >
                <h1 className='text-3xl text-white/80'>Tags:</h1>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='Short Label which fits for your problem'
                  className='border w-full bg-white/90 rounded-lg pl-1'
                />
                {/* <button className=' px-2 text-white rounded bg-cyan-700 hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100' 
                onClick={() => {
                  setTags([
                    ...tags,
                    { id: nextId++, name: name }
                  ]);
                  setName("");
                }}>Add</button> */}
                <PlusIcon className='size-10 bg-white/80 text-cyan-800 rounded-md hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
                 onClick={() => {
                  setTags([
                    ...tags,
                    { id: nextId++, tags: name }
                  ]);
                  setName("");
                }}
                />
            </div>
            <div className='h-16'>
              <div className='flex flex-wrap overflow-y-auto '>
                {tags.map(tag => (
                  <div key={tag.id} className='group py-1 bg-white/80 text-cyan-900 relative px-3 m-1 text-lg rounded-md cursor-pointer hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100' onClick={() => {
                    setTags(
                      tags.filter(a =>
                        a.id !== tag.id
                      )
                    );
                  }}>
                    {tag.tags}
                    {/* <div className='absolute right-0 bottom-2'><span className='border rounded-full'>-</span></div> */}
                    <MinusCircleIcon className='absolute right-0 top-0 size-4 invisible group-hover:visible  text-cyan-900'/>
                  </div>
                ))}
              </div>
            </div>
            <div className='relative'> 
              <div className='flex flex-row justify-between'>
                <h1 className='text-3xl text-white/80 p-2'>TestCases:</h1>
                <PlusIcon className='size-10 bg-white/80 text-cyan-800 rounded-md hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
                 onClick={() => {
                  setTestCases([
                    ...testCases,
                    { id: testId++, input: input, output: output }
                  ]);
                  // setTestCases("");
                }}
                />
              </div>
              <div className='flex flex-row gap-4 p-2'>
                <div className='basis-1/2 flex flex-row gap-2'>
                  <h1 className='text-2xl text-white/80'>Input:</h1>
                  <textarea 
                    type="text" 
                    className='border w-full bg-white/90 rounded-lg pl-1'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  ></textarea>
                  {/* <input 
                    type="text" 
                    className='border w-full bg-white/90 rounded-lg pl-1'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  /> */}
                </div>
                <div className='basis-1/2 flex flex-row gap-2'>
                  <h1 className='text-2xl text-white/80'>Output:</h1>
                  <textarea 
                    type="text" 
                    className='border w-full bg-white/90 rounded-lg pl-1'
                    value={output}
                    onChange={e => setOutput(e.target.value)}
                  ></textarea>
                  {/* <input 
                    type="text" 
                    className='border w-full bg-white/90 rounded-lg pl-1'
                    value={output}
                    onChange={e => setOutput(e.target.value)}
                  /> */}
                </div>
                
              </div>
              <div className='h-56'>
                <div className='flex flex-wrap overflow-y-auto'>
                    {testCases.map(testCase => (
                      <div key={testCase.id} className='flex flex-col group py-1 bg-white/80 text-cyan-900 relative px-3 m-1 text-lg rounded-md cursor-pointer hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100' onClick={() => {
                        setTestCases(
                          testCases.filter(a =>
                            a.id !== testCase.id
                          )
                        );
                      }}>
                        <span>input: {testCase.input }</span>
                        <span>output: {testCase.output}</span>
                        <MinusCircleIcon className='absolute right-0 top-0 size-4 invisible group-hover:visible  text-cyan-900'/>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
            <span className='text-green/80 text-center'>
              {
                err == null ? " " : message
              }
            </span>
            <button type='submit' className=' border text-center p-2 m-2 text-3xl bg-white/80 rounded-md text-cyan-800'>Update Problem</button>
            
        </div>
        
    </div>
    </form>
  )
}