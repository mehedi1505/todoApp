import mongoose from 'mongoose'

const dbConnect = async()=>{
      if(mongoose.connection.readyState === 1){
           return mongoose.connection.asPromise();
      }
      try {
        await mongoose.connect(process.env.MONGODB_URI)
        .then(()=>{
            console.log("database connected")
        }).catch(err=>console.log('database not connected'))
      } catch (error) {
          console.log('ups! An error while connecting database');
		      mongoose.disconnect();
		      process.exit(1);
      }
}




// const dbConnect = async()=>{
// try{
// mongoose.connect(process.env.MONGODB_URL);
// const connection = mongoose.connection;
// connection.on("connected",()=>{
// 	console.log("database connected");
// })
// mongoose.on("error",()=>{
// 	console.log("An error occured while connection database")
// 	process.exit();
// })
// }catch(error){
//  console.log(error);
// }

// }

export default dbConnect;