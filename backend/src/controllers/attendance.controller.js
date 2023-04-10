const Attendance = require("../models/attendance");
const User = require("../models/user");


exports.markEmployeeAttendance = async(req, res, next)=>{

    const {UserId,month,year}=req.body;
    try {
        let response=await Attendance.markEmployeeAttendance(UserId,month,year);
         res.json({msg:"mark employee attendance",flag:true,employees:response})
    } catch (error) {
        return Error(req,res,error);
    }
    //

}

  exports.getAttendanceSheet= async(req,res,next)=>{
    const {UserId,month,year}=req.body;
    try {
        let response=await Attendance.getAttendanceSheet(UserId,month,year);
         res.json({msg:"mark employee attendance",flag:true,employees:response})
    } catch (error) {
        return Error(req,res,error);
    }
  }



  // attendance controller for edit attendance
  exports.editAttendance=async (req,res,next)=>{

    const {userId}=req.params;
  
    try {
        const response=await Attendance.editAttendance(userId);
        res.json({msg:"Attendance edited",flag:true,response:response})
            res.json({msg:"edit sucessfully"});
    } catch (error) {
         return Error(req,res,error);
    }
  }

// attendance controller for delete attendance
  exports.deleteAttendnace=async (req,res,next)=>{
    const {userId}=req.params;
    try {
        const response= await Attendance.deleteAttendance(userId);
        res.json({msg:"attendance Deleted",flag:true});
    } catch (error) {
        return Error(req,res,error);
    }
  }