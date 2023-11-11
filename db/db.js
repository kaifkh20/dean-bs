import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config()

export const sequelize = new Sequelize(process.env.DBNAME,process.env.USERNAME,process.env.PASSWORD,{
    host : "localhost",
    port : 5432,
    dialect : "postgres",
    logging : false  
})

await sequelize.sync()