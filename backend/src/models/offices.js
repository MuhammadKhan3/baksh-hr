const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db')

const Offices = sequelize.define('office', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address:{
        type:DataTypes.STRING
    },
    country:{
        type:DataTypes.STRING,
    },
    city:{
        type:DataTypes.STRING
    },
    officeCode:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    timestamps: false
});
module.exports = Offices;