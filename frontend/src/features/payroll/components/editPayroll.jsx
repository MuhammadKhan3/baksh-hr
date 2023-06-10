import React, { useEffect, useState } from "react";
import { InputLabel, Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputText from "../../employee/ui/input";
import DatePickterUi from "../../../components/ui/datePickter";
import ForwardArrow from "../ui/forwardArrow";

import BlackButton from "../ui/blackButton";
import SelectLocalUi from "../../../components/ui/selectLocal";
import axios from "axios";
import { useCookies } from "react-cookie";
import { adminApi } from "../../../axios/axiosData";
import SelectUi from "../../../components/ui/select";
import * as yup from 'yup';
import { useFormik } from "formik";
import {useNavigate, useParams} from "react-router-dom"
import dayjs from "dayjs";
import EditPayrollScale from "../pages/editPayscale";
import Allowances from "./allowances";
// Define styles using makeStyles hook
const useStyles = makeStyles({
  labels: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "12px !important",
    lineHeight: "18px !important",
    letterSpacing: "-0.02em !important",
    color: "#2C2F32 !important",
  },
  btn:{
    width:'20px'
  }
});

const Gender=[
  'male',
  'female'
]

export default function EditPayroll() {
  const classes = useStyles();
  const [cookies]=useCookies(['token'])
  const navigate=useNavigate();
  const params=useParams();
  const [data,setData]=useState({})

  // Declare state variables for form inputs
  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [employees,setEmployees]=useState([]);
  const [leaveType, setLeaveType] = useState([]);
  const [allowances,setAllowances]=useState([])
  const [deleteAllowance,setdeleteAllowance]=useState([])
  

  const validationSchema=yup.object().shape({
    salary:yup.string().optional(),
    name:yup.string().optional(),
    leaves:yup.string().optional(),
  })

  const formik =useFormik({
   initialValues:{
    name:data?.name,
    salary:data?.salary,
    leaves:data?.leaves
   },
   validateOnBlur:false,
   validateOnChange:false,
   enableReinitialize:true,
   onSubmit: values => {
      const token=cookies.token;
      const {payslipId}=params
      console.log(formik.values,allowances)
      axios.put(adminApi+`/edit/${payslipId}`,{
        ...formik.values,
        allowances:allowances,
        deleteAllowance:deleteAllowance
      })
    },
    validationSchema
   })

   console.log(formik.values)

  // Handle input changes and update state accordingly
  const handleChange = (e) => {
  };

  useEffect(()=>{
    const token=cookies.token;
    const {payslipId}=params;

    const fetchEmployee=async ()=>{
        const response=await axios.get(adminApi+`/payslip/${payslipId}`)
        setData(response?.data?.response);
        setAllowances(response?.data?.response?.allowances)
    }
    fetchEmployee();
    const fetchLeave=()=>{
    }
    fetchLeave();

  },[])

  return (
    <Box maxWidth={"460px"}>
      <form onSubmit={formik.handleSubmit}>
        {/* Grid container for form layout */}
        <Grid container direction={"column"} spacing={2}>
          {/* Employee Name */}
          <Grid item>
            <InputLabel className={classes.labels}>Employee Name</InputLabel>
            <InputText
              placeholder="Employee Name"
              name="name"
              error={Boolean(formik.touched.name && formik.errors.name)} 
              helperText={formik.touched.name && formik.errors.name}  
              value={formik.values.name}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item>
            <InputLabel className={classes.labels}>Basic Salary</InputLabel>
            <InputText
              placeholder="Salary"
              name="salary"
              error={Boolean(formik.touched.salary && formik.errors.salary)} 
              helperText={formik.touched.salary && formik.errors.salary}  
              value={formik.values.salary}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item>
            <InputLabel className={classes.labels}>Total Leaves</InputLabel>
            <InputText
              placeholder="Leaves"
              name="leaves"
              error={Boolean(formik.touched.leaves && formik.errors.leaves)} 
              helperText={formik.touched.leaves && formik.errors.leaves}  
              value={formik.values.leaves}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item>
            <Allowances allowances={allowances} setDeleteAllowance={setdeleteAllowance} setAllowances={setAllowances}/>
          </Grid>

          <Grid className={classes.btn} item>
            <BlackButton label="Update" />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}




export function AddLeaveEmployeeCmp() {
  const classes = useStyles();
  const [cookies]=useCookies(['token'])
  const navigate=useNavigate();
  

  // Declare state variables for form inputs
  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [employees,setEmployees]=useState([]);
  const [leaveType, setLeaveType] = useState([]);
  

  const validationSchema=yup.object().shape({
      leaveTypeId: yup.string().required('Leave Id is required'),
      startDate:yup.date().required('Start Date is required'),
      endDate:yup.date().min(yup.ref('startDate'), 'End date must be after start date'),
      reason:yup.string().required('Reason is required')
  })

  const formik =useFormik({
   initialValues:{
    leaveTypeId:'',
    startDate:'',
    endDate:'',
    reason:''
    },
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: values => {
      console.log('hit...')
      const token=cookies.token;
      const userId=cookies.userId;
        axios
        .post(adminApi+'/add-leave',{...values,userId:userId},{
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response)=>{
          navigate('/manage-leave')
          console.log(response?.data?.response)      
          // setEmployees(response?.data?.response)

        })
    },
    validationSchema
   })

  // Handle input changes and update state accordingly
  const handleChange = (e) => {
  };

  useEffect(()=>{
    const token=cookies.token;
    const fetchEmployee=()=>{
      axios
      .get(adminApi+'/get-employees-leave',{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response)=>{
        setEmployees(response?.data?.response)
      })
    }
    fetchEmployee();
    const fetchLeave=()=>{
      axios
      .get(adminApi+'/leaveType',{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response)=>{
        console.log(response)
        setLeaveType(response?.data?.response)
      })
    }
    fetchLeave();

  },[])

  return (
    <Box maxWidth={"460px"}>
      <form onSubmit={formik.handleSubmit}>
        {/* Grid container for form layout */}
        <Grid container direction={"column"} spacing={2}>
          {/* Employee Name */}
          {/* Leave Type */}
          <Grid item>
            <InputLabel className={classes.labels}>Leave Type</InputLabel>
            <SelectUi
                data={leaveType} 
                error={Boolean(formik.touched.leaveTypeId && formik.errors.leaveTypeId)} 
                helperText={formik.touched.leaveTypeId && formik.errors.leaveTypeId}  
                name="leaveTypeId" 
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                placeholder={"Select the Employee"}   
                classes={classes}
            />         
          </Grid>
          {/* Date */}
          <Grid item>
            <InputLabel className={classes.labels}>Date</InputLabel>
            <Grid item container direction={"row"} spacing={2}>
              <Grid item xs={5}>
                {/* Start Date */}
                <DatePickterUi 
                     name="startDate" 
                     placeholder="Start Date"
                     value={formik.values.startDate}
                     error={Boolean(formik.touched.startDate && formik.errors.startDate)} 
                     helperText={formik.touched.startDate && formik.errors.startDate}  
                     handleChange={formik.handleChange}
                     handleBlur={formik.handleBlur} 
                     setFieldValue={formik.setFieldValue} 
                />
              </Grid>
              <Grid item xs={5}>
                {/* End Date */}
                <DatePickterUi 
                       name="endDate" 
                       placeholder="End Date"
                       value={formik.values.endDate}
                       error={Boolean(formik.touched.endDate && formik.errors.endDate)} 
                       helperText={formik.touched.endDate && formik.errors.endDate}  
                       handleChange={formik.handleChange}
                       handleBlur={formik.handleBlur} 
                       setFieldValue={formik.setFieldValue}  
                />
              </Grid>
              <Grid item xs={1}>
                <ForwardArrow />
              </Grid>
            </Grid>
          </Grid>

          {/* Reason */}
          <Grid item>
            <InputLabel className={classes.labels}>Reason</InputLabel>
            <InputText
              placeholder="Add Commment"
              name="reason"
              error={Boolean(formik.touched.reason && formik.errors.reason)} 
              helperText={formik.touched.reason && formik.errors.reason}  
              value={reason}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
            />
          </Grid>

          {/* Submit button */}
          <Grid
            item
            container
            direction={"row"}
            spacing={2}
            justifyContent={"flex-end"}
          >
            <Grid item>
              <BlackButton type={'submit'} label="Submit" />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
