import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"

export const User = sequelize.define('user',{
    uid : {
        type : DataTypes.STRING,
        primaryKey : true
    },
    type : {
        type : DataTypes.STRING,
        allowNull : false
    }
})