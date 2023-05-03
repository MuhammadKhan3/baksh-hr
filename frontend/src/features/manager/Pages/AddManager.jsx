import React from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/material";
import AddManagerLeft from "../compnents/addManagerLeft";
import AddManagerRight from "../compnents/addManagerRight";
import AttendanceHeader from "../../attendance/ui/attendanceHeader";
import BlackButton from "../../Leave/ui/blackButton";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  sidebar: {
    width: "24%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  employee: {
    display: "flex",
    flexDirection: "row",
    padding: "0rem",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      padding: "1rem",
    },
  },
  // #E1E1E1
  sideBorder: {
    width: "0px",
    height: "auto",
    margin: "0 5vw",
    [theme.breakpoints.down("lg")]: {
      margin: "0 3vw",
    },
    [theme.breakpoints.down("md")]: {
      // margin: "0 4vw",
      margin: "0 2vw",
    },
    [theme.breakpoints.down("sm")]: {},
  },
  formikDiv: {
    width: "100%",
  },
  subBtn: {
    backgroundColor: "#C49150 !important",
    color: "white !important",
    width: "13.3rem",
    height: "46px !important",
    borderRadius: "10px !important",
  },
  btnBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "1.38rem",
  },
  border: {
    borderTop: "5px solid #868B90",
    position: "relative",
    // marginTop: "1rem",
    width: "auto",
    transform: "rotate(180)",
    marginTop: "1.375rem",
  },
}));

const AddManager = () => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div">
        <AttendanceHeader
          heading={"Add Manager"}
          width={"100%"}
          marginLeft={"0%"}
        />
        <>
          <Box component="div" className={classes.employee}>
            <AddManagerLeft />
            <Box component="hr" className={classes.sideBorder}></Box>
            <AddManagerRight />
          </Box>

          <Box className={classes.btnBox}>
            <BlackButton label="Save" fontWeight={500} />
          </Box>
          <Box component="hr" className={classes.border}></Box>
        </>
      </Box>
    </Box>
  );
};

export default React.memo(AddManager);
