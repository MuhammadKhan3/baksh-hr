import React from "react";

import { makeStyles } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";

import FileInput from "../../../../components/ui/fileInput";
// import { useDispatch, useSelector } from "react-redux";
import { employeeAction } from "../../../../redux/slice/employeeSlice";
import InputText from "../../../employee/ui/editEmployee/input";
import InputNumber from "../../../employee/ui/editEmployee/inputNumber";

const { country } = require("../../../employee/components/country");

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    // marginTop: "1.5rem",
    paddingLeft: "0.8rem",
    width: "auto",
    gap: "20px",
    height: "auto",
    // border:'1px solid black'
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: "0.8rem",
    width: "30vw",
    gap: "20px",
    height: "100%",
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
});
export default function ComponentLeft() {
  const classes = useStyles();

  return (
    <Box className={classes.container} component="div">
      <Box className={classes.innerContainer} component="div">
        <FileInput
          label={"Upload Logo"}
          setState={employeeAction.profileAction}
        />
        <InputText
          placeholder={"Company Name"}
          title={"Company Name"}
          name="name"
        />
        <InputNumber placeholder={"Add Phone"} label={"Add Phone"} />

        <InputText title={"Email"} placeholder={"Add Email"} />
        <InputText title={"Website URL"} placeholder={"Add website URL"} />
      </Box>
    </Box>
  );
}
