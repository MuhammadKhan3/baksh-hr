import { Formik, useFormik } from 'formik';
import React, { createRef, useEffect, useState } from 'react'
import Header from '../../../components/header/header'
import Sidebar from '../../../components/sidebar/sidebar'
import { makeStyles } from '@material-ui/core';
import { Box, Button, FormControl} from '@mui/material'
import EmployeLeft from '../components/employeLeft';
import EmployeeRight from '../components/employeeRight';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeThunk from '../../../redux/thunk/employeeThunk';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { adminApi, publicApi } from '../../../axios/axiosData';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import GetEmployeeThunk from '../../../redux/thunk/fetchEmployeeThunk';
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';
import EditEmployeRight from '../components/editEmployee/EditemployeeRight';
import EditEmployeeLeft from '../components/editEmployee/EditemployeLeft';


const useStyles=makeStyles({
  mainContainer:{
    display:'flex',
    flexDirection:'row',
    width:'100%',

  },
  sidebar:{
    width:'25%'
  },
  employee:{
    display:'flex',
    flexDirection:'row',
    padding:'2rem',
    width:'100%'
  },
  // #E1E1E1
  sideBorder:{
    borderRight: '1px solid #E1E1E1;',
    width:'0px',
    height:'auto',
    margin:'0 5vw',
  },
  formikDiv:{
    // display:'flex',
    // flexDirection:'row',
    width:'100%'
  }

})


// const validationSchema = yup.object({
//   email: yup
//     .string('Enter your email')
//     .email('Enter a valid email')
//     .required('Email is required'),
//   password: yup
//     .string('Enter your password')
//     .min(8, 'Password should be of minimum 8 characters length')
//     .required('Password is required'),
// });


const EditEmployee = () => {

  const navigate=useNavigate();
  const [cookies] = useCookies(['token']);
  const classes=useStyles();
  const dispatch=useDispatch();
  const profilePic=useSelector(state=>state.emp.profilePic);
  const nameref=createRef();


  // const accountNumber=useSelector(state=>state.emp.accountNumber);

  const bankId=useSelector(state=>state.emp.bankId);
  const [data,setdata]=useState({
    email: '',
    password:'',
    name:'',
    fatherName:'',
    // profilePic:'',
    dateofJoining:'',
    dob:'',
    gender:'',
    departmentId:'',
    designationId:'',
    contactOne:'',
    contactTwo:'',
    accountholderName:'',
    accountNumber:'',
    branchName:'',
    bankId:'',
    employeeId:'',
    status:'',
    salaryType:'',
    salary:'',
    bloodGroup:'',
    emergencyContact:'',
    kinname:'',
    relation:'',
    relationContact:'',
    localAddress:'',
    permanentAddress:'',
    martialStatus:'',
    nationality:'',
    managerId:'',
  })
  const params= useParams();



 
 


  const validationSchema=yup.object().shape({
    email: yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
      password: yup.string()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .required('Password is required'),
       name:yup.string().min(3,'name greater than 3 ').max(100,'name less than 100').required("name is required"),
       fatherName:yup.string().required("Name is Required").min(3,'fatherName greater than 3').max(100,'less than 100'),
      //  profilePic:yup.object().required('profile pic is required'),
       dateofJoining:yup.date().required('Date of joinining is required'),
       dob:yup.date().required('Date of Birth is required'),
       gender:yup.string().required('Gender is required'),
       departmentId:yup.string().required('Department is required'),
       designationId:yup.string().required('Designation is required'),
       contactOne:yup.string().min(10,'phone or contact greater than 10 ').required('Contact one is required'),
       contactTwo:yup.string().min(10,'phone or contact greater than 10 ').required('Contact two is required'),
       accountholderName:yup.string().min(3,'account holder name greater than 3').required('Account Holder is required'),
       accountNumber:yup.string().min(10,'Account Number greater than 10').required('Account Number is required'),
       branchName:yup.string().min(5,"Branch Name greater than 10").required("Branch Name is required"),
       bankId:yup.string().required('Bank is required'),
       employeeId:yup.string().optional(),
       status:yup.string().required('Status is Required'),
       salaryType:yup.string().required('Salary Type is required'),
       salary:yup.number().required('Salary is Required').positive(),
       bloodGroup:yup.string().required('Blood Group is required'),
       emergencyContact:yup.string().min(10,'phone or contact greater than 10 ').required('Emergency Contact is required'),
       kinname:yup.string().min(3,'name greater than 3 ').max(100,'kin name less than 100').required("kin name is required"),
       relation:yup.string().required('Relation is required'),
       relationContact:yup.string().min(10,'phone or contact greater than 10 ').required('Relation Contact is required'),
       localAddress:yup.string().min(5,"Address greater than").required('Local Address is required'),
       permanentAddress:yup.string().min(5,"Address greater than").required('Permanent is required'),
       martialStatus:yup.string().required('Martial Status is required'),
       nationality:yup.string().required('Nationality is required'),
       managerId:yup.string().required('Manager is required'),
  })
  const formik =useFormik({
    initialValues:{
      email: '',
      password:'',
      name:'',
      fatherName:'',
      profile:'',
      dateofJoining:'',
      dob:'',
      gender:'',
      departmentId:'',
      designationId:'',
      contactOne:'',
      contactTwo:'',
      accountholderName:'',
      accountNumber:'',
      branchName:'',
      bankId:'',
      employeeId:'',
      status:'',
      salaryType:'',
      salary:'',
      bloodGroup:'',
      emergencyContact:'',
      kinname:'',
      relation:'',
      relationContact:'',
      localAddress:'',
      permanentAddress:'',
      martialStatus:'',
      nationality:'',
      managerId:'',
    },
    validateOnBlur:false,
    // enableReinitialize: true,
    validateOnChange:false,
    onSubmit: values => {
      valuHandler(values)
    },
    validationSchema
   });


  useEffect(()=>{
    const {token}=cookies;
    const {employeeId}=params;
    dispatch(EmployeeThunk(token));

    const FetchEmployee=async ()=>{
      console.log(employeeId)
      let response=await  axios.get(publicApi+`/get-employee/${employeeId}`,{
          headers: {
              authorization: `Bearer ${token}`,
          },
      });

      const data=response?.data?.employee;
      console.log(data)
      let {name,password,email,
        fatherName,profilePhoto,
        contactOne,contactTwo,
        dob,
        employee_company:{
         managerId,
         dateofJoining,
         departmentId, 
         designationId,
        },
        localAddress,
        kinname,
        gender,
        kinPhone,
        nationality,
        permanentAddress,
        martialStatus,
        relation,
        employee_bank:{
         holderName,
         accountNumber,
         bankId,
         branch,
         salaryType,
         salary,
        },
        emergencyContact,
        user:{
         status
        },
        bloodGroup,
       }=data;
            // console.log(data)
            // formik.setFieldValue('name',data?.name)


            formik.setValues({name,email,fatherName,contactOne,contactTwo,
                              localAddress,permanentAddress,nationality,
                              martialStatus,accountholderName:holderName,
                              accountNumber:accountNumber,bankId,branchName:branch,
                              employeeId,departmentId,designationId,
                              status,managerId,salary,salaryType,bloodGroup,emergencyContact,
                              kinname,relation,relationContact:kinPhone,password,gender,
                              dob:dayjs(dob),dateofJoining:dayjs(dateofJoining),
                              profile:profilePhoto?.filename
                            })
    }
    FetchEmployee();
  },[])

 

  const valuHandler=(values)=>{
    console.log(values)
      const token=cookies.token;
      console.log(bankId)
      let formData = new FormData();    
      formData.append('name', values.name);   
      formData.append('fatherName', values.fatherName);
      formData.append('employeePhoto',profilePic)
      formData.append('dob',values.dob)
      formData.append('dateofJoining',values.dateofJoining)
      formData.append('gender',values.gender);
      formData.append('departmentId',values.departmentId);
      formData.append('designationId',values.designationId);
      formData.append('contactOne',values.contactOne);
      formData.append('contactTwo',values.contactTwo)
      formData.append('holderName',values.accountholderName)
      formData.append('localAddress',values.localAddress)
      formData.append('nationality',values.nationality)
      formData.append('permanentAddress',values.permanentAddress)
      formData.append('martialStatus',values.martialStatus);
      formData.append('status',values.status);
      formData.append('email',values.email);
      formData.append('password',values.password);
      formData.append('bloodGroup',values.bloodGroup);
      formData.append('managerId',values.managerId);
      formData.append('employeePhoto',profilePic)
      formData.append('accountNumber',values.accountNumber)
      formData.append('bankId',values.bankId);
      formData.append('branch',values.branchName);
      formData.append('relation',values.relation);
      formData.append('emergencyContact',values.emergencyContact);
      formData.append('kinname',values.kinname);
      formData.append('salaryType',values.salaryType);
      formData.append('salary',values.salary);
      formData.append('kinPhone',values.relationContact);
      formData.append('employeeId',values.employeeId);


      axios.put(adminApi+'/edit-employee',formData,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response)=>{
        // navigate('/manage-employees')
      })


      // alert(`
      // name:${name} 
      // \ fatherName:${fatherName} 
      // \ profilePic:${profilePic}
      // \ dob:${dob}
      // \ dateofJoining:${dateofJoining}
      // \ gender:${gender}
      // \ departmentId:${departmentId}
      // \ designationId:${designationId}
      // \ contactOne:${contactOne}
      // \ contactTwo:${contactTwo}
      // \ accountholderName:${accountholderName}
      // \ accountNumber:${accountNumber}
      // \ bankId:${bankId}
      // \ branchName:${branchName}
      // \ salaryType:${salaryType}
      // \ salary:${salary}
      // \ bloodGroup:${bloodGroup}
      // \ status:${status}
      // \ employeeId:${employeeId}
      // \ emergencyContact:${emergencyContact}
      // \ kinname:${kinname}
      // \ relation:${relation}
      // \ relationContact:${relationContact}
      // \ localAddress:${localAddress}
      // \ permanentAddress:${permanentAddress}
      // \ martialStatus:${martialStatus}
      // \ nationality:${nationality}
      // `)
  }


  return (
    <Box component='div' className={classes.mainContainer}>
        <Box component='div' className={classes.sidebar}>
            <Sidebar/>
        </Box>
        <Box component='div'>
            <Header heading="Edit Employee"/>
            {/* <Box component='section' > */}
  
            {/* <Formik
                initialValues={{
                  ...initialValues
                }}
                validateOnMount={true}
                validationSchema={validationSchema}
                // validateOnChange={false}
                // validateOnBlur={false}
                className={classes.formikDiv}
                onSubmit={(values) => {
                  console.log('hit....')
                  // console.log('hitt....',values)
                  // submitHandler();
                }}
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize={true}
            >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              isValid,
              dirty,
              touched,
              values
            }) => (
              <> */}
              <FormControl
              >
                {/* <input
                    type='text'
                    name='name'
                    placeholder='enter the name'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                /> */}

                <Box 
                  component='div'
                  className={classes.employee}
                >
                  <EditEmployeeLeft
                    setFieldValue={formik.setFieldValue}
                    errors={formik.errors}
                    handleBlur={formik.handleBlur}
                    handleChange={formik.handleChange}
                    isSubmitting={formik.isSubmitting}
                    isValid={formik.isValid}
                    touched={formik.touched}
                    values={formik.values}
                  />
                  <Box component='hr' className={classes.sideBorder}></Box>
                    <EditEmployeRight 
                    // submitHandler={submitHandler} 
                      errors={formik.errors}
                      formik={formik}
                      handleBlur={formik.handleBlur}
                      handleChange={formik.handleChange}
                      handleSubmit={formik.handleSubmit}
                      isSubmitting={formik.isSubmitting}
                      isValid={formik.isValid}
                      touched={formik.touched}
                      values={formik.values}
                    />
                </Box>

              </FormControl>
              {/* </>
              )}
            </Formik> */}
            {/* </Box> */}

        </Box>
    </Box>
  )
}

export default EditEmployee