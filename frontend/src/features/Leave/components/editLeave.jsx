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
});

const Gender=[
  'male',
  'female'
]

export default function EditLeaveEmployee({leave}) {
  const classes = useStyles();
  const [cookies]=useCookies(['token'])
  const navigate=useNavigate();  

  // Declare state variables for form inputs
  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [employees,setEmployees]=useState([]);
  const [leaveType, setLeaveType] = useState([]);
  const {leaveId}=useParams();

  const validationSchema=yup.object().shape({
      userId: yup.string().required('User Id is required'),
      leaveTypeId: yup.string().required('Leave Id is required'),
      startDate:yup.date().required('Start Date is required'),
      endDate:yup.date().min(yup.ref('startDate'), 'End date must be after start date'),
      reason:yup.string().required('Reason is required')
  })

  const formik =useFormik({
   initialValues:{
    userId:leave?.userId || 0,
    leaveTypeId:leave?.leaveTypeId || 0,
    startDate:dayjs(leave?.startDate) || '',
    endDate:dayjs(leave?.endDate) || '',
    reason:leave?.reason || ''
   },
   validateOnBlur:false,
   validateOnChange:false,
   enableReinitialize:true,
   onSubmit: values => {
      const token=cookies.token;
      console.log(values)
        axios
        .put(adminApi+`/edit-leave/${leaveId}`,values,{
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response)=>{
        //   navigate('/manage-leave')
          console.log(response?.data?.response)      
          // setEmployees(response?.data?.response)

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
          <Grid item>
            <InputLabel className={classes.labels}>Employee Name</InputLabel>
            <SelectUi
                // title={'Employee Name'} 
                data={employees} 
                value={formik.values.userId} 
                error={Boolean(formik.touched.userId && formik.errors.userId)} 
                helperText={formik.touched.userId && formik.errors.userId}  
                name="userId" 
                // touched={touched}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                placeholder={"Select the Employee"}   
                classes={classes}/>         
          </Grid>
          {/* Leave Type */}
          <Grid item>
            <InputLabel className={classes.labels}>Leave Type</InputLabel>
            <SelectUi
                data={leaveType} 
                error={Boolean(formik.touched.leaveTypeId && formik.errors.leaveTypeId)} 
                helperText={formik.touched.leaveTypeId && formik.errors.leaveTypeId}  
                name="leaveTypeId" 
                value={formik.values.leaveTypeId}
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
              value={formik.values.reason}
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
              <BlackButton type={'submit'} label="Update" />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}