import jwt from "jsonwebtoken"
import { Student } from "../models/Student.js"
import { User } from "../models/User.js"



export const authStudent = async(uid)=>{
    try{
            const student = await Student.findOne({where:{
                uid : uid
            }})
            
            if(!student){
                throw "No Student Found, Please Authenticate as Student"
            }

            return student
    }catch(e){
        throw e
    }
}