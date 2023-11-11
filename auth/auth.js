import jwt from "jsonwebtoken"
import { User } from "../models/User.js"
import { authDean } from "./authDean.js"
import { authStudent } from "./authStudent.js"

export const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        const user = await User.findOne({where:{
            uid:decoded.uid,
        }})

        if(!user){
            res.status(400).json({error:"No User Found"})
        }

        req.uid  = decoded.uid

        


        next()
        
        
    }catch(e){
        console.log(e)
    }
}