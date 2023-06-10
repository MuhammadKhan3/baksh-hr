const AllowanceService=require('../services/allowance.service')
const createAllowance=async(req,res,next)=>{
    const {allowances}=req.body;
    console.log(allowances);
    const response=await AllowanceService.CreateOrUpdate(allowances)
    res.json({msg:response,flag:true})
}

const getAllowances=async (req,res,next)=>{
    try {
        const response=await AllowanceService.getAllowance()
        res.json({msg:"Successfully Fetched",flag:true,allowances:response})
    } catch (error) {
        console.log(error)
        return Error(req,res,error);
    }
}

module.exports={createAllowance,getAllowances}