const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../untils/db')

const Allowance=sequelize.define('allowance',{
    deduction:{
        type:DataTypes.FLOAT,
    },
    allowance:{
        type:DataTypes.DECIMAL(10,2),
    }
},{
    timestamps: true,
    timezone: '+00:00'
})

module.exports =Allowance