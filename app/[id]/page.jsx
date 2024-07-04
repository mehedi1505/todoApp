'use client'

import React, { useState,useEffect } from "react";
import {useRouter} from 'next/navigation';
import Link from 'next/link'
import axios from 'axios'

const TodoEdit = ({params})=>{
const router = useRouter()
const id = params?.id  

const [name,setName] = useState('')
const [description,setDescription] = useState('')
const [isCompleted, setIsCompleted] = useState('');

const [inputError,setInputError] = useState('')
const [message,setMessage] = useState('')

useEffect(()=>{
  const fetchData = async(id)=>{
  const {data} = await axios.get(`${process.env.API_URL}/api/todo/get/${id}`)
  if(data?.success){
    setName(data?.todo?.name)
    setDescription(data?.todo?.description)
    setIsCompleted(data?.todo?.isCompleted)
  }
  }
  fetchData(id);
},[])
useEffect(()=>{
  if(inputError){
    setTimeout(()=>{
      setInputError("")
    },2000)
  }
  if(message){
    setTimeout(()=>{
      setMessage("")
    },2000)
  }

},[inputError,message])

const submitHandler = async(e)=>{
    e.preventDefault();        
    if(!name || !description){
      setInputError("All fields are required")
    }else{
      setInputError("")
      const obj = {
        id,
        name,
        description,
        isCompleted
      }
      try{
        const { data } = await axios.put(`${process.env.API_URL}/api/todo/put`,obj)
        if(data?.success){
          setMessage(data?.message)
        }
      }catch(error){
        console.log(error.message)
      }
    }


}

    return (
        <>

    <div className='container px-3 py-5 mt-10 mx-auto'>
        <div className="flex flex-col p-2 gap-3">
          <h1 className="text-2xl font-bold mb-3">Edit Todo Info</h1>
          <div>

          <label>Name</label>
          <input className='w-full px-3 py-1 border border-gray-500 focus:outline-none' type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your task Name"/>
          </div>
          <div>

<label>Description</label>
<textarea className='w-full px-3 py-1 border border-gray-500 focus:outline-none' type="text" rows={5} name="description" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter your task description"/>
</div>
<div className='flex space-x-2 items-center'>
<p>If completed your task please check this box? </p><input
        className='w-[20px] h-[20px]'
        type="checkbox"
        checked= {isCompleted ? 'checked' : ''}
        defaultChecked={isCompleted}
        onChange={() => setIsCompleted(!isCompleted)}
      />
      {/* {isCompleted ? "Completed" : "incomplete task"} */}
</div>
{inputError && <div className="bg-red-600 px-3 py-1 text-white w-[200px] font-bold text-center text-[11px]">{inputError}</div>}
{message && <div className="bg-green-600 px-3 py-1 text-white w-[200px] font-bold text-center text-[11px]">{message}</div>}
<div className='flex flex-row space-x-4'>
<button onClick={submitHandler} type="submit" className="px-3 py-2 text-center font-bold border border-gray-500 flex w-[150px] hover:cursor-pointer hover:bg-gray-700 hover:text-white">Update Task</button>
<Link className="px-4 py-2 rounded-md coursor-pointer font-bold border border-emerald-600 hover:bg-emerald-600 hover:text-white" href={'/'}>Go to Task List</Link>
</div>

        </div>


        <div>
        </div>
    </div>

  </>
    )
}
export default TodoEdit;