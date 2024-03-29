import React from "react";
import DepartmentDropdownFilter from "../ui/departmentDropdownFilter";
import { makeStyles } from "@mui/styles";

import { InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import DatePickterUi from "../ui/datePicker";
import ForwardArrow from "../../Leave/ui/forwardArrow";
import SearchBar from "../../employee/ui/seachBar";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../redux/slice/userSlice";
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
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "5rem",
    alignItems: "center",
    alignItems: "flex-end",
    // border: "2px solid gold",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    gap: "1rem",
  },
});

export default function DepartmentDatePicker() {
  const classes = useStyles();
  const dispatch=useDispatch();
  const search=useSelector(state=>state.user.search);
  const date=useSelector(state=>state.user.date);

  const startDateHandler=(date)=>{
    console.log(date)
    dispatch(userActions.startDate(date))
  }
  const endDateHandler=(date)=>{
    // console.log(e.target.value)
    dispatch(userActions.endDate(date))
  }

  const dateHandler=()=>{
    dispatch(userActions.setDateSearch(!date))
    
  }

  // const
  return (
    <Box sx={{ marginLeft: "22.5%" }}>
      <Box className={classes.container}>
        <Box>
          <InputLabel className={classes.labels}>Departments</InputLabel>
          <DepartmentDropdownFilter />
        </Box>
        <Box>
          <Box>
            {" "}
            <InputLabel className={classes.labels}>Date</InputLabel>
            <Box className={classes.dateContainer}>
              <Box>
                {/* Start Date */}
                {/* <DatePickterUi name="leaveDate" placeholder="Start Date" /> */}
                <DatePickterUi title="Start Date" name="selectedDate" onChange={startDateHandler} />
              </Box>
              <Box>
                {/* End Date */}
                <DatePickterUi title="End Date" name="selectedDate"  onChange={endDateHandler}/>
                {/* <DatePickterUi name="endDate" placeholder="End Date" /> */}
              </Box>
              <Box>
                <ForwardArrow onClick={dateHandler}/>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box>
            <SearchBar setSearch={(value)=>{dispatch(userActions.setSearch(value))}} width={"85%"} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
