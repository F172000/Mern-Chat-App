const express=require('express');
const app=express();
const cors=require('cors');
const chat=require('./data/data');
const dotenv=require('dotenv');
const connectDB = require('./config/database');
const color=require('colors');
dotenv.config();
const userRoutes=require('./routes/userRoutes');
const chatRoutes=require('./routes/chatRoutes');
const {notFound,errorHandler}=require('./middleware/errorMiddleware');
app.use(cors());
connectDB();
app.use(express.json());
app.get('/',(req,res)=>{
res.send("API is running successfully");
});
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
//Error handling middlewares
app.use(notFound);
app.use(errorHandler);
const PORT=process.env.PORT||5000
app.listen(PORT,console.log(`server started on PORT ${PORT}`.yellow.bold));

