const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db');
const User = require('./user');

const Attendance= sequelize.define('attendance', {
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    checkin:{
        type:DataTypes.DATE,

    },
    checkout:{
        type:DataTypes.DATE,
    },
    fingerprint:{
        type:DataTypes.STRING,
    },
    status:{
        type:DataTypes.ENUM,
        values: ['present', 'absent','leave']
    },
},{
    timestamps: true,
    paranoid: true,
});

module.exports = Attendance;