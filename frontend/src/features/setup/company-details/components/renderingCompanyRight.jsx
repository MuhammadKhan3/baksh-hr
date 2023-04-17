import React from "react";
import CompanyRight from "../ui/companyRight";
import { Button, makeStyles } from "@material-ui/core";
import BlackButton from "../../leave/ui/blackButton";
import { Theme } from "@mui/material";

const useStyles = makeStyles((Theme) => ({
  buttonStyling: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3.18rem",
    [Theme.breakpoints.down("md")]: {
      marginTop: "1rem",
      justifyContent: "end",
      marginLeft: "1rem",
    },
  },
}));
export default function RenderingComponentRight() {
  const classes = useStyles();
  return (
    <div>
      <CompanyRight office="Office #1" />
      <CompanyRight office="Office #2" />
      <div className={classes.buttonStyling}>
        <BlackButton label="Add More" />
      </div>
    </div>
  );
}
