const Company=require('../services/company.service');

const createCompany=async (req,res,next)=>{
    try {
        const response=await Company.companyGateway(req);
        res.json({msg:response,flag:true})
    
    }catch (error) {
        return Error(req,res,error);
    }
}

const getHr=async (req,res,next)=>{
    try {
        const response=await Company.getHr();
        res.json({msg:"Fetch  Company Succefully",flag:true,hrs:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const GetOffices=async (req,res,next)=>{
    try {
        const response=await Company.GetOffices();
        res.json({msg:"Fetch  Offices Succefully",flag:true,offices:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const GetCompany=async (req,res,next)=>{
    try {
        const response=await Company.GetCompany();
        res.json({msg:"Fetch  Company Succefully",flag:true,compaines:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

module.exports={createCompany,getHr,GetOffices,GetCompany}