'use client'

import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";

const Contact = () => {
// const [name,setName] = useState('')
// const [email,setEmail] = useState('')
// const [message,setMessage] = useState('')
const { register, handleSubmit, formState:{errors}} = useForm();

const [message,setMessage] = useState('')
useEffect(()=>{
    if(message){
      setTimeout(()=>{
        setMessage("")
      },2000)
    }
  
  },[message])
const onSubmit = async(data)=>{
    const res = await axios.post(`${process.env.API_URL}/api/dashboard/contact/post`,data)
    if(res?.data?.success){
        setMessage(res?.data?.message)
      }
    
}
  return (
    <div id="contact" className="bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen">
        <div className="max-w-screen-md p-4 mx-auto flex flex-col justify-center w-full h-full text-white">
            <div className="pb-4 text-center">
                <p className="text-4xl font-bold inline border-b-4 border-gray-500">Contact <span className='text-[#00A25C]'>Me</span></p>
                <p className="py-6">Submit the form to get in touch with me</p>
            </div>
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
                    <input {...register('name',{required:'Name field is required',minLength:{value:3,message:'Name will be minimum 3 characters'},maxLength:{value:10,message:'Name will be maximum 10 characters'}})} type="text" name="name" placeholder="Enter your name" className='p-2 bg-transparent border-2 border-emerald-500 rounded-md text-white focus:outline-none'/>
                    {errors?.name && <p className='text-red-500 py-1'>{errors.name?.message}</p>}
                    <input  {...register('email',{required:'Email is required',pattern:{value:/^[A-Za-z0-9\.@]+$/i,message: 'Invalid email address'}})} type="text" name="email" placeholder="Enter your email" className='my-4 p-2 bg-transparent border-2  border-emerald-500 rounded-md text-white focus:outline-none'/>
                     {errors?.email && <p className='text-red-500'>{errors.email?.message}</p>}
                    <textarea  {...register('message',{required:'Message is required'})} name="message" rows="5" className='p-2 bg-transparent border-2  border-emerald-500 rounded-md text-white focus:outline-none' placeholder="Enter your message"></textarea>
                    {errors?.message && <p className='text-red-500'>{errors.message?.message}</p>}
                    {message && <div className="p-3 text-white w-full font-semibold text-center mx-auto text-[11px]">{message}</div>}
                    <button type="submit" className="text-white font-bold bg-gradient-to-b from-emerald-500 to-emerald-700 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-105 duration-300">Send Message</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Contact