const leaveService=require('../services/leave.service');

const createLeave=async (req,res,next)=>{
    const data=req.body;

    try {
        let response=await leaveService.creatLeave(data);
        await res.json({msg:"Search Employee Successfully",flag:true,employees:response})
    } catch (error) {
        return Error(req,res,error);
    }

}

module.exports={createLeave};