const express=require('express');
const sequelize = require('./src/untils/db');
const User=require('./src/models/user');
const Employee = require('./src/models/employee');
const Role = require('./src/models/role');
const Permission = require('./src/models/permission');
const bodyParser=require('body-parser');
const Manager = require('./src/models/manager');
// .evn file get
require('dotenv').config();

const app=express();

// Routes
const adminRoutes=require('./src/routes/adminRoutes');
const Api=require('./src/routes/apiRoutes');
const Department = require('./src/models/department');
const Designation = require('./src/models/designation');
const EmployeeCompany = require('./src/models/empCompany');
const EmployeeBank = require('./src/models/empBank');
const Bank=require('./src/models/bank');
const cors=require('cors')
const path=require('path')

const version1='v1';
const options={
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE'
}
//Middlewares
app.use(express.static(path.join(__dirname,'./frontend/build')));
app.use(cors(options))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.static(path.join(__dirname,"../frontend/build")))
// app.use(express.urlencoded())
app.use('/',express.static(path.join(__dirname,'uploads', 'employees')))



app.use('/api/admin',adminRoutes)
app.use('/api',Api)

app.use("*",function(req,res){
  res.sendFile(path.join(__dirname,'../frontend/build'))
})

// RelationShips Role and Permissions
Role.hasMany(User,
{
  foreignKey: {
    allowNull: false
  }
});
User.belongsTo(Role);

// RelationShips Role entity and user entity
Permission.hasOne(User,{
  foreignKey: {
    allowNull: false
  }
});
User.belongsTo(Permission);


// Manager Relation with User
User.hasOne(Manager,{foreignKey:'userId',allowNull:false});
Manager.belongsTo(User,{foreignKey: 'userId'})

User.hasMany(Manager,{foreignKey:'createId'})
Manager.belongsTo(User,{foreignKey: 'createId'})


User.hasMany(Department,{foreignKey:'userId'});
Department.belongsTo(User,{foreignKey:'userId'});

Department.hasMany(Designation);
Designation.belongsTo(Department);

Department.hasMany(EmployeeCompany);
EmployeeCompany.belongsTo(Department);

Designation.hasMany(EmployeeCompany);
EmployeeCompany.belongsTo(Designation);

User.hasMany(Employee,{foreignKey:'userId',onDelete:'CASCADE'});
Employee.belongsTo(User,{foreignKey:'userId',as:'user'});

Employee
.hasOne(EmployeeCompany,
{
  onDelete: 'CASCADE',
  hooks:true
});
EmployeeCompany.belongsTo(Employee);

Employee.hasOne(EmployeeBank,{
  onDelete: 'CASCADE',
  hooks:true

});
EmployeeBank.belongsTo(Employee)

User.hasMany(Employee,{
  foreignKey:'createId'
})
Employee.belongsTo(User,{
  foreignKey:'createId',
  as:'creator'
})


Bank.hasMany(EmployeeBank,{foreignKey:'bankId'})
EmployeeBank.hasMany(Bank,{foreignKey:'bankId'})

// My sql database create
sequelize
.sync({alter:true})
.then(() => {
  console.log('Models synchronized successfully.');
})
.catch((error) => {
  console.error('Error synchronizing models:', error);
});


module.exports=app;