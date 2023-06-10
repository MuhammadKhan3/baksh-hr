const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../untils/db');


const PaySlips=sequelize.define('payslip',{
    salary:{
        type:DataTypes.FLOAT,
        allowNull:false

    },
    date:{
        type:DataTypes.DATEONLY,
        allowNull:false

    },
    leaves:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    }
 })
module.exports=PaySlips;