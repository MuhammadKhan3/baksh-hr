const {insertRoleDto,signupDto}=require('../dto/dto');
const Permission = require('../models/permission');
const Role=require('../models/role');
const User = require('../models/user');
var bcrypt = require('bcryptjs');
const Manager = require('../models/manager');
const sequelize=require('../untils/db');
const {Op}=require('sequelize');


const createManager=async (req,res,photo,name,phone,email,password,status,module,userId)=>{
    const transaction = await sequelize.transaction();
    
    console.log(photo,name,phone,email,password,status,module,userId)
           const roles=await Role.findOne({where:{roleName:'manager'}});
            const permission=await Permission.create({
                    module:module,
                    active:true,
            },{transaction})
            var hash = bcrypt.hashSync(password, 8);        
            try{
                const user=await User.create({
                        email:email,
                        name:name,
                        password:hash,
                        permissionId:permission?.id,
                        roleId:roles?.id,
                        status:status,
                },{transaction})
                const manager=await Manager.create({
                    name:name,
                    email:email,
                    status:status,
                    phone:phone,
                    photo:photo,
                    userId:user?.id,
                    createId:req?.user?.id
                },{transaction})

                await transaction.commit(); 
                return manager;

            } catch (error) {
                console.log(error);                
                if(transaction) {
                    await transaction.rollback();
                    Error(req,res,error.message,500)
                }
            }
            


}


const editManager=async (photo,name,phone,email,password,status,module,userId)=>{
        let user={};
        const roles=await Role.findOne({where:{roleName:'manager'}});
        var uexist= await User.findOne({where:{[Op.and]:[{id:userId},{password:password}]}});
        
        user=await User.findOne({where:{email:email}})                 
        if(uexist){
            user.email=email;
            user.password=password;
            user.status= status;
        }else{    
            var hash =await bcrypt.hashSync(password, 8);
            user.email=email;
            user.password=hash;
            user.status= status;
        }
        await user.save()
        

        const permission=await Permission.findOne({where:{id:user.id}});             
              permission.module=module,
              permission.save();


            const manager=await Manager.findOne({where:{userId:user?.id}})
            manager.name=name;
            manager.email=email;
            manager.status=status;
            manager.phone=phone;
            if(photo){
                manager.photo=photo;
            }
            await manager.save();
    return manager ;
}


const getManagers=async (offset=0,limit=10,page=1)=>{
    const response=await Manager.findAll({where:{deletedAt:null}},{offset: limit*(page-1),limit: limit*page},{include:User});
    return response;
}


const getManagersList=async ()=>{
    // where:{deletedAt:null},
    const response=await Manager.findAll({attributes:['id',['name','label']]});
    console.log(response)
    return response;
}

const getManager=async(userId)=>{
    const user=await User.findOne({where:{id:userId},include:{model:Manager}});
    return user;
}


const deleteManager=async(userId)=>{
    const user=await User.findOne({where:{id:userId}});
    await user.destroy();
    return user;
}

module.exports={createManager,editManager,getManagers,getManager,deleteManager,getManagersList};