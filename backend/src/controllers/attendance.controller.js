const { error } = require("winston");
const Attendance = require("../models/attendance");
const User = require("../models/user");

//@desc get attendance
//@route GET /api/admin
//@access private
const getAttendance = async(req, res, next)=>{
     const {checkin, checkout} = req.body
    try {
      if(!checkin || checkout){
        res.status(400)
        throw new Error ('please add time')
      }
        const response=await Attendance.createAttendance(req,res,checkin);
         res.json({msg:"mark employee attendance",flag:true,employees:response})
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

  module.exports ={getAttendance,setAttendance,updateAttendance,deleteAttendnace}