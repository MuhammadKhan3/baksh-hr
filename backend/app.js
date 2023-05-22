const express=require('express');
const sequelize = require('./src/untils/db');
const User=require('./src/models/user');
const Employee = require('./src/models/employee');
const Role = require('./src/models/role');
const Permission = require('./src/models/permission');
const bodyParser=require('body-parser');
const Manager = require('./src/models/manager');
const LeaveType=require('./src/models/leaveType')
const Leave=require('./src/models/leave')
const cron = require('node-cron');

// .evn file get
require('dotenv').config();

const app=express();

// Routes
const adminRoutes=require('./src/routes/adminRoutes');
const attendanceRoutes = require ('./src/routes/adminRoutes')
const Api=require('./src/routes/apiRoutes');
const Department = require('./src/models/department');
const Designation = require('./src/models/designation');
const EmployeeCompany = require('./src/models/empCompany');
const EmployeeBank = require('./src/models/empBank');
const Attendance  = require('./src/models/attendance');

const Bank=require('./src/models/bank');
const cors=require('cors')
const path=require('path');
const { attendanceSchedule } = require('./src/services/attendance.service');
const companyDetails = require('./src/models/companyDetails');
const Offices = require('./src/models/offices');

const version1='v1';
const options={
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE'
}
//Middlewares
app.use(express.static(path.join(__dirname,'./frontend/build')));
app.use(cors(options))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
// app.use(express.static(path.join(__dirname,"../frontend/build")))
// app.use(express.urlencoded())
app.use('/',express.static(path.join(__dirname,'uploads', 'employees')))
app.use('/',express.static(path.join(__dirname,'uploads', 'company')))
app.use('/',express.static(path.join(__dirname,'uploads', 'managers')))





app.use('/api/admin',adminRoutes)
app.use('/api/admin', attendanceRoutes);
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
User.hasOne(Manager,{foreignKey:'userId',as:'managerData',onDelete:'CASCADE',allowNull:false});
Manager.belongsTo(User,{foreignKey: 'userId',as:'userData'})

User.hasMany(Manager,{foreignKey:'createId'})
Manager.belongsTo(User,{foreignKey: 'createId'})

Department.hasMany(Manager)
Manager.belongsTo(Department)


User.hasMany(Department,{foreignKey:'userId'});
Department.belongsTo(User,{foreignKey:'userId'});

Department.hasMany(Designation);
Designation.belongsTo(Department);

Department.hasMany(EmployeeCompany);
EmployeeCompany.belongsTo(Department);

Designation.hasMany(EmployeeCompany);
EmployeeCompany.belongsTo(Designation);

User.hasOne(Employee,{foreignKey:'userId',as:'employeeData'});
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


Bank.hasMany(EmployeeBank,{foreignKey:'bankId'});
EmployeeBank.belongsTo(Bank,{foreignKey:'bankId'});


// Users Leaves
User.hasMany(Leave,{foreignKey:'userId',as:'users'});
Leave.belongsTo(User,{foreignKey:'userId',as:'users'});
// My sql database create
LeaveType.hasMany(Leave,{foreignKey:'leaveTypeId'});
Leave.belongsTo(LeaveType,{foreignKey:'leaveTypeId'});

User.hasMany(Leave,{foreignKey:'createId',as:'creator'});
Leave.belongsTo(User,{foreignKey:'createId'});

User.hasMany(Attendance,{foreignKey:'userId',as:'attendances'});
Attendance.belongsTo(User,{foreignKey:'userId'});


User.hasMany(Attendance,{foreignKey:'attendanceById',as:'attendanceBy'});
Attendance.belongsTo(User,{foreignKey:'attendanceById',as:'attendanceBy'});

companyDetails.hasMany(Offices,{foreignKey:'companyId',as:'companyBy'})
Offices.belongsTo(companyDetails,{foreignKey:'companyId',as:'companyBy'});

User.hasOne(Offices,{foreignKey:'userId',as:'office'})
Offices.belongsTo(User,{foreignKey:'userId'})

Offices.hasOne(Manager,{foreignKey:'officeId'})
Manager.belongsTo(Offices)


cron.schedule('0 12 * * *',attendanceSchedule);



sequelize
.sync({alter:true})
.then(() => {
  console.log('Models synchronized successfully.');
})
.catch((error) => {
  console.error('Error synchronizing models:', error);
});


module.exports=app;