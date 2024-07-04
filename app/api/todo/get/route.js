import dbConnect from "@/backend/config/dbConnect";
import Todo from "@/backend/models/todo";
import { NextResponse } from "next/server"


export const  GET = async(req,res)=>{
    await dbConnect();
   try{
  
       const todo = await Todo.find({})

    return NextResponse.json(
            {
                success:true,             
                todo,
            },
                {status:200}
            )

    }catch(error){
        return NextResponse.json(
            {
                success:false,
                message:'Something went wrong | Please try again'
            },
            {status:401}
            )
    }

}