// const {insertRoleDto,signupDto}=require('../dto/dto');
// const Permission = require('../models/permission');
// const Role=require('../models/role');
// const User = require('../models/user');
// var jwt = require('jsonwebtoken');

const Employee = require("../models/employee");
const Permission = require("../models/permission");
const Role = require("../models/role");
const User = require("../models/user");
var bcrypt = require('bcryptjs');
const EmployeeBank = require("../models/empBank");
const EmployeeCompany = require("../models/empCompany");
const SalaryType = require("../models/salaryType");
const Designation = require("../models/designation");
const Department = require("../models/department");
const { employeesDto } = require("../dto/dto");
const { response } = require("express");
const { Sequelize, Op, where } = require("sequelize");

// const InsertRole=async (roleName)=>{
//     const response=await Role.create({roleName:roleName});
//     return response;
// }


const createEmployee=async (req,res,
    {name,fatherName,dob,gender,contactOne,contactTwo,
    localAddress,nationality,permanentAddress,referenceOne,
    bankId,
    referenceOnePhone,referenceTwo,referenceTwoPhone,martialStatus,
    comment,departmentId,designationId,dateofJoining,email,password,
    managerId,status,bloodGroup,emergencyContact,kinname,relation,
    kinPhone,holderName,accountNumber,bankName,branch,bankCode,
    salaryType,salary,employeeId}
    )=>{
        console.log(name,fatherName,dob,gender,contactOne,contactTwo,
            localAddress,nationality,permanentAddress,martialStatus,
            departmentId,designationId,dateofJoining,email,password,
            managerId,status,bloodGroup,emergencyContact,kinname,relation,
            kinPhone,holderName,accountNumber,bankId,branch,salaryType,salary)
        // var dateofbirth= new Date(dob);

        let modulejson={
            employee:{view:true,add:false,edit:false,delete:false},
            attendance:{view:true,add:false},
            leave:{view:true,add:true,edit:false,delete:false},
            payslip:{view:true,add:false,delete:false},
            perfomance:{view:true,add:true},
            recruitment:{view:true,add:true},
            loan:{view:true,add:true},
            reimbursement:{view:true,add:true,edit:false,delete:false},
            daily:{work:true,notification:true,quote:true},
            holidays:{view:true,add:false,edit:false,delete:false},
            setup:{deparment:false,setting:false}
        }

        const role=await Role.findOne({where:{roleName:'employee'}})
        const permission=await Permission.create({
            module:modulejson,
        })
        const salt = await bcrypt.genSalt(10);
        var hash = await bcrypt.hash(password, salt);
        const user=await User.create({
            name:name,
            email:email,
            password:hash,
            status:status,
            roleId:role.id,
            permissionId:permission.id
        })


        const employee=await Employee.create({
            id:employeeId,
            name,
            password,
            email:email,
            fatherName,
            dob:dob,
            gender,
            contactOne,
            contactTwo,
            localAddress,
            nationality,
            permanentAddress,
            martialStatus,
            bloodGroup,
            emergencyContact,
            kinname,
            relation,
            kinPhone,
            holderName,
            accountNumber,
            bankName,
            branch,
            bankCode,
            profilePhoto:req.file,
            userId:user.id,
            createId:req.user.id,
        })
        // 

        const employeeBank=await EmployeeBank.create({
            holderName,
            accountNumber,
            bankId:bankId,
            branch,
            salaryType,
            salary,
            employeeId:employee.id,
        })

        const employeeCompany=await EmployeeCompany.create({
            managerId:managerId,
            dateofJoining,
            status:status,
            departmentId,
            designationId,
            employeeId:employee.id,
        })

        return employeeCompany;
}

const getEmployee=async (employeeId)=>{
         const employee= await Employee.findOne({where:{id:employeeId},include:[{model:User,as:'user'},{model:EmployeeBank},{model:EmployeeCompany}]})
        return employee;       
 
}

const editEmployee=async (req,res,
    {name,fatherName,dob,gender,contactOne,contactTwo,
    localAddress,nationality,permanentAddress,referenceOne,
    referenceOnePhone,referenceTwo,referenceTwoPhone,martialStatus,
    comment,departmentId,designationId,dateofJoining,email,password,
    managerId,status,bloodGroup,emergencyContact,kinname,relation,
    kinPhone,holderName,accountNumber,bankName,branch,bankCode,
    salaryType,salary,employeeId}
    )=>{

           console.log(status)


            const employee= await Employee.findOne({where:{id:employeeId}})
            employee.gender=gender;
            employee.name=name;
            employee.email=email;
            employee.fatherName=fatherName;
            employee.dob=new Date(dob);
            employee.gender=gender;
            employee.contactOne=contactOne;
            employee.contactTwo=contactTwo;
            employee.localAddress=localAddress;
            employee.nationality=nationality;
            employee.permanentAddress=permanentAddress;
            employee.referenceOne=referenceOne;
            employee.referenceOnePhone=referenceOnePhone;
            employee.referenceTwo=referenceTwo;
            employee.referenceTwoPhone=referenceTwo;
            employee.martialStatus=martialStatus;
            employee.comment=comment;
            employee.bloodGroup=bloodGroup;
            employee.emergencyContact=emergencyContact;
            employee.kinname=kinname;
            employee.relation=relation;
            employee.kinPhone=kinPhone;
            employee.password=password;
            if(req?.file){
                employee.profilePhoto=req.file;
            }
            employee.save();




        // const salt = await bcrypt.genSalt(10);
        // var hash = await bcrypt.hash(password, salt);
        const user=await User.findOne({
            where:{
                id:employee.userId,
            }
        });

        user.name=name;
        user.email=email;
        user.status=status;
        if(user.password!==password){
            const salt = await bcrypt.genSalt(10);
            var hash = await bcrypt.hash(password, salt);
            user.password=hash;
        }
        user.save();





        const employeeBank=await EmployeeBank.findOne({
            where:{
                employeeId:employeeId,
            }
        })

        employeeBank.holderName=holderName;
        employeeBank.accountNumber=accountNumber;
        employeeBank.bankName=bankName;
        employeeBank.branch=branch;
        employeeBank.bankCode=bankCode;
        employeeBank.salaryType=salaryType;
        employeeBank.salary=salary;
        employeeBank.save();

        // console.log(dateofJoining)
        const employeeCompany=await EmployeeCompany.findOne({where:{employeeId:employeeId}});
        employeeCompany.managerId=managerId;
        employeeCompany.dateofJoining=new Date(dateofJoining);
        employeeCompany.status=status;
        employeeCompany.departmentId=departmentId;
        employeeCompany.designationId=designationId;

        


        return employeeCompany.save();
}

const salaryType=async ()=>{
    const salaries=await SalaryType.findAll({
        attributes:['type']
    });
    return salaries;
}

const getEmployees=async ()=>{
    let response=await Employee.findAll({include:[{model:User,as:'user',attributes:['status']},{model:EmployeeCompany,attributes:['departmentId','designationId'],include:[{model:Designation,attributes:['designation']},{model:Department,attributes:['department']}]}],attributes:['name','email','id','profilePhoto']});
    const employees=response.map((data)=>{
        return {id:data.id,name:data?.name,email:data?.email,profile:data?.profilePhoto?.filename,status:data?.user?.status,department:data?.employee_company?.department?.department,designation:data?.employee_company?.designation?.designation}
    })
    return employees;
}

const searchEmployees=async (search)=>{
    let response=await 
        Employee.findAll({
        where:{
            [Op.or]: [
                {name: {[Op.like]:"%"+search+"%"}},
                {email:{[Op.like]:"%"+search+"%"}},
              ]
        },
        include:[{model:User,as:'user',attributes:['status']},{model:EmployeeCompany,attributes:['departmentId','designationId'],include:[{model:Designation,attributes:['designation']},{model:Department,attributes:['department']}]}],attributes:['name','email','id','profilePhoto']});

    const employees=response.map((data)=>{
        return {id:data.id,name:data?.name,email:data?.email,profile:data?.profilePhoto?.filename,status:data?.user?.status,department:data?.employee_company?.department?.department,designation:data?.employee_company?.designation?.designation}
    })
    return employees;
}
const deleteEmployee=async (id)=>{


    let employee=await Employee.findByPk(id)


    let response=User.destroy({
        where:{
            id:employee?.userId,
        }
    })

    employee.destroy();

    response=await EmployeeBank.destroy({
        where:{
            employeeId:id
        }
    })

    response=await EmployeeCompany.destroy({
        where:{
            employeeId:id
        }
    })

    return response;
}

const GetManagerEmployees=async (managerId)=>{
    console.log(managerId)
    let response=await Employee
    .findAll({
        where:{
            '$employee_company.managerId$':managerId,
        },
        include:[{model:User,as:'user',attributes:['status']},{model:EmployeeCompany,attributes:['departmentId','managerId','designationId'],include:[{model:Designation,attributes:['designation']},{model:Department,attributes:['department']}]}],
        attributes:['name','email','id','profilePhoto'],
    });
    const employees=response.map((data)=>{
        return {id:data.id,name:data?.name,email:data?.email,profile:data?.profilePhoto?.filename,status:data?.user?.status,department:data?.employee_company?.department?.department,designation:data?.employee_company?.designation?.designation}
    })
    return employees;
}

module.exports={createEmployee,editEmployee,salaryType,getEmployee,getEmployees,searchEmployees,deleteEmployee,GetManagerEmployees};