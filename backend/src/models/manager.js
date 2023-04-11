const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db');
const User = require('./user');

const Manager= sequelize.define('manager', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
},{
    timestamps: true,
    timezone: '+00:00',
    paranoid: true,
      
});

module.exports = Manager;
