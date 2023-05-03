import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import React from "react";

const useStyles = makeStyles((theme) => ({
  btn: (props) => ({
    padding: theme.spacing(2),
    color: "white",
    backgroundColor: "#2C2F32 !important",
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: props.fontWeight
      ? `${props.fontWeight} !important`
      : "600 !important",
    "&:hover": {
      backgroundColor: "#3f4144",
    },
  }),
}));

const BlackButton = ({
  label = "sample",
  clickHandler,
  onSubmit,
  type,
  fontWeight,
}) => {
  const classes = useStyles({ fontWeight });
  return (
    <Button
      className={classes.btn}
      variant="contained"
      type={type}
      onClick={clickHandler}
      onSubmit={onSubmit}
    >
      {label}
    </Button>
  );
};

export default BlackButton;
