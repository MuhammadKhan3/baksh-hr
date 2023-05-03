import React from "react";
import CheckBox from "../ui/checkBox";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1.375rem",

    // flexGrow: 1,
    // border: "3px solid black",
    [theme.breakpoints.down("md")]: {
      gap: "0.5rem",
      // flexWrap: "wrap",
    },
    [theme.breakpoints.down("sm")]: {
      gap: "0rem",
      flexWrap: "wrap",
    },
    [theme.breakpoints.down("xs")]: {
      flexWrap: "nowrap",
    },
  },
  containerItem: {
    // flexBasis: "200px",
    minWidth: "80px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "-0.02em",
    color: "#2C2F32",
  },
}));
const GenericComponent = ({ type }) => {
  const classes = useStyles();
  switch (type) {
    case "Employee":
      return (
        <div className={classes.container}>
          <div className={classes.containerItem}>Employee:</div>
          <CheckBox label={"View"} />
          <CheckBox label={"Add"} />
          <CheckBox label={"Edit"} />
          <CheckBox label={"Delete"} />
        </div>
      );
    case "Attendance":
      return (
        <div className={classes.container}>
          <div className={classes.containerItem}>Attendance:</div>
          <CheckBox label={"View"} />
          <CheckBox label={"Add"} />
        </div>
      );
    case "Leave":
      return (
        <div className={classes.container}>
          <div className={classes.containerItem}>Leave:</div>
          <CheckBox label={"View"} />
          <CheckBox label={"Add"} />
          <CheckBox label={"Edit"} />
          <CheckBox label={"Delete"} />
        </div>
      );
    case "Payslip":
      return (
        <div className={classes.container}>
          <div className={classes.containerItem}>Payslip:</div>
          <CheckBox label={"View"} />
          <CheckBox label={"Add"} />
          <CheckBox label={"Edit"} />
        </div>
      );
    case "Performance":
      return (
        <div className={classes.container}>
          <div className={classes.containerItem}>Performance:</div>
          <CheckBox label={"View"} />
          <CheckBox label={"Add"} />
        </div>
      );
    case "Recruitment":
      return (
        <div className={classes.container}>
          <div className={classes.containerItem}>Recruitment:</div>
          <CheckBox label={"View"} />
          <CheckBox label={"Add"} />
        </div>
      );
    case "Daily":
      return (
        <div className={classes.container}>
          <div className={classes.containerItem}>Daily:</div>
          <CheckBox label={"Work"} />
          <CheckBox label={"Notification"} />
          <CheckBox label={"Quote"} />
        </div>
      );
    default:
      return null;
  }
};

export default GenericComponent;
