import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../../../../components/sidebar/sidebar";
import SimpleHeader from "../../header/simpleHeader";
import AddLeave, { AddLeaveEmployeeCmp } from "../../components/leave";
import Header from "../../../../components/header/header";

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
    padding: "2rem",
    width: "100%",
  },
  module:{
    width:'75%',
    marginRight:'2%'
    
  },
  sideBorder: {
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    width: 0,
    height: "auto",
    margin: "0 5vw",
  },
}));

export default function AddLeaveEmployee() {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div" className={classes.module}>
        <Header heading={"Add Leave"}/>
        {/* <SimpleHeader heading="Add Leave" /> */}

        <Box>
          
          <Box component="div" className={classes.employee}>
            <AddLeaveEmployeeCmp />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
