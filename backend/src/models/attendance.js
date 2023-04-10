const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db');
const User = require('./user');

const Attendance= sequelize.define('attendance', {
    userId:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    month:{
        type:DataTypes.STRING,
        allowNull:false
    },
    year:{
        type:DataTypes.INTEGER,
        // allowNull:false
    },
    checkin:{
        type:DataTypes.DATE,
        require: true
    },
    checkout:{
        type:DataTypes.DATE,
        require:true
    },
    fingerprint:{
        type:DataTypes.STRING,
        allowNull: false,
        require: true
    },
    status:{
        type:DataTypes.ENUM,
        values: ['active', 'inactive']
    },
    createId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps: true,
    paranoid: true,
      
});

module.exports = Attendance;