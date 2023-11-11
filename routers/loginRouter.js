import express from "express"
import { Student } from "../models/Student.js"
import { Dean } from "../models/Dean.js"
import { createToken } from "../auth/createToken.js"
import { User } from "../models/User.js"

export const loginRouter = express.Router()

loginRouter.post("/login",async(req,res)=>{
    const user = {uid : req.body.uid,password:req.body.password}
    try{

        const userDB = await User.findOne({where:{
            uid : user.uid
        }})

        if(userDB.type === "Student"){
            const student = await Student.findOne({attributes:{
                exclude : ['password']
            }},{where : {
                uid : user.uid,
                password : user.password
            }})
            const token = createToken(user)
            res.send({student,token})
        }else if(userDB.type === "Dean"){
            const dean = await Dean.findOne({attributes:{
                exclude : ['password']
            }},{where:{
                uid : user.uid,
                password : user.password
            }})
            const token = createToken(dean)
            res.send({dean,token})
        }
        
    }catch(e){
        res.status(400).send()
        console.log(e)
    }
})