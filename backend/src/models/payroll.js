const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db');
const User = require('./user');

const Payroll= sequelize.define('payroll', {
    employeeId:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        ref:'User',
        autoIncrement: true
    },
    accountManagerID:{
        type:DataTypes.INTEGER,
        ref:'User',
        allowNull:false
    },
    bankName:{
        type:DataTypes.STRING,
        require:true
    },
    branchAddress:{
        type:DataTypes.STRING,
        require:true
    },
    basicPay:{
        type:DataTypes.INTEGER,
        require: true
    },
    overtime:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    conveyanceAllowance:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
      
});

module.exports = Payroll;