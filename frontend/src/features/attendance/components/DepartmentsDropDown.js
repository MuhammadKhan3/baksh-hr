import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    select: {
      width: '300px',
      margin: 10,
      borderRadius: 5,
      backgroundColor: 'transparent',
      margin:0,
    },
  }));
  

const DepartmentDropdown = () => {
  const classes = useStyles();
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <div>
        <h4>Departments</h4>
        <div style={{overflow:'hidden',padding:'0px', margin:'10px', marginLeft:'0px', borderRadius:'10px', width:'300px', border:'1px solid black', height:'30px'}}>
            <Select
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className={classes.select}
                >
                <MenuItem value=""> &nbsp; Select Department</MenuItem>
                <MenuItem value="sales"> &nbsp; Sales</MenuItem>
                <MenuItem value="marketing"> &nbsp; Marketing</MenuItem>
                <MenuItem value="engineering"> &nbsp; Engineering</MenuItem>
                <MenuItem value="finance"> &nbsp; Finance</MenuItem>
                <MenuItem value="all"> &nbsp; All Departments</MenuItem>
            </Select>
        </div>
    </div>
  );
};

export default DepartmentDropdown;
