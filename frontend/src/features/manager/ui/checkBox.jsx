import * as React from "react";
import { createMuiTheme, MuiThemeProvider, Checkbox } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import emptyRectangle from "../icons/empty-rectangle.png";
import fillRectangle from "../icons/filled-rectangle.png";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  root: {
    "& .MuiTypography-body1": {
      fontFamily: "Poppins !important",
      fontStyle: "normal !important",
      fontWeight: "600 !important",
      fontSize: " 12px !important",
      lineHeight: "18px !important",
      letterSpacing: "-0.02em !important",
      color: "#2C2F32 !important",
    },
  },
});

export default function CheckBox({ label }) {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <FormControlLabel
          control={<Checkbox />}
          label={<Typography variant="body1"> {label} </Typography>}
          className={classes.root}
        />
      </div>
    </MuiThemeProvider>
  );
}
const theme = createMuiTheme({
  props: {
    MuiCheckbox: {
      icon: <img src={emptyRectangle} />,
      checkedIcon: <img src={fillRectangle} />,
    },
  },
});
