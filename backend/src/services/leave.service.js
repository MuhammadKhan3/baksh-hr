const Employee = require("../models/employee")
const Leave = require("../models/leave")

const creatLeave=async ({userId,leaveType,startDate,endDate,reason})=>{
    const response=await Leave.create({
        userId:userId,
        leaveType:leaveType,
        startDate:startDate,
        endDate:endDate,
        reason:reason
    })

    return response;
}

module.exports={creatLeave}