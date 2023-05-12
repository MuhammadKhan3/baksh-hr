const { error } = require("winston");
const Attendance = require("../services/attendance.service");
const User = require("../models/user");

//@desc get attendance
//@route GET /api/admin
//@access private
const createAttendanceCsv= async (req,res,next)=>{
    try {
        let response=await Attendance.createAttendance(req.file,req.user);
         res.json({msg:"Mark Employee Csv attendance",flag:true,Attendance:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const getAttendance = async(req, res, next)=>{
    try {
        const response=await Attendance.getAttendance();
        res.json({msg:"Fetch  Attendance Succefully",flag:true,attendance:response})
    } catch (error) {
        return Error(req,res,error);
    }
  
}
    //@desc set attendance
    //@route POST /api/admin
    //@access private
  const setAttendance= async(req,res,next)=>{
     if(req.body.text){
      res.status(200).json({msg:"add text sucessfully"});
    }
    // const {UserId,month,year}=req.body;
    // try {
    //     let response=await Attendance.setAttendance(req,res,UserId,month,year);
    //      res.json({msg:"mark employee attendance",flag:true,Attendance:response})
    // } catch (error) {
    //     return Error(req,res,error);
    // }
  }

const AttendaceReport=async (req,res,next)=>{
  
  try {
    const response=await Attendance.attencdanceReport(0,req.query);
    res.json({msg:"Fetch  Attendance Report Succefully",flag:true,attendance:response})
} catch (error) {
    return Error(req,res,error);
}
}


    //@desc update attendance
    //@route UPDATE /api/:id
    //@access private
    //attendance controller for edit attendance
  const updateAttendance=async (req,res,next)=>{

    res.json({msg:`mark employee attendance ${req.params.id}`})

    // const {userId}=req.params;
  
    // try {
    //     const response=await Attendance.editAttendance(userId);
    //     res.json({msg:"Attendance edited",flag:true,response:response})
    //         res.json({msg:"edit sucessfully"});
    // } catch (error) {
    //      return Error(req,res,error);
    // }
  }
    //@desc delete attendance
    //@route DELETE /api/:id
    //@access private
  // attendance controller for delete attendance
  const deleteAttendnace=async (req,res,next)=>{

    res.json({msg:`delete id sucessfully ${req.params.id}`})
    // const {userId}=req.params;
    // try {
    //     const response= await Attendance.deleteAttendance(userId);
    //     res.json({msg:"attendance Deleted",flag:true});
    // } catch (error) {
    //     return Error(req,res,error);
    // }

  }
  const attendanceSchedule=async (req,res,next)=>{
    const attencdance=await Attendance.attendanceSchedule()
    res.json({attencdance:attencdance})
  }

  module.exports ={getAttendance,setAttendance,updateAttendance,deleteAttendnace,createAttendanceCsv,AttendaceReport,attendanceSchedule}