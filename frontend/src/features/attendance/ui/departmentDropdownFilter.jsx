import React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  formStyling: {
    width: "340px",
    background: "#FFFFFF",
    border: "1px solid #C49150",
    borderRadius: "10px",
    height: "40px",
  },
});
export default function DepartmentDropdownFilter() {
  const [departments, setDepartments] = React.useState("");

  const handleChange = (event) => {
    setDepartments(event.target.value);
  };

  const classes = useStyles();

  return (
    <FormControl sx={{ m: 1, minWidth: "100%" }}>
      <Select
        label="st"
        value={departments}
        onChange={handleChange}
        displayEmpty
        inputProps={{}}
        className={classes.formStyling}
      >
        <MenuItem value="">
          <h6>All Departments</h6>
        </MenuItem>
        <MenuItem value="1"> Marketing</MenuItem>
        <MenuItem value="2"> Finance</MenuItem>
        <MenuItem value="3">Human Resource</MenuItem>
      </Select>
    </FormControl>
  );
}
