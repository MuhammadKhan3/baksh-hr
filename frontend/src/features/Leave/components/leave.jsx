import React, { useEffect, useState } from "react";
import { InputLabel, Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputText from "../../employee/ui/input";
import DatePickterUi from "../../../components/ui/datePickter";
import ForwardArrow from "../ui/forwardArrow";

import BlackButton from "../ui/blackButton";
import SelectLocalUi from "../../../components/ui/selectLocal";

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

  // Declare state variables for form inputs
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  // Handle input changes and update state accordingly
  const handleChange = (e) => {

    switch (e.target.name) {
      case "employeeName":
        setEmployeeName(e.target.value);
        break;
      case "leaveType":
        setLeaveType(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "reason":
        setReason(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(()=>{
    
  },[])

  return (
    <Box maxWidth={"460px"}>
      <form>
        {/* Grid container for form layout */}
        <Grid container direction={"column"} spacing={2}>
          {/* Employee Name */}
          <Grid item>
            {/* <InputLabel className={classes.labels}>Employee Name</InputLabel> */}
            <SelectLocalUi
                title={'Employee Name'} 
                data={Gender} 
                // value={values.gender} 
                // error={Boolean(touched.gender && errors.gender)} 
                // helperText={touched.gender && errors.gender}  
                name="employee" 
                // touched={touched}
                // handleChange={handleChange}
                // handleBlur={handleBlur}
                placeholder={"Select the Employee"}   
                classes={classes}/>          </Grid>

          {/* Leave Type */}
          <Grid item>
            <InputLabel className={classes.labels}>Leave Type</InputLabel>
            <InputText
              placeholder="Leave Type"
              name="leaveType"
              value={leaveType}
              handleChange={handleChange}
            />
          </Grid>

          {/* Date */}
          <Grid item>
            <InputLabel className={classes.labels}>Date</InputLabel>
            <Grid item container direction={"row"} spacing={2}>
              <Grid item xs={5}>
                {/* Start Date */}
                <DatePickterUi name="leaveDate" placeholder="Start Date" />
              </Grid>
              <Grid item xs={5}>
                {/* End Date */}
                <DatePickterUi name="endDate" placeholder="End Date" />
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
              value={reason}
              handleChange={handleChange}
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
              <BlackButton label="Submit" />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
