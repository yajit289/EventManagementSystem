import dotenv from "dotenv";
dotenv.config()
import express from 'express';
import user_routes from "./routes/user_routes.js"
import event_routes from "./routes/event_routes.js"
import connectDB from './db.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import { jwtMiddleware } from "./jwt.js";

const app = express()
const port = process.env.port;
connectDB()


app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","PATCH","DELETE"]

}))
//midllewares
app.use(express.json())
app.use(bodyParser.json())

//routes
app.get("/", (req,res)=>{
    res.json("Welcome to world")
})
app.use('/user',user_routes)
app.use('/event',jwtMiddleware,event_routes)


// running server
app.listen(port,()=>{
    console.log("Server is running on http://localhost:3000")
})