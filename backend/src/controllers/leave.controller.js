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

const LeavesEmployeeHR=async (req,res,next)=>{
    const query=req.query;
     try {
        let response=await leaveService.LeavesEmployeesHr(query);
        await res.json({msg:"Leaves Fetch Successfully",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const LeavesEmployee=async (req,res,next)=>{
    const query=req.query;
    try {
        let response=await leaveService.LeavesEmployee(query,req.user.id);
        await res.json({msg:"Leaves Fetch Successfully",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const LeavesManager=async(req,res,next)=>{
    const query=req?.query;
    const managerId=req?.user?.managerData?.id;
    try {
        let response=await leaveService.LeavesEmployeesManager(query,managerId);
        await res.json({msg:"Leaves Fetch Successfully",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

// const LeavesEmployeesHr=async (req,res,next)=>{
//     const query=req?.query;
//     try {
//         let response=await leaveService.LeavesEmployeesHr(query);
//         await res.json({msg:"Employees Fetch Successfully",flag:true,response:response})
//     } catch (error) {
//         return Error(req,res,error);
//     }
// }

const LeaveApproval=async (req,res,next)=>{
    console.log('hit...')
    const managerId=req?.user?.managerData?.id;
    const user=req?.user

    const {leaveId,status}=req.body;
    try {
        let response=await leaveService.LeaveApproval(leaveId,status);
        await res.json({msg:"Insert Status Succefully",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }
}


const getLeave=async (req,res,next)=>{
    const params=req.params;
    try {
        let response=await leaveService.getLeave(params);
        await res.json({msg:"Leave Get Succefully",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }
}

const editLeave=async (req,res,next)=>{
    const params=req.params;
    const data=req.body;
    try {
        let response=await leaveService.editLeave(data,params);
        await res.json({msg:"Edit Leave Succefully",flag:true,response:response})
    } catch (error) {
        return Error(req,res,error);
    }
}



module.exports={createLeave,createLeaveType,getEmployees,LeaveTypes,RemainingLeave,LeavesEmployeeHR,LeavesEmployee,LeavesManager,LeaveApproval,getLeave,editLeave};