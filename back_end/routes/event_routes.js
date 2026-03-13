import express from "express";
import Event from "../models/event_model.js"

const router = express.Router();

router.post("/createevent", async(req,res)=>{
    try{
        const {title,description,location,startDate,endDate,registrationDeadline} = req.body
        const event = await Event.create({
            title,
            description,
            location,
            startDate,
            endDate,
            registrationDeadline,
            createdBy: req.user.id
        })
        console.log(event)
        res.json({message: "Event created"})
    }catch(error){

        res.status(500).json({error: " Internal Server Error"})

    }
})

router.get("/", async (req, res) => {
  try {

    const events = await Event.find()

    res.json(events)

  } catch (error) {

    res.status(500).json({ error: "Server error" })

  }
})


export default router;