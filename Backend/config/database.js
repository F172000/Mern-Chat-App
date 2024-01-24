const mongoose=require('mongoose');
const connectDB=async()=>{
try{
    const dbURI=process.env.MONGO_URI;
    console.log(dbURI);
  const conn=await mongoose.connect(dbURI);
  console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline);
}catch(error){
console.log(`Error: ${error.message}`.red.bold);
process.exit();
}
}
module.exports=connectDB;