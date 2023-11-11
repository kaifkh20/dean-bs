import express from "express"
import { Student } from "../models/Student.js"
import { Dean } from "../models/Dean.js"
import { Sessions } from "../models/Sessions.js"
import ShortUniqueId from "short-unique-id"
import { daysWithDatesLeft } from "../utils/calendar.js"
import { User } from "../models/User.js"

export const signupRouter = express.Router()



signupRouter.post('/student',async(req,res)=>{

    const {randomUUID} = new ShortUniqueId({length:10})
    const student = {uid:randomUUID(),name:req.body.name,password:req.body.password}
    

    try{
        const studentDB = await Student.create({uid:student.uid,name:student.name,password:student.password})
        await User.create({uid:student.uid,type:"Student"})
        res.send(studentDB)
    }catch(e){
        console.log(e)
    }
})

signupRouter.post('/dean',async(req,res)=>{

    const {randomUUID} = new ShortUniqueId({length:11})
    const dean = {uid:randomUUID(),name:req.body.name,password:req.body.password,days:req.body.days,time:req.body.time}

    try{
        const deanDB = await Dean.create({uid:dean.uid,name:dean.name,password:dean.password,days:dean.days,time:dean.time})
        await User.create({uid:dean.uid,type:"Dean"})
        let date = new Array()

        for(let i=0;i<daysWithDatesLeft.length;i++){
            if(dean.days.includes(daysWithDatesLeft[i].day)){
                date.push(daysWithDatesLeft[i].date)
            }
            console.log(daysWithDatesLeft[i]);
        }

        for(let i=0;i<date.length;i++){
            console.log(date[i]);
            await Sessions.create({did:dean.uid,date:date[i],available:true,time:deanDB.time})
        }

        res.send(deanDB)
    }catch(e){
        console.log(e)
    }
})