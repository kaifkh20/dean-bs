import express from "express"
import { Student } from "../models/Student.js"
import { Dean } from "../models/Dean.js"
import { Sessions } from "../models/Sessions.js"
import { auth } from "../auth/auth.js"
import { authStudent } from "../auth/authStudent.js"

export const studentRouter = express.Router()

studentRouter.use(auth)

studentRouter.get('/student/dean/:uid',async(req,res)=>{
    const uid = req.params.uid
    try{
        const sessions = await Sessions.findAll({where:{
            did : uid,
            available : true
        }})
        res.send(sessions)
    }catch(e){
        console.log(e);
    }
})

studentRouter.post('/student/dean/booking',async(req,res)=>{
    const {did,date} = req.body

    console.log(did,date);
    try{
        const student = await authStudent(req.uid)
        const sid = student.uid
        if(!sid){
            throw Error("No Student Id Provided")
        }
        const session = await Sessions.update({available : false,sid:sid},{where:{
            did : did,
            date : `${new Date().getFullYear()}-${new Date().getMonth()+1}-${date}`
        }})

        console.log(session);

        if(!session){
            throw "No Session with this date found"
        }

        res.send(`You are booked for Date ${date} this month`)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})