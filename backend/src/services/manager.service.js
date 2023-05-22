const {insertRoleDto,signupDto, managerDto}=require('../dto/dto');
const Permission = require('../models/permission');
const Role=require('../models/role');
const User = require('../models/user');
var bcrypt = require('bcryptjs');
const Manager = require('../models/manager');
const sequelize=require('../untils/db');
const {Op}=require('sequelize');
const Offices = require('../models/offices');
const Department = require('../models/department');


const createManager=async (req,res,photo,{name,phone,email,password,status,officeId,departmentId})=>{
    const transaction = await sequelize.transaction();
    
    console.log(photo,name,phone,email,password,status,departmentId)
           const roles=await Role.findOne({where:{roleName:'manager'}});
            const permission=await Permission.create({
                    module:[],
                    active:true,
            },{transaction})
            var hash = bcrypt.hashSync(password, 8);        
            try{
                const user=await User.create({
                        email:email,
                        name:name,
                        permissionId:permission.id,
                        password:hash,
                        roleId:roles?.id,
                        status:status,
                },{transaction})
                const manager=await Manager.create({
                    name:name,
                    email:email,
                    status:status,
                    phone:phone,
                    photo:photo?.filename,
                    userId:user?.id,
                    createId:req?.user?.id,
                    officeId:officeId,
                    departmentId:departmentId
                },{transaction})

                await transaction.commit(); 
                return "Manager Successfully Created";

            } catch (error) {
                console.log(error);                
                if(transaction) {
                    await transaction.rollback();
                    Error(req,res,error.message,500)
                }
            }
            
}


const editManager=async ({name,phone,email,password,status,officeId,departmentId},{userId},photo)=>{
    console.log(userId)

    const user=await User.findOne({where:{id:userId}})
    user.name=name;
    user.email=email;
    user.status=status;
    if(password!=='********'){
        console.log('chnage password')
        let hash =await bcrypt.hashSync(password, 8);
        user.password=hash;
    }
    const manager=await Manager.findOne({where:{userId:userId}});
    manager.phone=phone;
    manager.status=status;
    manager.email=email;
    manager.name=name;
    manager.departmentId=departmentId;
    manager.officeId=officeId;
    if(photo){
        manager.photo=photo;
    }    
    manager.save();
    user.save();

    //     let user={};
    //     const roles=await Role.findOne({where:{roleName:'manager'}});
    //     var uexist= await User.findOne({where:{[Op.and]:[{id:userId},{password:password}]}});
        
    //     user=await User.findOne({where:{email:email}})                 
    //     if(uexist){
    //         user.email=email;
    //         user.password=password;
    //         user.status= status;
    //     }else{    
    //         user.email=email;
    //         user.password=hash;
    //         user.status= status;
    //     }
    //     await user.save()
        

    //     const permission=await Permission.findOne({where:{id:user.id}});             
    //           permission.module=module,
    //           permission.save();


    //         const manager=await Manager.findOne({where:{userId:user?.id}})
    //         manager.name=name;
    //         manager.email=email;
    //         manager.status=status;
    //         manager.phone=phone;

    //         await manager.save();
    // return manager ;
}


const getManagers=async (search='',req,page=1)=>{
    const limit=6;
    console.log('iu,,',)
    const officeCode=req.user?.office?.officeCode;
    try {
        const response = await Manager.findAll({
            where:{
              deletedAt:null,
              name:{
                    [Op.like]: `%${search}%`
              }
            },
            include:[
                {model:User,as:'userData'},
                {model:Department},
                {
                    model:Offices,
                    where:{
                        officeCode:officeCode
                    }
                }
            ],
            limit:limit
        })
        const users=response.map((data)=>{
            return {id:data?.userData?.id,department:data?.department?.department,name:data?.name,email:data?.userData?.email,officeCode:data?.office?.officeCode,status:data?.userData?.status}
        })
        return users
        
    } catch (error) {
        console.log(error)        
    }
    //     // where: { deletedAt: null },
    //     // include: [{ model: User ,as:'managerData'}]
    // });
    // console.log(response)
    return response;
}


const getManagersList=async (req)=>{
    // where:{deletedAt:null},
    console.log(req)
    const response=await Manager.findAll({attributes:['id',['name','label']]});
    console.log(response)
    return response;
}

const getManager=async(userId)=>{
    const user=await User.findOne({where:{id:userId},
        include:[{
            model:Manager,
            as:'managerData',
            // include:[{model:Offices}]
        }]
    });
    const data=await managerDto(user);
    return data;
}


const deleteManager=async(userId)=>{
    // const user=await User.findOne({where:{id:userId}});
    // const manager=await Manager.findOne({where:{id:user?.id}});
    
    const user=await User.destroy({
        where: { id: userId }
    });
    const manager=await Manager.destroy({
        where: { userId: userId }
    });

    return manager;
}

module.exports={createManager,editManager,getManagers,getManager,deleteManager,getManagersList};