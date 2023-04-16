import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    "&.MuiTab-root.Mui-selected": {
      color: "#2C2F32 !important",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#C49150",
    },

    "& .MuiTabs-flexContainer > *": {
      fontFamily: "Poppins !important",
      fontStyle: "normal !important",
      fontWeight: "600 !important",
      fontSize: "14px !important",
      lineHeight: "21px !important",
      letterSpacing: "-0.02em !important",
      color: "#868B90 !important",
    },
  },
});
export default function ColorTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
        className={classes.root}
      >
        <Tab value="one" label="Company Details" className={classes.root} />
        <Tab value="two" label="System" className={classes.root} />
        <Tab value="three" label="Biometric API" className={classes.root} />
        <Tab
          value="four"
          label="Employee Login Panel"
          className={classes.root}
        />
      </Tabs>
    </Box>
  );
}
