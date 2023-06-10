const Allowances  = require("../services/allowance.service");
const Payroll = require("../services/payroll.service");


    const createPayslips = async(req,res) => {
        console.log("Payroll created sucessfully")
        console.log('createPayslip',req.body)                 
        try {
            const response=await Payroll.createPayslips(req.body);
            res.json({msg:"Payroll Successfully Created",flag:true,response:response}) 
        } catch (error) {
            console.log(error)
            response.status(500);
            return Error(req,res,error);
        }
    };


    const GetPaySlips = async(req,res,next) => {
        const {query:{
            search
        }}=req;
        const user=req.user;
        try {
            let response;

            if(user?.role?.roleName==='hr'){
                response=await Payroll.getPayslips(search);
            }else if(user?.role?.roleName==='employee'){
                response=await Payroll.getEmployeePayslips(search,req.user);
            }


            res.json({msg:"Get Payroll Successfully Created",flag:true,payslips:response}) 
        } catch (error) {
            console.log(error)
            response.status(500);
            return Error(req,res,error);
        }
    };

    

    const updatePayroll = async(req,res) => {
        const {employeeId}=req.params;
                 
        try {
            let response=await Payroll.getPayroll(employeeId);
            res.json({msg:"Get Employee Successfully Created",flag:true,response:response}) 
        } catch (error) {
            console.log(error)
            response.status(500);
            return Error(req,res,error);
        }
    };
    

    // const deletePayroll = async(req,res) => {
    //     const {employeeId}=req.params;
                 
    //     try {
    //         let response=await Payroll.getPayroll(employeeId);
    //         res.json({msg:"Get Employee Successfully Created",flag:true,response:response}) 
    //     } catch (error) {
    //         console.log(error)
    //         response.status(500);
    //         return Error(req,res,error);
    //     }
    // };

    const getPayslip = async (req,res) => {
        const {payslipId}=req.params;
        
        try {
            let response=await Payroll.getpaySlip(payslipId);
            res.json({msg:"Get Payslip Successfully",flag:true,response:response}) 
        } catch (error) {
            console.log(error)
            response.status(500);
            return Error(req,res,error);
        }
    };

    const editPayslip=async (req,res)=>{
        const {payslipId}=req.params

        try {
            let response=await Payroll.editPayslip(req.body,payslipId);
            res.json({msg:"Get Payslip Successfully",flag:true,response:response}) 
        } catch (error) {
            console.log(error)
            response.status(500);
            return Error(req,res,error);
        }
    }

    const deletePayslip=async (req,res)=>{
        const {payslipId}=req.params;
        try {
            let response=await Payroll.deletePayslip(payslipId);
            res.json({msg:"Delete Payslip Successfully",flag:true,response:response}) 
        } catch (error) {
            console.log(error)
            response.status(500);
            return Error(req,res,error);
        }
    }

module.exports= {createPayslips,GetPaySlips,updatePayroll,getPayslip,editPayslip,deletePayslip}
