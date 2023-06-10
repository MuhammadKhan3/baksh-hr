import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../../../components/sidebar/sidebar";

import AttendanceData from "../components/attedanceData";
import SimpleHeader from "../../Leave/header/simpleHeader";
import AttendanceHeader from "../ui/attendanceHeader";
import DepartmentDatePicker from "../components/departmentDatePicker";
import { useSelector } from "react-redux";
import Header from "../../../components/header/header";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    width: "100%",
  },
  sidebar: {
    width: "25%",
  },
  employee: {
    display: "flex",
    flexDirection: "row",
    padding: "0.5rem",
    width: "100%",
  },
  sideBorder: {
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    width: 0,
    height: "auto",
    margin: "0 5vw",
  },
}));

export default function Attendance() {
  const classes = useStyles();

  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div">
        <Header heading={"Attendance Report"} />
        <Box>
          <Box component="div" className={classes.employee}>
            <DepartmentDatePicker />
          </Box>
          <Box component="div" className={classes.employee}>
            {/* <DepartmentDatePicker /> */}
            <AttendanceData/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
