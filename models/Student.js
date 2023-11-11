import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Student = sequelize.define('student',{
    uid : {
        type : DataTypes.STRING,
        primaryKey : true,
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    
})

