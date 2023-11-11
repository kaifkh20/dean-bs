import jwt from "jsonwebtoken"
import { Dean } from "../models/Dean.js"
import { User } from "../models/User.js"


export const authDean = async(uid)=>{
    try{

            const dean = await Dean.findOne({where:{
                uid : uid
            }})

            if(!dean){
                throw "No Dean Found, Please Authenticate as Dean"
            }
            
            return dean

        
    }catch(e){
        throw e
        // res.status(404).send({'error':'Please Authenticate Dean'})
    }
}