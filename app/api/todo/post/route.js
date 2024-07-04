import dbConnect from "@/backend/config/dbConnect";
import Todo from "@/backend/models/todo";
import { NextResponse } from "next/server"


export const POST = async(req, res)=>{
    await dbConnect();
   try{
       
    const { name, description} = await req.json();

    const todo = await Todo.create({
       name,
       description
     })
    return NextResponse.json(
            {
                todo,
                success:true,
                message:'Created successfully'
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