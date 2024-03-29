const jwt=require('jsonwebtoken');
const User = require('../models/user');
const {Op} =require('sequelize');
const Permission = require('../models/permission');
const Role = require('../models/role');
const { LoginDto } = require('../dto/dto');
const Employee = require('../models/employee');
const Manager = require('../models/manager');

module.exports=async (req,res,next)=>{
  try {
        if(!req?.headers?.authorization){
          res.status(401).json({msg:'You are not Valid',flag:false})
        }
        const token = req.headers.authorization.split(' ')[1];
        const secret= process.env.secretKey;
        console.log(token)
        if(token==="undefined"){
          return res.status(401).json({msg:'Token not exist',flag:false})
        }
        const decodedToken =await jwt.verify(token, secret);
        console.log('hitt...',decodedToken)

        if(Object.keys(decodedToken).length>0){
          const userId = decodedToken.userId;
          const email = decodedToken.email;
          const response=await User.findOne({where:{[Op.and]:[{id:userId},{email:email}]},include:[{model:Role},{model:Employee,as:'employeeData'},{model:Manager,as:'managerData'}]});
        
          if (response===null) {
              res.status(401).json({msg:'You are not authenticate',flag:false})
          } else {
            const user=await LoginDto(response)
            res.json({status:true,msg:'succefully Autheticate',...user})
          }
        }
      } catch {
        // res.status(401).json({
        //   error: new Error('Invalid request!')
        // });
        res.json({status:true,msg:'succefully Autheticate'})


      }
}