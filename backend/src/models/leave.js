const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db')

const Leave = sequelize.define('bank', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
},{
    timestamps: false
});
module.exports = Leave;