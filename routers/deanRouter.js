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

        // console.log(DateTime.fromSeconds(sessions[0].time).toJSDate().getTime());
        for(let i=0;i<sessions.length;i++){
            // console.log(sessions[i]);
            // console.log();
            // console.log(new DateTime(new Date()).hour>sessions[i].time.split(':')[0]);
            // console.log(new DateTime(new Date()).minute,sessions[i].time.split(':')[1]);
            if(DateTime.now().day===DateTime.fromSQL(sessions[i].date).day){
                if(new DateTime(new Date()).hour>parseInt(sessions[i].time.split(':')[0])){
                            sessions.splice(i,1)
                }else if(new DateTime(new Date()).hour===parseInt(sessions[i].time.split(':')[0])){
                    
                    if(new DateTime(new Date()).minute>parseInt(sessions[i].time.split(':')[1])){
                        sessions.splice(i,1)
                    }
                }
            }
        //    
        }
        res.send(sessions)
    }catch(e){
        res.status(400).json(e)
        console.log(e)
    }
})

