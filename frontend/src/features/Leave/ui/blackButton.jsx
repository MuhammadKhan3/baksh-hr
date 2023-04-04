import { makeStyles } from "@material-ui/core/styles"; // import only makeStyles instead of the entire library
import { Button } from "@mui/material";
import React from "react";

const useStyles = makeStyles((theme) => ({
  // use arrow function syntax and pass theme argument
  btn: {
    padding: theme.spacing(2), // use theme.spacing instead of hardcoded value
    color: "white",
    backgroundColor: "#2C2F32 !important ",

    fontFamily: "'Poppins !important', sans-serif",
    fontStyle: "normal !important",
    fontWeight: "600 !important",

    "&:hover": {
      // add hover styles
      backgroundColor: "#3f4144",
    },
  },
}));

const BlackButton = ({ label = "sample", clickHandler }) => {
  const classes = useStyles();
  return (
    <Button className={classes.btn} variant="contained" onClick={clickHandler}>
      {label}
    </Button>
  );
};

export default BlackButton;
