import React from "react";
import { makeStyles } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
import GenericComponent from "./genericComponent";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: "0rem",
    width: "auto",
    gap: "20px",
    height: "auto",

    [theme.breakpoints.down("md")]: {},

    // #
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: "0rem",
    width: "36vw",
    gap: "0px",
    height: "45%",
  },
  personalLabel: {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "600 !important",
    lineHeight: "21px",
    letterSpacing: "-0.02em",
    textAlign: "left",
    color: "#2C2F32",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #000000",
  },
}));
export default function AddManagerRgiht() {
  const classes = useStyles();

  return (
    <Box className={classes.container} component="div">
      <Box component="div">
        <Typography component="h1" className={classes.personalLabel}>
          Profile Details
        </Typography>
      </Box>
      <Box className={classes.innerContainer} component="div">
        <GenericComponent type={"Employee"} />
        <GenericComponent type={"Attendance"} />
        <GenericComponent type={"Leave"} />
        <GenericComponent type={"Payslip"} />
        <GenericComponent type={"Performance"} />
        <GenericComponent type={"Recruitment"} />
        <GenericComponent type={"Daily"} />
      </Box>
      {/* <BlackButton /> */}
    </Box>
  );
}
