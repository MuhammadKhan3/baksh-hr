const Payroll = require("../models/payroll");


    const createPayroll = async(req,res) => {
        console.log("Payroll created sucessfully")
                 
        try {
            const response=await Payroll.createPayroll(req,res,req.body);
            res.json({msg:"Employee Successfully Created",flag:true,response:response}) 
        } catch (error) {
            console.log(error)
            response.status(500);
            return Error(req,res,error);
        }
    };


    const getPayroll = async(req,res) => {
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
    

    const deletePayroll = async(req,res) => {
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

    module.exports= {createPayroll,getPayroll,updatePayroll,deletePayroll}
