const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db')

const LeaveDetail = sequelize.define('leavedetail', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startData:{
        type:DataTypes.DATE,
        allowNull:false
    },
    endDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    leaves:{
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
module.exports = LeaveDetail;