const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db')

const EmployeeCompany = sequelize.define('employee_company', {
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  dateofJoining:{
    type:DataTypes.DATE,
    allowNull:false

  },
  dateofleave:{
    type:DataTypes.DATE,
  },
  managerId:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  status:{
    type:Sequelize.DataTypes.ENUM('active','unactive'),
  }

},{
    timestamps: true,
    timezone: '+00:00',
    paranoid: true
  });
module.exports = EmployeeCompany;
