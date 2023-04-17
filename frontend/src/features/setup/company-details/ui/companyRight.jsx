import React from "react";
import { Box, Typography, Theme } from "@mui/material";
import InputNumber from "../../../employee/ui/editEmployee/inputNumber";
import MultiLineText from "../../../employee/ui/editEmployee/multiline";
import SelectLocalUi from "../../../../components/ui/selectLocal";
import PropTypes from "prop-types";
import { country } from "../../../employee/components/country";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: "0.8rem",
    width: "auto",
    height: "auto",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.25rem",
    width: "30vw",
    gap: "0.57rem",
    height: "100%",
  },
  personalLabel: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "12px !important",
    lineHeight: "18px !important",
    letterSpacing: "-0.02em",
    color: "#2C2F32",
  },
  flexRow: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    [Theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      gap: "0px",
    },
  },
}));

const status = ["active", "inactive"];
const city = ["Islambad", "Peshawar", "Quetta", "Karachi"];

const CompanyRight = ({ office }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container} component="div">
      <Box component="div">
        <Typography component="h1" className={classes.personalLabel}>
          {office}:
        </Typography>
      </Box>
      <Box className={classes.innerContainer} component="div">
        <InputNumber
          placeholder={"Add Employee ID"}
          name="employeeId"
          label={"Empolyee Id"}
        />

        <MultiLineText label={"Address"} placeholder={"Add Address"} />
        <Box className={classes.flexRow}>
          <SelectLocalUi
            title={"Country"}
            helperText={"Country"}
            name="Country"
            placeholder={"Select Country"}
            data={country}
          />
          <SelectLocalUi
            title={"City"}
            helperText={"Country"}
            name="Country"
            placeholder={"Select City"}
            data={city}
          />
        </Box>
      </Box>
    </Box>
  );
};

CompanyRight.propTypes = {
  office: PropTypes.string.isRequired,
};

export default CompanyRight;
