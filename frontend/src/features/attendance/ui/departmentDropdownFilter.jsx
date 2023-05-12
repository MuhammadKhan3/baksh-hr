import React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../redux/slice/userSlice";
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
  // const [department, setDepartment] = React.useState("");
  const departments=useSelector(state=>state.emp.departments);
  const department=useSelector(state=>state.user.department);

  const dispatch=useDispatch();

  const handleChange = (event) => {
    // setDepartment(event.target.value);
  };

  const classes = useStyles();
  
  
  return (
    <FormControl sx={{ m: 1, minWidth: "100%" }}>
      <Select
        label="st"
        value={department}
        onChange={(e)=>{dispatch(userActions.departmentAction(e.target.value))}}
        displayEmpty
        inputProps={{}}
        className={classes.formStyling}
      >
        <MenuItem value={''}>
          <h6>All Departments</h6>
        </MenuItem>
        {departments.map((data)=>{
          return  <MenuItem value={data?.label}>{data?.label}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}
