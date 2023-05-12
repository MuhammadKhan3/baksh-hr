const Company=require('../services/company.service');

const createCompany=async (req,res,next)=>{
    try {
        const response=await Company.createCompany(req);
        res.json({msg:response,flag:true})
    } catch (error) {
        return Error(req,res,error);
    }
}

const getHr=async (req,res,next)=>{
    try {
        const response=await Company.getHr();
        res.json({msg:"Fetch  Company Succefully",flag:true,hrs:response})

        console.log(response)
    } catch (error) {
        return Error(req,res,error);
    }
}

module.exports={createCompany,getHr}