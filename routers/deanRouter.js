import express from "express"
import { Student } from "../models/Student.js"
import { Dean } from "../models/Dean.js"
import { Sessions } from "../models/Sessions.js"
import { auth } from "../auth/auth.js"
import { authDean } from "../auth/authDean.js"
import { Op } from "sequelize"
import { date } from "../utils/calendar.js"
import  { DateTime } from "luxon"

export const deanRouter = express.Router()

deanRouter.use(auth)


deanRouter.get("/dean/sessions",async(req,res)=>{
    try{
        const dean = await authDean(req.uid)
        const sessions = await Sessions.findAll({where:{
            did : dean.uid,
            available : false,
            date : {
                [Op.gte] : DateTime.fromISO(date).toSQLDate()
            }
        },attributes:['did','sid','date','time']})
        for(let i=0;i<sessions.length;i++){
            if(DateTime.fromISO(sessions[i].date).toJSDate().getTime()<DateTime.now().toJSDate().getTime()){
                sessions.splice(i,1)
            }
        }
        res.send(sessions)
    }catch(e){
        res.status(400).json(e)
        console.log(e)
    }
})

