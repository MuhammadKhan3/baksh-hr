import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../../../../components/sidebar/sidebar";
import { useSelector } from "react-redux";
import Header from '../../../../components/header/header'
import AllowanceBottom from "../components/allowanceBottom";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
      display: "flex",
      width: "100%",
    },
    container:{
        width:'80%'
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

const Allowance=()=>{
    const classes=useStyles();
return <>
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div" className={classes.container}>
        <Header heading={"Allowance & Deduction"} />
        <Box>
          <Box component="div" className={classes.employee}>
             <AllowanceBottom/>
          </Box>
        </Box>
      </Box>
    </Box>
</>
}
export default Allowance;