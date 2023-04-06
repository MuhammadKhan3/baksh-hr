const Attendance = require('../models/attendance');
const Employee=require('../services/employee.service');

const createEmployee=async (req,res,next)=>{
    console.log('hit...')
    try {
        const response=await Employee.createEmployee(req,res,req.body);
        res.json({msg:"Employee Successfully Created",flag:true,response:response})

    } catch (error) {
        console.log(error)
        return Error(req,res,error);
    }

}



 const editEmployee=async (req,res,next)=>{
    try {
        const response=await Employee.editEmployee(req,res,req.body);
        res.json({msg:"Employee Successfully edit",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }

}

const salaryTypes=async (req,res,next)=>{

    try {
        let response=await Employee.salaryType();
        response=await response.map((emp)=>{
            return emp.type;
        })
        res.json({msg:"Salary Succefully Fetched",flag:true,salaryTypes:response})

    } catch (error) {
        return Error(req,res,error);
    }
}


const getEmployee=async (req,res,next)=>{
    const {employeeId}=req.params;

    try {
        let response=await Employee.getEmployee(employeeId);
        res.json({msg:"Salary Succefully Fetched",flag:true,employee:response})

    } catch (error) {
        return Error(req,res,error);
    }
}

const getEmployees=async (req,res,next)=>{
    try {
        let response=await Employee.getEmployees();
        await res.json({msg:"Employees List Succefully Fetched",flag:true,employees:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const searchEmployees=async(req,res,next)=>{
    const {search}=req.body;

    try {
        let response=await Employee.searchEmployees(search);
        await res.json({msg:"Search Employee Successfully",flag:true,employees:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const deleteEmployee=async (req,res,next)=>{
    const {deleteId}=req.body;
    try {
        let response=await Employee.deleteEmployee(deleteId);
        await res.json({msg:"Search Employee Successfully",flag:true})
    } catch (error) {
        return Error(req,res,error);
    }
}
//Get Attendance controller
const viewCurrentlyMarkedAttendance = async(req, res, next)=>{

    const {UserId,month,year}=req.body;
    try {
        let response=await Attendance.viewCurrentlyMarkedAttendance(UserId,month,year);
         res.json({msg:"view employee attendance",flag:true,employees:response})
    } catch (error) {
        return Error(req,res,error);
    }
    // var attendanceChunks = [];

    // Attendance.find({
    //     employeeId: req.body._id,
    //     month: new Date().getMonth() + 1,
    //     year: new Date().getFullYear()
    // }).sort({_id: -1}).exec(function getAttendanceSheet(err, docs) {
    //     var found = 0;
    //     if (docs.length > 0) {
    //         found = 1;
    //     }
    //     for (var i = 0; i < docs.length; i++) {
    //         attendanceChunks.push(docs[i]);
    //     }
    //     res.render('Employee/viewAttendance', {
    //         title: 'Attendance Sheet',
    //         month: new Date().getMonth() + 1,
    //         csrfToken: req.csrfToken(),
    //         found: found,
    //         attendance: attendanceChunks,
    //         moment: moment,
    //         userName: req.user.name
    //     });
    // });
}

//Post attendance controller
const markEmployeeAttendance= async(req, res, next) =>{

    const {UserId,month,year}=req.body;
    try {
        let response=await Attendance.markEmployeeAttendance(UserId,month,year);
         res.json({msg:"mark attendance Successfully",flag:true,employees:response})
    } catch (error) {
        return Error(req,res,error);
    }
    //     Attendance.find({
    //     employeeId: req.user._id,
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
    //         newAttendance.employeeId = req.user._id;
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
    //     res.redirect('/employee/view-attendance-current');

    // });
};

module.exports={getEmployees,getEmployee,salaryTypes,createEmployee,editEmployee,searchEmployees,deleteEmployee,markEmployeeAttendance,viewCurrentlyMarkedAttendance};



