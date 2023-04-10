const LeaveType=require('../models/leaveType')
const Employee = require("../models/employee")
const Leave = require("../models/leaveType")
const User = require('../models/user')
const Role = require('../models/role')
const { Op } = require('sequelize')
const Manager = require('../models/manager')

const creatLeave=async ({userId,leaveType,startDate,endDate,reason})=>{
    const response=await Leave.create({
        userId:userId,
        leaveType:leaveType,
        startDate:startDate,
        endDate:endDate,
        reason:reason
    })

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


module.exports={creatLeave,createLeaveType,getEmployees,LeaveTypes}