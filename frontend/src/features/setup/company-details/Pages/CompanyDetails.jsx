import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Box, FormControl } from "@mui/material";
import Sidebar from "../../../../components/sidebar/sidebar";
import ComponentLeft from "../components/companyLeft";
import RenderingComponentRight from "../components/renderingCompanyRight";
import AttendanceHeader from "../../../attendance/ui/attendanceHeader";
import Tab from "../ui/colorTabs";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",

    [theme.breakpoints.down("sm")]: {},
  },
  sidebar: {
    width: "25%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  employee: {
    display: "flex",
    flexDirection: "row",
    padding: "1rem 2rem",
    width: "100%",
    // border: "2px solid blue",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  // #E1E1E1
  sideBorder: {
    borderRight: "1px solid #E1E1E1",
    width: "0px",
    height: "auto",
    margin: "0 5vw",
    [theme.breakpoints.down("md")]: {
      border: "none",
      margin: "0 2vw",
    },
  },
  formikDiv: {
    width: "100%",
    // border: "2px solid black",
  },
  subBtn: {
    backgroundColor: "#C49150 !important",
    color: "white !important",
    width: "13.3rem",
    height: "46px !important",
    borderRadius: "10px !important",
  },
  btn: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "400 !important",
    fontSize: "14px  !important",
    lineHeight: "21px  !important",
    letterSpacing: "-0.02em  !important",
    color: "#868B90  !important",
  },
  btnBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "1.38rem",
  },
}));

export default function CompanyDetails() {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div">
        {/* <Header heading="Configuration" /> */}
        <AttendanceHeader
          heading={"Configuration"}
          marginLeft={"0px"}
          width={"100%"}
        />
        <Tab />
        <FormControl>
          <Box component="div" className={classes.employee}>
            <ComponentLeft />
            <Box component="hr" className={classes.sideBorder}></Box>
            <RenderingComponentRight />
          </Box>
          <Box className={classes.btnBox}>
            <Button>Save as draft</Button>
            <Button className={classes.subBtn} type="submit">
              Submit
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
}
