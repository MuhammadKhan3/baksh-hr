const leaveService=require('../services/leave.service');

const createLeave=async (req,res,next)=>{
    const data=req.body;
    console.log(data,req.user)

    try {
        let response=await leaveService.creatLeave(req,data);
        await res.json({msg:"Insert Leave Successfully",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const createLeaveType=async (req,res,next)=>{
    const leaveData=req.body;
    try {
        let response=await leaveService.createLeaveType(req,res,leaveData);
        await res.json({msg:"Leave Type Created Successfully",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const getEmployees=async (req,res,next)=>{
    try {
        let response=await leaveService.getEmployees();
        await res.json({msg:"Fetch Employee Successfully",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const LeaveTypes=async (req,res,next)=>{
    try {
        let response=await leaveService.LeaveTypes();
        await res.json({msg:"Fetch LeaveTypes Successfully",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const RemainingLeave=async (req,res,next)=>{
    const {userId}=req.params;
    try {
        let response=await leaveService.RemainingLeave(userId);
        await res.json({msg:"Remaining Leaves Fetch Successfully",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const LeavesHR=async (req,res,next)=>{
    console.log('leave Hr')
    try {
        let response=await leaveService.LeavesHr();
        await res.json({msg:"Leaves Fetch Successfully",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

module.exports={createLeave,createLeaveType,getEmployees,LeaveTypes,RemainingLeave,LeavesHR};