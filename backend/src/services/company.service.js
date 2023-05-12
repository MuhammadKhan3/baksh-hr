const sequelize=require('../untils/db')
const User=require('../models/user');
const Role = require("../models/role");
const Company=require("../models/companyDetails");
const Offices=require('../models/offices');

const createCompany=async(req)=>{
    try {
        const transaction = await sequelize.transaction();
        const {companyName,phone,email,url,address,offices}=req.body;
        const picture=req.file
        const company=await Company.create({
            companyName,
            phone,
            websiteUrl:url,
            address,
            email,
            picture:picture?.filename
        });

        offices.forEach(data=> {
            Offices.create({
                companyId:company?.id,
                country:data['country'],
                city:data['city'],
                officeCode:data['officeCode'],
                userId:data['userId'],
                address:data['address']
            })
        });

        await transaction.commit();
        return "Record Created Succefully"

    } catch (error) {
        console.error('Transaction rolled back:', error);        
        await transaction.rollback();
        return "Transaction rolled back";
    }

}    

const getHr=()=>{
    const user=User.findAll({attributes:[ 'id',['email','label']], include:{model:Role,attributes:[],where:{roleName: "hr"}}})
    return user
}
module.exports={createCompany,getHr}