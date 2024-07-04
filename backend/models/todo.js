import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	isCompleted:{
		type:Boolean,
		default:false
	},
 	createdAt:{
        	type:Date,
        	default:Date.now
    	}
})

 const Todo = mongoose.models.Todo || mongoose.model("Todo",todoSchema);

 export default Todo;