const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db')

const LeaveType = sequelize.define('leavetype', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    leaveType:{
        type:DataTypes.STRING,
        allowNull:false
    },
    creditTypeValue:{
        type:DataTypes.STRING,
        allowNull:false
    },
    creditLeave:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
    }
    
},{
    timestamps: true,
    timezone: '+00:00',
});
module.exports = LeaveType;