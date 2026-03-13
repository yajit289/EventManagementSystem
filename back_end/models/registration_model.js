import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    status:{
        type: String,
        enum:["Registered","Cancelled"]
    },
    registerAt:{
        type: Date,
        default: Date.now,
    }
},{timestamps:true})

registrationSchema.index({user:1,event:1})
const Registration =  mongoose.model("Registration", registrationSchema)
export default Registration;
