import dbConnect from "@/backend/config/dbConnect";
import Todo from "@/backend/models/todo";
import { NextResponse } from "next/server"

export const  GET = async(req, {params})=>{
    await dbConnect();
   try{
       const id = params.id
   
       const todo = await Todo.findById(id)

    return NextResponse.json(
            {
                todo,
                success:true
            },
                {status:201}
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