const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db')

const Pages = sequelize.define('module', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pageName:{
        type:DataTypes.STRING,
        allowNull:false,
    }
    
},{
    timestamps: false
});
module.exports = Pages;