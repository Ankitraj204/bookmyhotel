import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
//import bodyParser from "body-parser"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

const connect = async ()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!")
  } catch (error) {
    throw error;
  }
};


//Middleware

app.use(cookieParser());
app.use(express.json());//any type of data can be sent

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

//ERROR HANDLING MIDDLEWARE
app.use((err,req,res,next)=>{
  const errStatus = err.status || 500
  const errMessage = err.message || "Something went wrong"
  return res.status(errStatus).json({//we can send whatever we want about error
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack
  });
});

app.listen(8800,()=>{
    connect()
    console.log("Connected to backend!")
});