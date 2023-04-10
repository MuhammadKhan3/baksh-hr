import React, { useEffect, useState } from "react";
import { InputLabel, Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputText from "../ui/input";
import DatePickterUi from "../../../../components/ui/datePickter";
import ForwardArrow from "../ui/forwardArrow";
import BlackButton from "../ui/blackButton";
import SelectLocalUi from "../../../../components/ui/selectLocal";
import InputNumber from "../ui/inputNumber";
import MultiLineText from "../ui/multiline";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { adminApi } from "../../../../axios/axiosData";
import { useCookies } from "react-cookie";
import SelectUi from "../ui/select";
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

export default function AddLeave() {
  const classes = useStyles();
  const [cookies]=useCookies(['token'])

  // Formik Validation Schema
  const validationSchema=yup.object().shape({
    leaveType:yup.string()
    .min(3,'Leave Type Length greater than 3')
    .max(200,'Leave Type Length less than 200')
    .required(),
    creditTypeValue:yup.number().required(),
    creditLeave:yup.number().integer(),
    description:yup.string().optional().max(2000,'Less than 2000 words')
  });

  // use Formik to validate
  const formik =useFormik({
    initialValues:{
      leaveType:'',
      creditTypeValue:'',
      creditLeave:'',
      description:'',
    },
    // validateOnBlur:t,
    // validateOnChange:false,
    onSubmit: values => {
      const token=cookies.token;
      console.log(token,values)
      axios
      .post(adminApi+'/add-leaveType',values,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response)=>{
        console.log(response?.data)
        //  if(response?.data){

        //  }
      })
    },
    validationSchema
   });




  const creditType=[{label:'Monthly',value:1},{label:'Quaterly',value:3},{label:'Half Year',value:6},{label:'Yearly',value:12}]
  return (<Box width={'400px'} maxWidth={"860px"}>
      <form 
      onSubmit={formik.handleSubmit}
      >
        {/* Grid container for form layout */}
        <Grid container direction={"column"} spacing={2}>
          {/*  Name */}
          <Grid item>
            <InputLabel className={classes.labels}>Leave Type</InputLabel>
            <InputText
              placeholder="Leave Type"
              name="leaveType"
              error={Boolean(formik.touched.leaveType && formik.errors.leaveType)} 
              helperText={formik.touched.leaveType && formik.errors.leaveType}  
              value={formik.values.leaveType}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item>
            <InputLabel className={classes.labels}>Credit Type</InputLabel>
            <SelectUi
                  title={'Credit Type'}    
                  // value={values.nationality} 
                  error={Boolean(formik.touched.creditTypeValue && formik.errors.creditTypeValue)} 
                  helperText={formik.touched.creditTypeValue && formik.errors.creditTypeValue}  
                  name="creditTypeValue" 
                  // touched={touched}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  data={creditType} 
            />
          </Grid>
        

          <Grid item>
            <InputLabel className={classes.labels}>Credit Leaves</InputLabel>
            <InputNumber
                value={formik.values.creditLeave} 
                error={Boolean(formik.touched.creditLeave && formik.errors.creditLeave)} 
                helperText={formik.touched.creditLeave && formik.errors.creditLeave}  
                name="creditLeave" 
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}    
                placeholder="Add Credit Leaves" 

            />
          </Grid>
          {/* Date */}

          {/* Reason */}
          <Grid width={'100%'} item>
              <MultiLineText 
                label={'Description'} 
                name="description" 
                error={Boolean(formik.touched.description && formik.errors.description)} 
                helperText={formik.touched.description && formik.errors.description}  
                value={formik.values.description}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}    
                placeholder={"Add Description"}
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
              <BlackButton type={'submit'} onSubmit={formik.handleSubmit} label="Submit" />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
