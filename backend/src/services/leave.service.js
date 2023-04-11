const LeaveType=require('../models/leaveType')
const Employee = require("../models/employee")
const Leave = require("../models/leave")
const User = require('../models/user')
const Role = require('../models/role')
const { Op, Sequelize } = require('sequelize')
const moment=require('moment')
const Manager = require('../models/manager')

const creatLeave=async (req,{userId,leaveTypeId,startDate,endDate,reason})=>{

    let days = moment(endDate).diff(moment(startDate), 'days', true);
    console.log(days)

    try {
        const response=await Leave.create({
            userId,
            leaveTypeId,
            startDate,
            endDate,
            reason,
            leaves:days,
            createId:req.user.id
        })
            
    } catch (error) {
        console.log(error)        
    }

    return response;
}

const createLeaveType=async (req,res,leaveData)=>{
    const {leaveType,creditTypeValue,creditLeave,description}=leaveData;
    // Credit Type value is the subscription yearly or monthly half year etc
    const response=await LeaveType.create({
        leaveType,
        creditTypeValue,
        creditLeave,
        description
    })
    return response;
}


const getEmployees=async ()=>{
    const user=await User.findAll({
        include:[{model:Role,where:{[Op.or]:[{roleName:'employee'},{roleName:'manager'}]}}],
        // {model:Manager,as:'managerData'},{model:Employee,as:'employeeData'}
        attributes:['id',['email','label']]
    })
    return user;
}

const LeaveTypes=async ()=>{
    const leavetypes=await LeaveType.findAll({attributes:['id',['leaveType','label']]})
    return leavetypes
}

const RemainingLeave=async (userId)=>{
    // const Remainingleaves=await Leave.sum('leaves',{where:{
    //     userId:userId
    // }});
    // return Remainingleaves;
    const date=new Date('2022 1 jul');
    const currentDate=new Date();
    let processDate=currentDate-date;

    var startOfYear = moment().startOf('year').month(6).subtract(1, 'year'); // July is the 6th month in Moment.js
    const Remainingleaves = await Leave.findAll({
        where:{
                userId:userId,
                createdAt:{[Op.gte]:startOfYear}
        },
        include:[{model:LeaveType}],
    });
      return Remainingleaves
}


module.exports={creatLeave,createLeaveType,getEmployees,LeaveTypes,RemainingLeave}