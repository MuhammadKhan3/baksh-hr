import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";

import FileInput from "../../../../components/ui/fileInput";
// import { useDispatch, useSelector } from "react-redux";
import { employeeAction } from "../../../../redux/slice/employeeSlice";
import InputText from "../../../employee/ui/input";
import InputNumber from "../../../employee/ui/editEmployee/inputNumber";
import { setPicture } from "../../../../redux/slice/companySlice";
import { useSelector } from "react-redux";

const { country } = require("../../../employee/components/country");

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    // marginTop: "1.5rem",
    paddingLeft: "0.8rem",
    width: "auto",
    gap: "20px",
    height: "auto",
    // border:'1px solid black'
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: "0.8rem",
    width: "30vw",
    gap: "20px",
    height: "100%",
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
});
export default function ComponentLeft({
  values,
  errors,
  handleChange,
  handleBlur,
  touched
}) {
  const classes = useStyles();
  const picture=useSelector(state=>state?.company?.picture);


  return (
    <Box className={classes.container} component="div">
      <Box className={classes.innerContainer} component="div">
        <FileInput
          label={"Upload Logo"}
          setState={setPicture}
          state={picture}
        />
        <InputText
          placeholder={"Company Name"}
          title={"Company Name"}
          name="companyName"
          error={Boolean(touched.companyName && errors.companyName)}
          helperText={touched.companyName && errors.companyName}
          handleBlur={handleBlur}
          value={values.companyName}
          handleChange={handleChange}

        />
        <InputNumber 
               placeholder={"Add Phone"} 
               label={"Add Phone"} 
               name={'phone'} 
               value={values.phone}
               helperText={touched.phone && errors.phone}
               error={Boolean(touched.phone && errors.phone)}
               handleBlur={handleBlur}
               handleChange={handleChange}
        />

        <InputText 
           title={"Email"} 
           placeholder={"Add Email"} 
           name={'email'}
           value={values.email}
           helperText={touched.email && errors.email}
           error={Boolean(touched.email && errors.email)}
           handleBlur={handleBlur}
           handleChange={handleChange}
        />
        <InputText 
            title={"Website URL"} 
            placeholder={"Add website URL"} 
            name={'websiteUrl'}
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values.websiteUrl}
           helperText={touched.websiteUrl && errors.websiteUrl}
            error={Boolean(touched.websiteUrl && errors.websiteUrl)}
        />
      </Box>
    </Box>
  );
}
