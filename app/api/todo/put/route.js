import dbConnect from "@/backend/config/dbConnect";
import Todo from "@/backend/models/todo";
import { NextResponse } from "next/server"



export const  PUT = async(req, res)=>{
    await dbConnect();
   try{
        const {id, name, description,isCompleted} = await req.json();
       const todo = await Todo.findByIdAndUpdate(id,{
        name,
        description,
        isCompleted,
        })

    return NextResponse.json(
            {
                todo,
                success:true,
                message:'Updated successfully'
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
        // console.log(error.message);
    }

}