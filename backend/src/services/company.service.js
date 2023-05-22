const sequelize=require('../untils/db')
const User=require('../models/user');
const Role = require("../models/role");
const Company=require("../models/companyDetails");
const Offices=require('../models/offices');
const companyDetails = require('../models/companyDetails');


const companyGateway=(req)=>{
    const {companyId}=req.body;
    if(companyId==='null'){
        createCompany(req);
    }else{
        editCompany(req);
    }
}
const createCompany=async(req)=>{
   
    try {
        const transaction = await sequelize.transaction();
        const {companyName,phone,email,url,address,offices}=req.body;

        const picture=req.file
        console.log(companyName,phone,email,url,address,offices,picture)
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

const editCompany=(req)=>{
    const {companyId,companyName,phone,email,url,address,offices}=req.body;
    console.log(offices)
    companyDetails.update({companyName,phone,websiteUrl:url,address,email}, {
        where: {
          id:companyId
        }
    });

    offices.forEach(data=> {
        Offices.findOne({
            where:{
                id:data?.id
            }

        })
        .then((office)=>{
            if(office===null){
                Offices.create({
                    companyId:companyId,
                    country:office['country'],
                    city:office['city'],
                    officeCode:office['officeCode'],
                    userId:office['userId'],
                    address:office['address']
                })

            }else{
                try {
                    console.log(office['country'],office['city'],office['officeCode'],office['userId'],office['address'])
                    office.update({
                        country:data['country'],
                        city:data['city'],
                        officeCode:data['officeCode'],
                        userId:data['userId'],
                        address:data['address'],
                    })
                    .then((o)=>{
                        console.log(o)
                    })                    
                } catch (error) {
                    console.log(error)
                }
                // office.country = office['country'];
                // office.save();
                // office.city = office['city'];
                // office.officeCode =office['officeCode'];
                // office.userId=office['userId']
                // office.address=office['address']
                // console.log(office.address)
            }
        })
    });
}

const getHr=()=>{
    const user=User.findAll({attributes:[ 'id',['email','label']], include:{model:Role,attributes:[],where:{roleName: "hr"}}})
    return user
}

const GetOffices=()=>{
    const response=Offices.findAll({attributes:['id',['officeCode','label']]});
    return response;
}

const GetCompany=()=>{
    const response=companyDetails.findOne({
       include:[{model:Offices,as:'companyBy',
       separate: true,
       order: [
        ['id', 'ASC'],
        ['officeCode', 'ASC'],
       ],
       attributes:['id','address','country','city','officeCode','userId']
    }]});
    return response;
}

module.exports={createCompany,getHr,GetOffices,GetCompany,companyGateway}