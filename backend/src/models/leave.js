const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db')

const Leave = sequelize.define('leave', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startDate:{
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
    reason:{
        type:DataTypes.STRING,
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:'applied'
    }
},{
    paranoid: true,
    timestamps: true,
    timezone: '+00:00',
});
module.exports = Leave;