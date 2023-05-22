import React from "react";
import { Input, InputLabel, makeStyles } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
import FileInput from "../../../components/ui/fileInput";
import InputText from "../../employee/ui/editEmployee/input";
import InputNumber from "../../employee/ui/editEmployee/inputNumber";
// import InputNumber from "../../setup/leave/ui/Employee/inputNumber";
import BlackButton from "../../Leave/ui/blackButton";
import SelectUi from "../../../components/ui/select";
import SelectLocalUi from "../../../components/ui/selectLocal";

import { useSelector } from "react-redux";
import { setPicture } from "../../../redux/slice/companySlice";


const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: "0rem",
    width: "auto",
    gap: "20px",
    height: "auto",
    // border:'1px solid black'

    // #
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: "0rem",
    width: "30vw",
    gap: "20px",
    height: "100%",
  },
  personalLabel: {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "600 !important",
    lineHeight: "21px",
    letterSpacing: "-0.02em",
    textAlign: "left",
    color: "#2C2F32",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #000000",
  },
  root: {
    [`& fieldset`]: {
      border: "1px solid #E1E1E1",
      borderRadius: "10px !important",
    },
    width: "100%",
  },
  flexRow: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    // alignItems:'center',
    gap: 20,
  },
  border: {
    borderTop: "1px solid #E1E1E1",
    position: "relative",
    marginTop: "1rem",
    width: "auto",
    transform: "rotate(180)",
  },
  labels: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "12px !important",
    lineHeight: "18px !important",
    letterSpacing: "-0.02em !important",
    color: "#2C2F32 !important",
    marginBottom: "0.375rem",
  },
});
export default function AddManagerLeft({manager,touched,offices,values,handleChange,handleBlur,errors}) {
  const classes = useStyles();
  const picture=useSelector(state=>state?.company?.picture);
  const departments=useSelector(state=>state.emp.departments);


  console.log(values)
  return (
    <Box className={classes.container} component="div">
      <Box component="div">
        <Typography component="h1" className={classes.personalLabel}>
          Profile Details
        </Typography>
      </Box>
      <Box className={classes.innerContainer} component="div">
        <FileInput 
           value={manager?.picture}
           setState={setPicture}
           state={picture}
        />
        <Box>
          <InputLabel className={classes.labels}>Name</InputLabel>
          <InputText placeholder={"Name"} 
            handleChange={handleChange} 
            value={values?.name} 
            handleBlur={handleBlur} name="name"             
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}/>
        </Box>
        <Box>
          <SelectUi 
            title={'Department'}  
            data={departments} 
            value={values.departmentId} 
            error={Boolean(touched.departmentId && errors.departmentId)} 
            helperText={touched.departmentId && errors.departmentId}  
            name="departmentId" 
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder={"Select the Department"}   
          />
        </Box>
        <Box>
          <InputLabel className={classes.labels}>Phone</InputLabel>
          <InputNumber 
             name="phone" 
             placeholder="Add Phone" 
             handleChange={handleChange} 
             value={values?.phone} 
             handleBlur={handleBlur}  
             className={classes.labels}
             error={Boolean(touched.phone && errors.phone)}
             helperText={touched.phone && errors.phone}
          />
        </Box>
        <Box>
          <InputLabel className={classes.labels}>Email</InputLabel>
          <InputText 
             name="email" 
             handleChange={handleChange} 
             value={values?.email} 
             handleBlur={handleBlur} 
             placeholder="Email"
             error={Boolean(touched.email && errors.email)}
             helperText={touched.email && errors.email} 
          />
        </Box>
        <Box>
          <InputLabel className={classes.labels}>Password</InputLabel>
          <InputText 
              name="password" 
              placeholder="Password" 
              handleChange={handleChange} 
              value={values?.password} 
              handleBlur={handleBlur}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}  
          />
        </Box>
        <Box >
            <InputLabel className={classes.labels}>Status</InputLabel>
            <SelectLocalUi
               data={['active','inactive','pending']}
               name='status'
               error={Boolean(touched.status && errors.status)}
               helperText={touched.status && errors.status}  
               handleBlur={handleBlur}
               handleChange={handleChange}
               value={values?.status}
               placeholder={"Select the Status"}   
               classes={classes}
            />
        </Box>
        <Box >
            <InputLabel className={classes.labels}>Office Code</InputLabel>
            <SelectUi
                    data={offices} 
                    name="officeId"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={Boolean(touched.officeId && errors.officeId)}
                    helperText={touched.officeId && errors.officeId}  
                    value={values?.officeId}
                    placeholder={"Select the Office Code"}   
                    classes={classes}
            />
        </Box>
        <Box className={classes.flexRow}></Box>
      </Box>
      {/* <BlackButton /> */}
    </Box>
  );
}
