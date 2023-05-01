const jwt=require('jsonwebtoken');
const User = require('../models/user');
const {Op} =require('sequelize');
const Permission = require('../models/permission');
const Role = require('../models/role');

module.exports=async (req,res,next)=>{
  try {
       console.log('',req?.headers?.authorization);
        if(!req?.headers?.authorization){
          res.status(401).json({msg:'You are not Valid',flag:false})
        }
        const token = req?.headers?.authorization.split(' ')[1];
        const secret= process.env.secretKey;
        const decodedToken =await jwt.verify(token, secret);
        if(Object.keys(decodedToken).length>0){
          console.log("dec")
          const userId = decodedToken.userId;
          const email = decodedToken.email;
          console.log(userId,email)
          try {            
          const response=await User.findOne({where:{[Op.and]:[{id:userId},{email:email}]},include:[{model:Role}]});
          console.log(response)
          if (response===null) {
              res.status(401).json({msg:'You are not authorize',flag:false})
          } else {
            req.user=response;
            next();
          }
          } catch (error) {
              
          }

        }
      } catch {
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
}