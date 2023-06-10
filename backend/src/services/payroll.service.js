const Allowance = require('../models/allowance');
const AllowancePaylslip = require('../models/allowancePaylslip');
const Attendance = require('../models/attendance');
const EmployeeBank = require('../models/empBank')
const Employee=require('../models/employee');
const PaySlips = require('../models/paySlips');
const sequelize =require('sequelize');
const User = require('../models/user');
const EmployeeCompany = require('../models/empCompany');
const Department = require('../models/department');
const Designation = require('../models/designation');
const { getPaySlipDto } = require('../dto/dto');
const Allowances = require('./allowance.service');
const {Op}=sequelize

const createPayslips=async (data)=>{
    try {
      console.log(data)
      const {year,month,status}=data;
      const date=new Date(year,month)
      const employee=await Employee.findAll({attributes:['id','userId'],include:[{model:EmployeeBank}]});
      
      employee.forEach(async employeeData => {


        const attendanceCount=await Attendance.count({
            where:{
                userId:employeeData?.userId,
                [Op.or]: [
                    { status: 'absent' }, // Search by attribute1 with searchValue1
                    { status: 'leave' }  // Search by attribute2 with searchValue2
                ],
                checkout: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('MONTH', sequelize.col('checkout')), month),
                        sequelize.where(sequelize.fn('YEAR', sequelize.col('checkout')), year)
                    ]
                }
            }
        })

        const payslip=await PaySlips.create({
            salary:employeeData?.employee_bank?.salary,
            date:date,
            status:status,
            employeeId:employeeData?.id,
            userId:employeeData?.userId,
            leaves:attendanceCount
        })        
        
        const Allowances=await Allowance.findAll();

        Allowances.forEach((allowance)=>{
            AllowancePaylslip.create({
                allowanceId:allowance?.id,
                payslipId:payslip?.id
            })
        })
        // console.log(employeeData?.userId)
      });


      return "OK"
    } catch (error) {
     console.log(error)       
    }
}

const getPayslips=async (search)=>{
    try {
        const paySlips= await PaySlips.findAll({
            where:{'$employee.name$':{[Op.like]:`%${search}%`}},
            include:
                [
                    {model:User},
                    {model:Allowance,attributes:['id','allowance','deduction']},
                    {
                     model:Employee,attributes:['id','email','name','fatherName'],
                     include:{model:EmployeeCompany,include:[{model:Department},{model:Designation}]}
                    }
                ]
        });
        const datastructure=paySlips.map(data=>{
            return {id:data?.id,name:data?.employee?.name,salary:data?.salary,designation:data?.employee?.employee_company?.designation?.designation,allowances:data?.allowances}
        })
        return datastructure;
    } catch (error) {
        console.log(error)
    }
}

const getEmployeePayslips=async (search,user)=>{
    try {
        const paySlips= await PaySlips.findAll({
            where:{
                '$employee.name$':{[Op.like]:`%${search}%`},
                 userId:user?.id
            },
            include:
                [
                    {model:User},
                    {model:Allowance,attributes:['id','allowance','deduction']},
                    {
                     model:Employee,attributes:['id','email','name','fatherName'],
                     include:{model:EmployeeCompany,include:[{model:Department},{model:Designation}]}
                    }
                ]
        });
        const datastructure=paySlips.map(data=>{
            return {id:data?.id,name:data?.employee?.name,salary:data?.salary,designation:data?.employee?.employee_company?.designation?.designation,allowances:data?.allowances,createdAt:data?.createdAt}
        })
        return datastructure;
    } catch (error) {
        console.log(error)
    }
}

const getpaySlip=async (payslipId)=>{

    const response=await PaySlips.findOne({
        where:{id:payslipId},
        include:[
            {model:Employee},
            {model:Allowance,attributes:['id','deduction','allowance']}
        ]
    })
    const payslips=await getPaySlipDto(response);
    return payslips
}


const editPayslip=async ({name,leaves,salary,allowances,deleteAllowance},payslipId)=>{
    console.log(name,leaves,salary,allowances)
    let response=await PaySlips.update(
        {name,leaves,salary},
        { where: { id: payslipId} }
    )

    response=await Allowances.CreateOrUpdate(allowances)
    console.log(response)
    const {data}=response;

    deleteAllowance.forEach((id)=>{
        AllowancePaylslip.destroy({
            where:{
                allowanceId:id,
                payslipId:payslipId
            }
        })
    })
    data.forEach((allowanceData,i)=>{
        console.log()
        
        if (allowanceData.created===true) {
            AllowancePaylslip.create({
                allowanceId:allowanceData?.object?.id,
                payslipId:payslipId,
            })
        }
    })

    return response
}

const deletePayslip=async (id)=>{
    console.log(id)
    const response=await PaySlips.destroy({
        where:{
            id:id
        },
        include:[Allowance]
    })
    return response;
}
module.exports={createPayslips,getPayslips,getEmployeePayslips,getpaySlip,editPayslip,deletePayslip}