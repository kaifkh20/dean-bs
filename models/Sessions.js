import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"

export const Sessions = sequelize.define('session',{
    did : {
        type : DataTypes.STRING,
        references:{
            model : 'deans',
            key : 'uid'
        },
        allowNull : false
    },
    sid : {
        type : DataTypes.STRING,
        references : {
            model : 'students',
            key : 'uid'
        }
    },
    date : {
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    time:{
        type : DataTypes.TIME,
        allowNull : false
    },
    available : {
        type : DataTypes.BOOLEAN,
        allowNull : false
    }
})