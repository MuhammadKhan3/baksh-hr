const jwt=require('jsonwebtoken');
const User = require('../models/user');
const {Op} =require('sequelize');
const Permission = require('../models/permission');
const Role = require('../models/role');
const Offices = require('../models/offices');

module.exports=async (req,res,next)=>{
  try {
       console.log('decodeToken')

        if(!req?.headers?.authorization){
          res.status(401).json({msg:'You are not Valid',flag:false})
        }
        const token = req?.headers?.authorization.split(' ')[1];
        const secret= process.env.secretKey;
       console.log('secret',secret,token)
        const decodedToken =await jwt.verify(token, secret);

        if(Object.keys(decodedToken).length>0){
          const userId = decodedToken.userId;
          const email = decodedToken.email;
          try { 
                     
            // 
          let response=await User.findOne({where:{[Op.and]:[{id:userId},{email:email}]},include:[{model:Role},{model:Offices,as:'office'}]});
          if (response===null) {
              res.status(401).json({msg:'You are not authorize',flag:false})
          } else {
            req.user=response;
            // req.office=officeData;
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