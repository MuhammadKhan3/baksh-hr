const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db')

const Employee = sequelize.define('employee', {
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  fatherName:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  dob:{
    type:DataTypes.DATE,
    allowNull:false,
  },
  gender:{
    type:DataTypes.STRING,
    allowNull:false
  },
  contactOne:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
  },
  contactTwo:{
    type:DataTypes.STRING,
    allowNull:false
  },
  localAddress:{
    type:DataTypes.STRING,
    allowNull:false
  },
  permanentAddress:{
    type:DataTypes.STRING,
    allowNull:false
  },
  nationality:{
    type:DataTypes.STRING,
    allowNull:false
  },

  martialStatus:{
    type: Sequelize.DataTypes.ENUM('married', 'single', 'other'),
    allowNull:false,
    defaultValue: 'married',
  },
  profilePhoto:{
    type:DataTypes.JSON,
    defaultValue:''
  },
  comment:{
    type:DataTypes.STRING,
    defaultValue:''
  },
  bloodGroup:{
    type:DataTypes.STRING,
    allowNull:false
  },
  emergencyContact:{
    type:DataTypes.STRING,
  },
  kinname:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  relation:{
    type:DataTypes.STRING,
  },
  password:{
    type:DataTypes.STRING
  },
  kinPhone:{
    type:DataTypes.STRING,
    allowNull:false
  },

},{
    timestamps: true,
    timezone: '+00:00',
    paranoid: true
  });
module.exports = Employee;
