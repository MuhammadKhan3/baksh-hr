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
    const search=req.query;
    console.log(search)
    try {
        let response=await Employee.getEmployees(search);
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

const getManagerEmployees=async (req,res,next)=>{
    const managerId=req?.user?.managerData?.id;
    const search=req.query;
    try {
        let response=await Employee.GetManagerEmployees(managerId,search);
         res.json({msg:"Fetch Employees Successfully",flag:true,employees:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

module.exports={getEmployees,getEmployee,salaryTypes,createEmployee,editEmployee,searchEmployees,deleteEmployee,getManagerEmployees};

