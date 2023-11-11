import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Dean = sequelize.define('dean',{
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
    days :{
        type : DataTypes.ARRAY(DataTypes.STRING),
        allowNull : false
    },
    time : {
        type : DataTypes.TIME,
        allowNull : false
    }
})

