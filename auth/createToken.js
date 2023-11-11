import jwt from "jsonwebtoken"

export function createToken(user){
    const token = jwt.sign({uid:user.uid,password:user.password},process.env.SECRET_KEY)
    return token
}