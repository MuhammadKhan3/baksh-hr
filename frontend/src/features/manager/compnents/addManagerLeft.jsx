import React from "react";
import { Input, InputLabel, makeStyles } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
import FileInput from "../../../components/ui/fileInput";
import InputText from "../../employee/ui/editEmployee/input";
import InputNumber from "../../employee/ui/editEmployee/inputNumber";
// import InputNumber from "../../setup/leave/ui/Employee/inputNumber";
import BlackButton from "../../Leave/ui/blackButton";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: "0rem",
    width: "auto",
    gap: "20px",
    height: "auto",
    // border:'1px solid black'

    // #
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: "0rem",
    width: "30vw",
    gap: "20px",
    height: "100%",
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
  root: {
    [`& fieldset`]: {
      border: "1px solid #E1E1E1",
      borderRadius: "10px !important",
    },
    width: "100%",
  },
  flexRow: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    // alignItems:'center',
    gap: 20,
  },
  border: {
    borderTop: "1px solid #E1E1E1",
    position: "relative",
    marginTop: "1rem",
    width: "auto",
    transform: "rotate(180)",
  },
  labels: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "12px !important",
    lineHeight: "18px !important",
    letterSpacing: "-0.02em !important",
    color: "#2C2F32 !important",
    marginBottom: "0.375rem",
  },
});
export default function AddManagerLeft() {
  const classes = useStyles();

  return (
    <Box className={classes.container} component="div">
      <Box component="div">
        <Typography component="h1" className={classes.personalLabel}>
          Profile Details
        </Typography>
      </Box>
      <Box className={classes.innerContainer} component="div">
        <FileInput />
        <Box>
          <InputLabel className={classes.labels}>Name</InputLabel>
          <InputText placeholder={"Name"} name="name" />
        </Box>
        <Box>
          <InputLabel className={classes.labels}>Phone</InputLabel>
          <InputNumber
            name="contactOne"
            placeholder="Add Phone"
            className={classes.labels}
          />
        </Box>
        <Box>
          <InputLabel className={classes.labels}>Email</InputLabel>
          <InputText name="email" placeholder="Email" />
        </Box>
        <Box>
          <InputLabel className={classes.labels}>Password</InputLabel>
          <InputText name="Password" placeholder="Password" />
        </Box>
        <Box>
          <InputLabel className={classes.labels}>Status</InputLabel>
          <InputText name="status" placeholder="Active" />
        </Box>
        <Box className={classes.flexRow}></Box>
        <Box className={classes.flexRow}>
          {/* <InputLabel className={classes.labels}>Leave Type</InputLabel>
          <InputNumber
            // label={"Phone 1"}
            name="contactOne"
            placeholder="Add Contact No"
            className={classes.labels}
          /> */}
        </Box>
        <Box className={classes.flexRow}></Box>
        {/* <Box component="hr" className={classes.border}></Box> */}
      </Box>
      {/* <BlackButton /> */}
    </Box>
  );
}
