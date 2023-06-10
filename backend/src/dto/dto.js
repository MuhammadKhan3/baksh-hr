
const insertRoleDto=(data)=>{
    return{

    }
}

const signupDto=(data)=>{
    return{
        id:data?.id,
        email:data?.email,
        password:data?.password,
        active:data?.active
    }
}

const LoginDto=(data)=>{
    return {
        userId:data?.id,
        email:data?.email,
        active:data?.status,
        role:data?.role?.roleName,
        permission:data?.permission,
        managerId:data?.managerData?.id,
        employeeId:data?.employeeData?.id,
        profile:data?.employeeData?.profilePhoto?.filename
    }
}


const employeesDto=(data)=>{
    console.log(data)
    return {
        name:data?.name,
        email:data?.email,
        id:data?.id,
        status:data?.User?.status
    }
}

const managerDto=async (data)=>{
    console.log(data?.managerData?.phone,data?.managerData?.photo)
    return {
        id:data?.id,
        name:data?.managerData?.name,
        phone:data?.managerData?.phone,
        email:data?.managerData?.email,
        password:'********',
        status:data?.managerData?.status,
        officeId:data?.managerData?.officeId,
        departmentId:data?.managerData?.departmentId,
        picture:data?.managerData?.photo
    }
}

const getPaySlipDto=async (data)=>{
    return {
        id:data?.id,
        leaves:data?.leaves,
        salary:data?.salary,
        name:data?.employee?.name,
        allowances:data?.allowances?.map((allowance)=>{
            return {
                "id": allowance?.id,
                "deduction": allowance?.deduction,
                "allowance":allowance?.allowance,
            }
        })
    }

}
module.exports={insertRoleDto,signupDto,LoginDto,employeesDto,managerDto,getPaySlipDto}