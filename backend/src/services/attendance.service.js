const sequelize = require("sequelize");
const Attendance = require("../models/attendance")
const Permission = require("../models/permission")
const Role = require("../models/role")
const User = require("../models/user")
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');


const createAttendance=(file,admin)=>{
    console.log('hit...')

    const filePath = path.join(__dirname, `../../uploads/attendance/${file.filename}`);
    count=0
    fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async (row) => {
        console.log(row)
            const user=await User.findOne({where:{email:row?.email}})
            Attendance.create({
                name:user.name,
                checkin:row.checkin,
                checkout:row.checkout,
                userId:user?.id,
                status:row?.status,
                attendanceById:admin?.id
            })
        })
        .on('end', () => {

            return "Ok"
            // done reading the file
        });        


}

const getAttendance=async(req, res, next)=>{

    let Attendace=await Attendance.findAll({
        include:{model:User,as:'attendanceBy',attributes:['name']}
    });
    Attendace=await Attendace.map((data)=>{
        return {name:data['name'],email:data['email'],attendanceBy:data?.attendanceBy?.name,checkin:data?.checkin,checkout:data?.checkout,status:data?.status}
    })
    return Attendace;
}



const editAttendance=async (req,userId,name,month,fingerprint,status,year,checkin,checkout)=>{


            const attendance= await Attendance.findOne({where:{id:userId}})
            attendance.userId=userId;
            attendance.name=name;
            attendance.month=month;
            attendance.year=year;
            attendance.checkin=checkin
            attendance.checkout=checkout;
            attendance.fingerprint=fingerprint;
            attendance.status=status;


            if(req?.fingerprint){
                attendance.userId=req.fingerprint;
            }
            attendance.save();
        }

        const deleteAttendance=async(userId)=>{
            const attendance=await Attendance.findOne({where:{id:userId}});
            await attendance.destroy();
            return attendance;
        }
        

module.exports={createAttendance,getAttendance,editAttendance,deleteAttendance};