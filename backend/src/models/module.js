const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db')

const Module = sequelize.define('module', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    moduleName:{
        type:DataTypes.STRING,
        allowNull:false,
    }
    
},{
    timestamps: false
});
module.exports = Module;