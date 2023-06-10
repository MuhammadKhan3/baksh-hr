const Allowance=require('../models/allowance');

 const  updateOrCreateAllowance=async (data)=>{
    try {
      const [object, created] = await Allowance.findOrCreate({
        where: { id: data.id }, 
        defaults: data, 
      });
  
      if (!created) {
        await object.update(data);
      }
  
      return {object:object,created:created};
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
}
  
const CreateOrUpdate= async (allowances=[])=> {
    try {
      console.log(allowances)
      let updatedObjects = [];
  
      for (const data of allowances) {
         let updatedObject= await updateOrCreateAllowance(data);
         updatedObjects.push(updatedObject)
      }

      console.log(updatedObjects)
      return {msg:"Successfully Inserted",data:updatedObjects}
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
}

const getAllowance=async ()=>{
    const data=await Allowance.findAll({attributes:['id','deduction','allowance']});
    return data;
}

const deleteAllowance=async(data=[])=>{
  
  try {
    // Delete records based on the id field
    const deleteCount = await Allowance.destroy({
      where: {
        id: data
      }
    });

    return deleteCount
  } catch (error) {
    console.error('Error deleting records:', error);
  }
}
  

module.exports={CreateOrUpdate,getAllowance,deleteAllowance}