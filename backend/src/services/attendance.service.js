const Attendance = require("../models/attendance")
const Permission = require("../models/permission")
const Role = require("../models/role")
const User = require("../models/user")

const createAttendance=async (req,UserId,name,month,fingerprint,status,year,checkin,
        checkout,createId)=>{
        console.log(UserId,name,month,fingerprint,year,checkin,
            checkout,createId)
        // var dateofbirth= new Date(dob);

        let modulejson={
            attendance:{view:true,add:false},
        }

        const role=await Role.findOne({where:{roleName:'attendance'}})
        const permission=await Permission.create({
            module:modulejson,
        })
        
        const attendance=await Attendance.create({
            UserId:UserId,
            name:name,
            month:month,
            year:year,
            checkin:checkout,
            checkout:checkout,
            fingerprint:fingerprint,
            status,
            userId:User.userId,
            createId:req.User.UserId,
        })
        // 
}



const editAttendance=async (req,UserId,name,month,fingerprint,status,year,checkin,
        checkout
    )=>{


            const attendance= await Attendance.findOne({where:{UserId:UserId}})
            attendance.UserId=UserId;
            attendance.name=name;
            attendance.month=month;
            attendance.year=year;
            attendance.checkin=checkin
            attendance.checkout=checkout;
            attendance.fingerprint=fingerprint;
            attendance.status=status;


            if(req?.fingerprint){
                attendance.UserId=req.fingerprint;
            }
            attendance.save();

        }

        const deleteAttendance=async(userId)=>{
            const attendance=await Attendance.findOne({where:{id:userId}});
            await attendance.destroy();
            return attendance;
        }
        

module.exports={createAttendance,editAttendance,deleteAttendance};