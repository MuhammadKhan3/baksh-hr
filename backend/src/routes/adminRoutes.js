const express=require('express')
const router=express.Router();
const adminController=require('../controllers/admin.controller');
const managerController=require('../controllers/manager.controller');
const department=require('../controllers/department.controller')
const { multerUpload, CsvMulterUpload, companyUpload } = require('../middleware/multer');
const isAuth=require('../middleware/authorize')
const EmployeeController=require('../controllers/employee.controller');
const payroll = require ('../controllers/payroll.controller');
const {getDepartment} =require('../controllers/department.controller');
const {validRole,validUser,validManager, validEditManager, validEmployee, permission}=require('../validations/validations');
const { getDesignations } = require('../controllers/department.controller');
const Permission= require('../validations/permissions');
const { createLeaveType, getEmployees, LeaveTypes, createLeave, RemainingLeave, LeavesEmployee, LeavesManager, LeaveApproval, LeavesEmployeeHR, getLeave, editLeave } = require('../controllers/leave.controller');
const { createAttendanceCsv, AttendaceReport, attendanceSchedule, AttencdanceEmployee } = require('../controllers/attendance.controller');
const { getAttendance } = require('../controllers/attendance.controller');
const companyController = require('../controllers/company.controller');
const allowanceController=require('../controllers/allowance.controller');
const payrollController=require('../controllers/payroll.controller')
// const { createCompany } = require('../services/company.service');
const {getHr,createCompany} =require('../controllers/company.controller')
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
// validManager,
managerController.createManager);
// Edit Manager


router.put('/edit-manager/:userId',isAuth,multerUpload.single('managerPhoto'),managerController.editManager);
// Get the Bulk of Managers
router.post('/get-managers',
isAuth,
managerController.getManagers);
// Get the Single Manager
router.get('/get-manager/:userId',
isAuth,
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
// Get Manager Employees
router.get('/get-manager-employees',isAuth,EmployeeController.getManagerEmployees);
// Search Employees
router.post('/search-employees',EmployeeController.searchEmployees);
router.delete('/delete-employee',EmployeeController.deleteEmployee);




router.get('/salaryTypes',EmployeeController.salaryTypes);
router.post('/create-attencdance-csv',CsvMulterUpload.single('file'),createAttendanceCsv);
router.get('/get-attendances',getAttendance)
router.get('/attendance-report',AttendaceReport)
router.get('/view-attendance-employee/:userId',isAuth,AttencdanceEmployee)

router.get('/attendance-schedule',attendanceSchedule)

// router.put('/Employee/viewAttendance', adminController.viewAttendanceSheet);


// //All Attendace routes
// router.post('/attendance/create-attendance',EmployeeController.markEmployeeAttendance);
// router.put('/attendance/edit-attendance/:UserId',AttendanceController.editAttendance);
// router.delete('/delete-attendance/:UserId',AttendanceController.deleteAttendnace);

// //Attendace routes for admin
// router.put('/edit-attendance/:UserId',adminController.editAttendance);
// router.delete('/delete-attendance/:UserId',adminController.deleteAttendnace);
// //Attendace routes for Employee
// router.get('/attendance/markeAttendance',EmployeeController.markEmployeeAttendance);
// router.post('/attendance/view-attendance',EmployeeController.viewCurrentlyMarkedAttendance);


//Payroll Controllers
// router.put('/edit-payroll:/id', payroll.updatePayroll);
// router.get('/get-payroll', payroll.getPayroll);
// router.post('/create-payroll', payroll.getPayroll);
// router.delete('/delete-payroll:/id', payroll.deletePayroll);

// Leave Controller
router.post('/add-leave',isAuth,createLeave);
router.post('/add-leaveType',isAuth,createLeaveType);
// Leave Type Get for create leave
router.get('/leaveType',isAuth,LeaveTypes)
// Get the employees leave in employee
router.get('/get-employees-leave',isAuth,getEmployees)
// Get the Remaining Leaves of employees
router.get('/get-remaining-leave/:userId',isAuth,RemainingLeave)

router.get('/get-leaves-Employees-hr',isAuth,LeavesEmployeeHR);

// Manger get the employees Leave data
router.get('/get-leaves-employee',isAuth,LeavesEmployee)
router.get('/get-leaves-manager',isAuth,LeavesManager)
// Approve Leave by manager
router.post('/leave-approval',isAuth,LeaveApproval);
// Get Leave 
router.get('/leave/:id',isAuth,getLeave)
// Edit Leave
router.put('/edit-leave/:id',isAuth,editLeave)

// Company Controller
router.post('/create-company',companyUpload.single('picture'),createCompany);
router.get('/get-Hr',getHr);
router.get('/get-offices',companyController.GetOffices);
router.get('/get-company',companyController.GetCompany);

// Allowances Controller
router.post('/allowances',allowanceController.createAllowance);
router.get('/allowances',allowanceController.getAllowances);

// Payroll Controller
router.post('/create-payslips',payrollController.createPayslips)
router.put('/edit/:payslipId',payrollController.editPayslip)

router.get('/get-payslips',isAuth,payrollController.GetPaySlips)
router.get('/payslip/:payslipId',payrollController.getPayslip)
router.delete('/payslip/:payslipId',payrollController.deletePayslip);



module.exports=router;