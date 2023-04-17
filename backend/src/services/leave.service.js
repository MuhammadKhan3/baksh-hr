const LeaveType=require('../models/leaveType')
const Employee = require("../models/employee")
const Leave = require("../models/leave")
const User = require('../models/user')
const Role = require('../models/role')
const { Op, Sequelize } = require('sequelize')
const moment=require('moment')
const Manager = require('../models/manager')
const sequelize = require('../untils/db')
const EmployeeCompany = require('../models/empCompany')
const Department = require('../models/department')
const limit = 6;

const creatLeave=async (req,{userId,leaveTypeId,startDate,endDate,reason})=>{
    console.log(userId,leaveTypeId,startDate,endDate,reason)
    let days = moment(endDate).diff(moment(startDate), 'days', true);
    console.log(days)


    const response=await Leave.create({
        userId,
        leaveTypeId,
        startDate,
        endDate,
        reason,
        leaves:days,
        createId:req.user.id
    })
    return response;
}

const editLeave=async ({userId,leaveTypeId,startDate,endDate,reason},{id})=>{
    console.log('edit leave')
    console.log(userId,leaveTypeId,startDate,endDate,reason,id)
    let days = moment(endDate).diff(moment(startDate), 'days', true);


    const response=await Leave.update(
        {
            userId,
            leaveTypeId,
            startDate,
            endDate,
            reason,
            leaves:days,
        },{
        where:{
            id:id,
        }
    })
    return response;
}

const createLeaveType=async (req,res,leaveData)=>{
    const {leaveType,creditTypeValue,creditLeave,description}=leaveData;
    // Credit Type value is the subscription yearly or monthly half year etc
    const response=await LeaveType.create({
        leaveType,
        creditTypeValue,
        creditLeave,
        description
    })
    return response;
}


const getEmployees=async ()=>{
    const user=await User.findAll({
        include:[{model:Role,where:{[Op.or]:[{roleName:'employee'},{roleName:'manager'}]}}],
        // {model:Manager,as:'managerData'},{model:Employee,as:'employeeData'}
        attributes:['id',['email','label']]
    })
    return user;
}

const LeaveTypes=async ()=>{
    const leavetypes=await LeaveType.findAll({attributes:['id',['leaveType','label']]})
    return leavetypes
}

const RemainingLeave=async (userId)=>{
    // const Remainingleaves=await Leave.sum('leaves',{where:{
    //     userId:userId
    // }});
    // return Remainingleaves;
    const date=new Date('2022 1 jul');
    const currentDate=new Date();
    let processDate=currentDate-date;

    var startOfYear = moment().startOf('year').month(6).subtract(1, 'year'); // July is the 6th month in Moment.js
    const Remainingleaves = await Leave.findAll({
        where:{
                userId:userId,
                createdAt:{[Op.gte]:startOfYear}
        },
        include:[{model:LeaveType}],
    });
      return Remainingleaves
}


const getAllLeaves=()=>{

}





const LeavesEmployeesHr=async ({page=1,search='',departmentId=0})=>{
    search=search.toLowerCase();
    const where={
        deletedAt:null,
        status:'approve',
        '$users.employeeData.employee_company.departmentId$': {[Op.like]:`%${departmentId}%`},
        [Op.or]: [
            {
                reason:{[Op.like]:`%${search}%`}
            },
            {
              '$Users.name$': {
                [Op.like]: `%${search}%`
              }
            }
        ],
        
    }
    

    const include=[
        {model:LeaveType,attributes:['leaveType']},
        {model:User,as:'users',
            include:[
                    { 
                        model:Employee,
                        as:'employeeData',
                        // attributes:['name'],
                        include:[{model:EmployeeCompany,include:[{model:Department}]}]
                    },
            ]
        }

                // include:[
                //     { 
                //         model:Employee,
                //         as:'employeeData',
                //         attributes:['name'],
                //         include:[{model:EmployeeCompany,include:[{model:Department}]}]
                //     },
                //     {   model:Manager,
                //         as:'managerData', 
                //         // where:{
                //         //     name:{[Op.like]:`%${search}%`}
                //         // },
                //         attributes:['name'],
                //     }
                // ]
        
    ];

    const offset = (page - 1) * limit; 
    
    let leaves=await Leave.findAll({
        where:where,
        include:include,
    });
    const count=await Leave.count({
        where:where,
        include:include,
    });

    const totalPages = Math.ceil(count / limit)-1;
    const totalData=count;
    return {leaves,totalPages,totalData}
}
// const LeavesEmployeesHr=async ({page=1,search='',filter=''},userId)=>{
//     search=search.toLowerCase();
//     const where={
//         deletedAt:null,
//         status:{[Op.like]:`%${filter}%`},
//         [Op.or]: [
//             {
//                 reason:{[Op.like]:`%${search}%`}
//             },
//         ],   
//     }
//     const include=[
//         {model:LeaveType,attributes:['leaveType']},
//         {model:User,as:'users',
//             include:[
//                     { 
//                         model:Employee,
//                         as:'employeeData',
//                         // attributes:['name'],
//                         include:[{model:EmployeeCompany,include:[{model:Department}]}]
//                     },
//             ]
//         }
//     ];
//     const offset = (page - 1) * limit;
//     let leaves=await Leave.findAll({
//         where:where,
//         include:include,
//         order:[['createdAt','DESC']]
//     });
//     const count=await Leave.count({
//         where:where,
//         include:include,
//     });
//     const totalPages = Math.ceil(count / limit)-1;
//     const totalData=count;
//     return {leaves,totalPages,totalData}
// }



const LeavesEmployeesManager=async ({page=1,search='',filter=''},userId)=>{
    console.log(filter)
    search=search.toLowerCase();
    const where={
        deletedAt:null,
        '$users.employeeData.employee_company.managerId$': userId,
        status:{[Op.like]:`%${filter}%`},
        [Op.or]: [
            {
                reason:{[Op.like]:`%${search}%`}
            },
        ],   
    }
    const include=[
        {model:LeaveType,attributes:['leaveType']},
        {model:User,as:'users',
            include:[
                    { 
                        model:Employee,
                        as:'employeeData',
                        // attributes:['name'],
                        include:[{model:EmployeeCompany,include:[{model:Department}]}]
                    },
            ]
        }
    ];
    const offset = (page - 1) * limit;
    let leaves=await Leave.findAll({
        where:where,
        include:include,
        order:[['createdAt','DESC']]
    });
    const count=await Leave.count({
        where:where,
        include:include,
    });
    const totalPages = Math.ceil(count / limit)-1;
    const totalData=count;
    return {leaves,totalPages,totalData}
}

const LeavesEmployee=async ({page=1,search='',filter=''},userId=0)=>{
    search=search.toLowerCase();
    const where={
        deletedAt:null,
        userId:userId,
        status:{[Op.like]:`%${filter}%`},
        [Op.or]: [
            {
                reason:{[Op.like]:`%${search}%`}
            },
            {
              '$Users.name$': {
                [Op.like]: `%${search}%`
              }
            }
        ],
        
    }
    const include=[
        {model:LeaveType,attributes:['leaveType']},
        {
            model:User,as:'users',
            include:[{ 
                       model:Employee,as:'employeeData',
                       include:[{model:EmployeeCompany,include:[{model:Department}]}]
                    }]
        }
    ];

    const offset = (page - 1) * limit; 
    
    let leaves=await Leave.findAll({
        where:where,
        include:include,
        order:[['createdAt','Desc']],
        // raw:true,
        // nest : true 
    });

    const count=await Leave.count({
        where:where,
        include:include,
    });

    const totalPages = Math.ceil(count / limit)-1;
    const totalData=count;
    return {leaves,totalPages,totalData}
}

const LeaveApproval=async (leaveId,status)=>{
    console.log(leaveId,status)
    const leave=await Leave.findOne({where:{id:leaveId}});
    leave.status=status;
    leave.save();
    return leave;

}

const getLeave=async ({id})=>{
    console.log(id)
    const leave =await  Leave.findOne({where:{id:id}});
    return leave;
}

module.exports={creatLeave,createLeaveType,
                getEmployees,LeaveTypes,
                RemainingLeave,getAllLeaves,LeavesEmployee,
                LeaveApproval,LeavesEmployeesManager,
                LeavesEmployeesHr,getLeave,editLeave}