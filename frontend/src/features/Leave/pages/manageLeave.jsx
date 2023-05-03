import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../../../components/sidebar/sidebar";
import SimpleHeader from "../header/simpleHeader";
import AddLeave from "../components/leave";
import Header from "../../../components/header/header";
import LeaveTable from "../components/leavesTable";
import SearchBar from "../../employee/ui/seachBar";
import SelectUi from "../../../components/ui/select";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    width: "100%",
  },
  sidebar: {
    width: "25%",
  },
  table: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  module: {
    width: "75%",
    marginRight: "2%",
    // display:'flex',
    // flexDirection:'column'
  },
  sideBorder: {
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    width: 0,
    height: "auto",
    margin: "0 5vw",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  selectContainer: {
    width: "30%",
  },
  inputContainer: {
    // width:'100%'
  },
}));

export default function ManageLeave() {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div" className={classes.module}>
        <Header heading={"Manage Leave"} />
        {/* <SimpleHeader heading="Add Leave" /> */}

        <Box>
          <Box component="div" className={classes.filterContainer}>
            <Box component="div" className={classes.selectContainer}>
              <SelectUi />
            </Box>
            <Box component="div" className={classes.inputContainer}>
              <SearchBar />
            </Box>
          </Box>
          <Box component="div" className={classes.table}>
            {/* <AddLeave /> */}
            <LeaveTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
