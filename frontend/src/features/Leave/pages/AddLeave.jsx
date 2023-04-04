import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../../../components/sidebar/sidebar";
import SimpleHeader from "../header/simpleHeader";
import AddLeave from "../components/leave";

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
  sideBorder: {
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    width: 0,
    height: "auto",
    margin: "0 5vw",
  },
}));

export default function Leave() {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div">
        <SimpleHeader heading="Add Leave" />
        <Box>
          <Box component="div" className={classes.employee}>
            <AddLeave />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
