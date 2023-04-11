import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/material";
import React from "react";

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: "1rem",
    paddingLeft: "0rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  pageName: {
    fontFamily: "Poppins",
    fontSize: "28px",
    fontWeight: "600",
    lineHeight: "42px",
    letterSpacing: "-0.02em",
    textAlign: "left",
  },
  msgIcon: {
    cursor: "pointer",
    color: "#868B90",
    stroke: "#868B90",
    width: "18px",
    height: "18.46px",
  },
  notificationIcon: {
    cursor: "pointer",
    color: "#868B90",
    stroke: "#868B90",
    width: "18px",
    height: "18.46px",
  },
});

const SimpleHeader = ({ heading }) => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.pageName}>
        {heading}
      </Box>
    </Box>
  );
};

export default SimpleHeader;
