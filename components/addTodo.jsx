'use client'

import React, {useState,useEffect} from 'react'
import axios from 'axios'

const AddTodo = () => {
const [name,setName] = useState('')

const [message,setMessage] = useState('')
const [error,setError] = useState('')


const formData={
  name
}
const handleSubmit = async(e)=>{
  e.preventDefault();
  if(!name){
      setError('Required this field')
    }
    const res = await axios.post(`${process.env.API_URL}/api/todo/post`,formData)
    if(res?.data?.success){
        setMessage(res?.data?.message)
      }
    
}

useEffect(()=>{
  if(message){
    setTimeout(()=>{
      setMessage("")
    },2000)
  }

},[message])
  return (
          <form onSubmit={handleSubmit} className="flex justify-center items-center mt-10">
              <input type="text" name="name" placeholder="Enter your name" className='p-2 bg-transparent border-2 border-emerald-500 rounded-md text-white focus:outline-none'/>
          
              {error && <p className='text-red-500'>{error}</p>}
              {message && <div className="p-3 text-white w-full font-semibold text-center mx-auto text-[11px]">{message}</div>}
              <button type="submit" className="text-white font-bold bg-gradient-to-b from-emerald-500 to-emerald-700 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-105 duration-300">Add Todo</button>
          </form>

  )
}

export default AddTodo