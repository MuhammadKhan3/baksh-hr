const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db');
const User = require('./user');

const Manager= sequelize.define('manager', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    photo:{
        type:DataTypes.JSON,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        // allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //       model: User,
    //       key: 'id'
    //     }
    // },
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
    timezone: '+00:00',
    paranoid: true,
      
});

module.exports = Manager;
