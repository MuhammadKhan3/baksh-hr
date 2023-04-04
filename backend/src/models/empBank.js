const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db')

const EmployeeBank = sequelize.define('employee_bank', {
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  holderName:{
    type:DataTypes.STRING,
    allowNull:false
  },
  accountNumber:{
    type:DataTypes.STRING,
    allowNull:false
  },
  branch:{
    type:DataTypes.STRING,
    allowNull:false
  },
  salaryType:{
    type:DataTypes.STRING,
    allowNull:false
  },
  salary:{
    type:DataTypes.DECIMAL,
    allowNull:false
  }
},{
    timestamps: true,
    timezone: '+00:00',
    paranoid: true
  });
module.exports = EmployeeBank;
