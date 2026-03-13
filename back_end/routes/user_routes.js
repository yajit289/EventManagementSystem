import express from "express";
import User from "../models/user_model.js";
import bcrypt from "bcrypt";
import {jwtMiddleware,generateTokenm} from "../jwt.js"
const router = express.Router();

router.post('/register',async(req,res)=>{
    try{
    const {name,email,password,role} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
      name,
      email,
      password:hashedPassword,
      role
    })
    const payLoad = {
      id : user.id,
      role: user.role,
      userName: user.name,
      createdAt: user.createdAt,
    }
    const token = generateTokenm(payLoad)
    console.log("token is :" ,token)
    res.status(200).json({user:user,token:token})
    }catch (err) {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
}
});

router.post('/login',async(req,res)=>{
  try{
    //finding user
    const {email,password,role} = req.body;
    const user = await User.findOne({email})
    if(!user){
      return res.status(401).json({message:"Invalid Credentials"})
    }
    //verifying password
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(401).json({message:"Invalid Credentials"})
    }
    //generating jwt token
    const payLoad = {
      id: user.id,
      name:user.name,
      role: user.role,
      userName: user.email,
      password: user.password
    }
    const token = generateTokenm(payLoad)
    console.log(token)

    res.json({token:token,  user: {
    role: user.role,
    email: user.email,
    name: user.name
  }})

  }
  catch (err) {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
}
})



export default router;