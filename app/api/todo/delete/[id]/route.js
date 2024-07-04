import dbConnect from "@/backend/config/dbConnect";
import Todo from "@/backend/models/todo";
import { NextResponse } from "next/server"



export const DELETE = async(req, {params})=>{
    try {
        dbConnect();
        const id = params.id
        let todo = await Todo.findById(id);
        if (!todo) {
          throw new Error("Not found.", 404);
        }
        // for (let i = 0; i < product.images.length; i++) {
        //     const res = await cloudinary.v2.uploader.destroy(
        //       product.images[i].public_id
        //     );
        //   }
        
          await todo.deleteOne();
  
       return NextResponse.json(
        {
            todo,
            success:true,
            message:"Deleted successfully"
        },
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {
                error:"Failed to delete!"
            },
                {status:401}
            )
    }
}