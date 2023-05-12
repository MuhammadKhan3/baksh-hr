const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require('../untils/db')

const companyDetails = sequelize.define('companyDetail', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    picture:{
        type:DataTypes.STRING
    },
    companyName:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    websiteUrl:{
        type:DataTypes.STRING
    }
},{
    timestamps: false
});
module.exports = companyDetails;