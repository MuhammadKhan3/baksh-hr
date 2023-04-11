const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db');
const Permission = require('./permission');
const Role = require('./role');

const User = sequelize.define('User', {
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  status:{
    type:DataTypes.ENUM,
    values: ['active', 'inactive']
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
  paranoid: true,
  timestamps: true,
  timezone: '+00:00'
});

module.exports = User;
