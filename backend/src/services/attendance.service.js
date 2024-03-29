const sequelize = require("sequelize");
const Attendance = require("../models/attendance")
const Permission = require("../models/permission")
const Role = require("../models/role")
const User = require("../models/user")
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const moment=require('moment')
const date=new Date()
const cron = require('node-cron');
const Employee = require("../models/employee");
const EmployeeCompany = require("../models/empCompany");
const Department = require("../models/department");
const Manager = require("../models/manager");



const createAttendance=(file,admin)=>{

    console.log('hit....')
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

const getAttendance=async()=>{

    let Attendace=await Attendance.findAll({
        include:{model:User,as:'attendanceBy',attributes:['name']}
    });
    Attendace=await Attendace.map((data)=>{
        return {name:data['name'],email:data['email'],attendanceBy:data?.attendanceBy?.name,checkin:data?.checkin,checkout:data?.checkout,status:data?.status}
    })
    return Attendace;
}

const attencdanceReport=async(id,{department='',search='',startDate,endDate})=>{
    const start = startDate==='null' ? date : startDate;
    const end = endDate==='null' ? date : endDate;
    
    
    const month=moment(start).format('MM')
    const  year=moment(start).format('YYYY')
    const day=startDate==='null' ? moment(start).day(1).format('DD') : moment(start).format('DD')
    console.log(startDate==='null',moment(start).day(1).format('DD'))
    const endMonth=moment(end).format('MM')
    const endYear=moment(end).format('YYYY')
    const endDay=moment(end).format('DD')

    const diffInDays = startDate=='null' ? endDay :moment(end).diff(moment(start), 'days')+1;    
    let where={};
    if(search.length>0){
         where={
            [sequelize.Op.or]: { 
                '$employeeData.name$':{[sequelize.Op.like]:`%${search}%`},
                '$managerData.name$':{[sequelize.Op.like]:`%${search}%`},
                     
            },
        }
    }else{
        where={
                [sequelize.Op.or]:{
                    '$employeeData.employee_company.department.department$': {[sequelize.Op.like]:`%${department}%`},
                    '$managerData.department.department$': {[sequelize.Op.like]:`%${department}%`},
                }
        }
    }

    try {
        let Attendace=await User.findAll({
            where:where,
            include:[
                {
                    model:Manager,
                    as:'managerData',
                    include:[{model:Department}]
                },
                {
                    model:Employee,
                    as:'employeeData',
                    include:[{model:EmployeeCompany,include:[{model:Department}]}]
                },
                {
                    model:Role,
                    where:{
                        // roleName:'manager',
                        [sequelize.Op.or]:[{roleName:'manager'},{roleName:'employee'}]
                    }
                },
                {
                    model:Attendance,
                    required: false,
                    as:'attendances',
                    
                    // attributes:[sequelize.fn("COUNT", sequelize.col("id"))],
                    where:{
                        // checkin:{
                            [sequelize.Op.and]: [
                                sequelize.where(sequelize.fn('MONTH', sequelize.col('checkin')), {
                                    [sequelize.Op.gte]:month
                                }),
                                
                                sequelize.where(sequelize.fn('YEAR', sequelize.col('checkin')), {
                                    [sequelize.Op.gte]:year
                                }),
                                
                                sequelize.where(sequelize.fn('DAY', sequelize.col('checkin')), {
                                    [sequelize.Op.gte]: 01
                                }),
                                
                                sequelize.where(sequelize.fn('MONTH', sequelize.col('checkin')), {
                                    [sequelize.Op.lte]:endMonth
                                }),
                                
                                sequelize.where(sequelize.fn('YEAR', sequelize.col('checkin')), {
                                    [sequelize.Op.lte]:endYear 
                                }),
                                
                                sequelize.where(sequelize.fn('DAY', sequelize.col('checkin')), {
                                      [sequelize.Op.lte]: endDay
                                }),
                            ],        
                        // }
                    }
        
                }
            ],

        });
    
        return {Attendace:Attendace,days:diffInDays};
    
    } catch (error) {
        console.log(error)        
    }

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

const attendanceSchedule=async ()=>{
    const checkin=date;
    month=moment(checkin).format('MM')
    year=moment(checkin).format('YYYY')
    day=moment(checkin).format('DD')
    console.log('schdule',day)

    const Users=await User.findAll({
        include:[{
            model:Role,
            where:{
                [sequelize.Op.or]:[{roleName:'manager'},{roleName:'employee'}]
            }
        }]
    })
    const today = moment().format('YYYY-MM-DD'); // Get today's date formatted as YYYY-MM-DD

    for (const user of Users) {
        console.log(user.id)
            const attendance=await Attendance.findOne({
            where:{
                    userId:user.id,
                    checkin:today,
                // [sequelize.Op.and]: [
                //         sequelize.where(sequelize.fn('MONTH', sequelize.col('checkin')), month),
                //     sequelize.where(sequelize.fn('YEAR', sequelize.col('checkin')), year),
                //     sequelize.where(sequelize.fn('DAY', sequelize.col('checkin')),day),
        
                //     ],        
                }
            })
            const checkin = moment().set({hour: 0, minute: 0, second: 0, millisecond: 0});
            if(attendance===null){
                Attendance.create({
                    name:user.name,
                    checkin:checkin,
                    checkout:null,
                    userId:user?.id,
                    status:'absent',
                    attendanceById:null
                })
            }
    }
    return Users;
}
  


module.exports={createAttendance,getAttendance,editAttendance,deleteAttendance,attencdanceReport,attendanceSchedule};