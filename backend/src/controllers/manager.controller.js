const Manager=require('../services/manager.service')
const {Error}=require('../helpers/helper');
const Offices = require('../models/offices');

exports.createManager=async (req,res,next)=>{
    // const {name,phone,email,password,status,module,officeCode }=req.body;


    try {
        const response=await Manager.createManager(req,res,req.file,req.body);
        res.json({msg:response,flag:true})

    } catch (error) {
        return Error(req,res,error);
    }
}


exports.editManager=async (req,res,next)=>{
    try {
        const response=await Manager.editManager(req.body,req.params);
        res.json({msg:"Manager Successfully Edit",flag:true,response:response})
    } catch (error) {
         return Error(req,res,error);
    }
}


exports.getManagers=async (req,res,next)=>{
    const {page,limit}=req.body
    const {search}=req.query;
    console.log(search)

    try {
        const response=await Manager.getManagers(search,req,limit,page);
        res.json({msg:"Manager Successfully Fetched",flag:true,managers:response})
    } catch (error) {

         return Error(req,res,error);
    }
}

exports.getManager=async (req,res,next)=>{
    const {userId}=req.params;
    console.log(userId)
    try {
        const response=await Manager.getManager(userId);
        res.json({msg:"Manager Successfully Fetch",flag:true,manager:response});
    } catch (error) {
        return Error(req,res,error);
    }
}


exports.deleteManager=async (req,res,next)=>{
    const {userId}=req.params;

    try {
        console.log(userId)
        const response=await Manager.deleteManager(userId);
        res.json({msg:"Manager Deleted",flag:true});
    } catch (error) {
        return Error(req,res,error);
    }
}


exports.getManagersList=async (req,res,next)=>{
    try {
        const response=await Manager.getManagersList();
        res.json({msg:"Manager Deleted",flag:true,managers:response});
    } catch (error) {
        return Error(req,res,error);
    }
}