const express=require('express')
const router=express.Router();
const adminController=require('../controllers/admin.controller');
const managerController=require('../controllers/manager.controller');
const department=require('../controllers/department.controller')
const { multerUpload } = require('../middleware/multer');
const isAuth=require('../middleware/authorize')
const EmployeeController=require('../controllers/employee.controller');
const payroll = require ('../controllers/payroll.controller');
const {getDepartment} =require('../controllers/department.controller');

const {validRole,validUser,validManager, validEditManager, validEmployee, permission}=require('../validations/validations');
const { getDesignations } = require('../controllers/department.controller');
const Permission= require('../validations/permissions');
const { createLeaveType, getEmployees, LeaveTypes, createLeave, RemainingLeave } = require('../controllers/leave.controller');

// Admin Controller
router.post('/',adminController.createAdmin);
router.post('/insert-role',validRole,adminController.insertRole);
router.post('/create-admin',validUser,adminController.signup);

// Manager

// Create Manager
router.post('/create-manager',
isAuth,
// (req, res, next) => {Permission.hasPermission(req, res, next, {'employee':'add'})},
multerUpload.single('managerPhoto'),
validManager,
managerController.createManager);
// Edit Manager


router.put('/create-manager',isAuth,
(req, res, next) => {Permission.hasPermission(req, res, next, {'employee':'edit'})},
multerUpload.single('managerPhoto'),validEditManager,managerController.editManager);
// Get the Bulk of Managers
router.post('/get-managers',
isAuth,
managerController.getManagers);
// Get the Single Manager
router.get('/get-manager/:userId',
isAuth,
(req, res, next) => {Permission.hasPermission(req, res, next, {'employee':'view'})},
managerController.getManager);

// Get Manager list for drop down
router.get('/get-managersList',managerController.getManagersList);

// Delete Manager
router.delete('/delete-manager/:userId',isAuth,managerController.deleteManager);


// Departments

// Create the deparment
// isAuth
router.post('/department',isAuth,department.createDepartment);

router.get('/department',getDepartment);

router.get('/designation/:id',getDesignations);



// Create Employee

router.post('/create-employee',isAuth,multerUpload.single('employeePhoto'),validEmployee,EmployeeController.createEmployee);
// Edit Employee
router.put('/edit-employee',multerUpload.single('employeePhoto'),EmployeeController.editEmployee);
//Get Employees
router.get('/get-employees',EmployeeController.getEmployees);
// Search Employees
router.post('/search-employees',EmployeeController.searchEmployees);
router.delete('/delete-employee',EmployeeController.deleteEmployee);




router.get('/salaryTypes',EmployeeController.salaryTypes);
router.get('/view-attendance-current', adminController.viewCurrentlyMarkedAttendance);
router.put('/Employee/viewAttendance', adminController.viewAttendanceSheet);

//Payroll Controllers
router.put('/edit-payroll:/id', payroll.updatePayroll);
router.get('/get-payroll', payroll.getPayroll);
router.post('/create-payroll', payroll.getPayroll);
router.delete('/delete-payroll:/id', payroll.deletePayroll);

// Leave Controller
router.post('/add-leave',isAuth,createLeave);
router.post('/add-leaveType',isAuth,createLeaveType);

router.get('/leaveType',isAuth,LeaveTypes)
router.get('/get-employees-leave',isAuth,getEmployees)
router.get('/get-remaining-leave/:userId',isAuth,RemainingLeave)



module.exports=router;