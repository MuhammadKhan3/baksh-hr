const Role = require("../models/role")
const {Error}=require('../helpers/helper')
const {InsertRole,Signup, Login} = require("../services/admin.service")
const {getAttendance,editAttendance,deleteAttendance} = require('../services/attendance.service')
const Attendance = require("../models/attendance")

exports.createAdmin=(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}


exports.insertRole=async (req,res,next)=>{
    const {roleName}=req.body;
    try {
        const response=await InsertRole(roleName);
        return res.json({msg:'Succefully Created',status:true,response:response});
    } catch (error) {
        return Error(req,res,error);
    }
}

exports.signup=async (req,res,next)=>{
  const {userType,email,password}=req.body;
  try {
    const data=await Signup(email,password);
    return res.status(200).json({status:true,msg:"Admin Created Succefully",data:data}) 
  } catch (error) {
    return Error(req,res,error);   
  }
}




