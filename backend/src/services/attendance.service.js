const Attendance = require("../models/attendance")
const Permission = require("../models/permission")
const Role = require("../models/role")
const User = require("../models/user")

const createAttendance= async(req,userId,name,month,fingerprint,status,year,checkin,checkout,createId)=>{
        console.log(userId,name,month,fingerprint,year,checkin, checkout,createId)

        const createAttendance=await Attendance.create({checkin});
        console.log(createAttendance)
        // var dateofbirth= new Date(dob);
        //    Attendance.find({
        //     UserId: req.user._id,
        //     month: new Date().getMonth()+ 1,
        //     date: new Date().getDate(),
        //     year: new Date().getFullYear()
        // }, function getAttendanceSheet(err, docs) {
        //     var found = 0;
        //     if (docs.length > 0) {
        //         found = 1;
        //     }
        //     else {
    
        //         var newAttendance = new Attendance();
        //         newAttendance.userId = req.user._id;
        //         newAttendance.year = new Date().getFullYear();
        //         newAttendance.month = new Date().getMonth() + 1;
        //         newAttendance.date = new Date().getDate();
        //         newAttendance.present = 1;
        //         newAttendance.save(function saveAttendance(err) {
        //             if (err) {
        //                 console.log(err);
        //             }
    
        //         });
        //     }
        //     res.redirect('/view-attendance-current');
    
        // });
}

const getAttendance=(req, res, next)=>{
    var attendanceChunks = [];

    Attendance.find({
        userId: req.params._id,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    }).sort({_id: -1}).exec(function getAttendanceSheet(err, docs) {
        var found = 0;
        if (docs.length > 0) {
            found = 1;
        }
        for (var i = 0; i < docs.length; i++) {
            attendanceChunks.push(docs[i]);
        }
        res.render('Attendance/viewAttendance', {
            title: 'Attendance Sheet',
            month: new Date().getMonth() + 1,
            csrfToken: req.csrfToken(),
            found: found,
            attendance: attendanceChunks,
            moment: moment,
            userName: req.body.name
        });
    });
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