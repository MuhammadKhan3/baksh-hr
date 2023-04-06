const Role = require("../models/role")
const {Error}=require('../helpers/helper')
const {InsertRole,Signup, Login} = require("../services/admin.service")

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

// current attendance
exports.viewCurrentlyMarkedAttendance=async(req,res,next)=>{

  const {UserId,month,year}=req.body;
  try {
      let response=await Attendance.markEmployeeAttendance(UserId,month,year);
       res.json({msg:"mark employee attendance",flag:true,employees:response})
  } catch (error) {
      return Error(req,res,error);
  }
}

exports.viewAttendanceSheet=async (req,res,next)=>{
   
  const {UserId,month,year}=req.body;
  try {
      let response=await Attendance.markEmployeeAttendance(UserId,month,year);
       res.json({msg:"mark employee attendance",flag:true,employees:response})
  } catch (error) {
      return Error(req,res,error);
  }
}



// attendance controller for
exports.editAttendance=async (req,res,next)=>{

  const {userId}=req.params;

  try {
      const response=await Attendance.editAttendance(userId);
      res.json({msg:"Attendance edited",flag:true,response:response})
  } catch (error) {
       return Error(req,res,error);
  }
}

exports.deleteAttendnace=async (req,res,next)=>{
  const {userId}=req.params;
  try {
      const response= await Attendance.deleteAttendance(userId);
      res.json({msg:"attendance Deleted",flag:true});
  } catch (error) {
      return Error(req,res,error);
  }
}



