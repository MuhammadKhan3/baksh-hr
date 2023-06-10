const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../untils/db')

const employeeAllowance=sequelize.define('employee_allowance',{
    allowanceName:{
        type:DataTypes.STRING,
        allowNull: false
    },
    allowance:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
    }
},{
    paranoid:true,
    timestamps: true,
    timezone: '+00:00'
})
module.exports=employeeAllowance;