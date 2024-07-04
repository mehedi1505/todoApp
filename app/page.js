'use client'

import React, { useState,useEffect } from "react";
// import addTode from "@/components/addTodo";
import Link from 'next/link'
import axios from 'axios'

const Home = ()=>{
const [name,setName] = useState('')
const [description,setDescription] = useState('')

const [inputError,setInputError] = useState('')
const [message,setMessage] = useState('')

const [todo,setTodo] = useState([])

const fetchData = async()=>{
  const {data} = await axios.get(`${process.env.API_URL}/api/todo/get`)
  if(data?.success){
    setTodo(data?.todo)
  }
  }
useEffect(()=>{
  fetchData();
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
          name,
          description
      }
      try{
        const { data } = await axios.post(`${process.env.API_URL}/api/todo/post`,obj)
        if(data?.success){
          setMessage(data?.message)
          setName('')
          setDescription('')
          fetchData();
        }
      }catch(error){
        console.log(error.message)
      }
    }


}

const deleteHandler = async(id)=>{
  alert("Are you sure to delete this?")
  const { data } = await axios.delete(`${process.env.API_URL}/api/todo/delete/${id}`)
  if(data?.success){
    setMessage(data?.message)
    fetchData();
  }
}

    return (
        <>

    <div className='container px-3 py-5 mx-auto'>
        <div className="flex flex-col p-2 gap-3">
          <h1 className="text-2xl font-bold mb-3">Add Todo Info</h1>
          <div>

          <label>Task Name</label>
          <input className='w-full px-3 py-1 border border-gray-500 focus:outline-none' type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your task name"/>
          </div>
          <div>

<label>Description</label>
<textarea className='w-full px-3 py-1 border border-gray-500 focus:outline-none' type="text" rows={5} name="description" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter your task description"/>
</div>
{inputError && <div className="bg-red-600 px-3 py-1 text-white w-[200px] font-bold text-center text-[11px]">{inputError}</div>}         
          <button onClick={submitHandler} type="submit" className="px-3 py-2 text-center font-bold border border-gray-500 flex w-[150px] hover:cursor-pointer hover:bg-gray-700 hover:text-white">Add Info</button>
        </div>


        <div>
        </div>
    </div>
    {message && <div className="bg-emerald-500 px-3 py-1 text-white w-[200px] font-semibold ml-20 text-center text-[11px]">{message}</div>}
    <div className='w-[90%] mx-auto py-5'>
            

<div className="relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3 text-center">Status</th>
                <th scope="col" className="px-6 py-3 text-center">Action</th>
            </tr>
        </thead>
        <tbody>
          {
            todo && todo.length > 0 ?
            todo.map((item)=><tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td className="px-6 py-4">{item?.name}</td>
            <td className="px-6 py-4">{item?.description}</td>
            <td className="px-2 text-center text-white text-[11px]">{
            item?.isCompleted === true ? <span className='px-3 py-1 w-[120px] h-[20px] items-center rounded-full bg-emerald-600 font-bold'>Completed</span> :<span className='px-3 py-1 w-[120px] h-[20px] items-center rounded-full bg-red-500 font-bold'>Pending</span>}
            </td>
            <td className="px-6 py-4 text-center">
                <Link href={`/${item._id}`} className="px-2 py-1 rounded-md font-medium text-blue-600 dark:text-blue-500 hover:underline"><span className='text-green-500'> <i className="fa fa-pencil" aria-hidden="true"></i></span></Link> | 
                <a href="#" onClick={()=>deleteHandler(item?._id)} className="px-2 py-1 rounded-md font-medium text-blue-600 dark:text-red-500 hover:underline"> <span className='text-red-500'> <i className="fas fa-trash" aria-hidden="true"></i></span></a>
            </td>
        </tr>)
             : null
          }
   
        </tbody>
    </table>
</div>

    </div>

  </>
    )
}
export default Home;
