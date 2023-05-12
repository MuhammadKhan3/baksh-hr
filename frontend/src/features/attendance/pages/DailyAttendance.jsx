import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box, Checkbox, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FiberManualRecord, CancelOutlined, CheckCircleOutlined, RadioButtonUnchecked } from '@material-ui/icons';
import {Button,Menu,MenuItem, Fade} from '@material-ui/core';
import { green, purple, red } from '@material-ui/core/colors';
import { MobileTimePicker } from '@mui/x-date-pickers';
import DepartmentDropdown from '../components/DepartmentsDropDown';
import Sidebar from '../../../components/sidebar/sidebar';
import axios from 'axios';


const useStyles = makeStyles({
  tableContainer: {
    // maxHeight: 440,
  },
  presentBtn: {
    color: green[500],
    backgroundColor: green[100],
    padding: '4px 0px',
    marginRight: 4,
  },
  absentBtn: {
    color: red[500],
    backgroundColor: red[100],
    padding: '4px 0px',
    marginRight: 4,
  },
  lateBtn: {
    color: purple[500],
    backgroundColor: purple[100],
    padding: '4px 0px',
  },
  timeinput: {
    fontSize: '16px',
    lineHeight: '20px',
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  mainContainer:{
    display:'flex',
    flexDirection:'row',
    width:'100%',

  },
  sidebar:{
    width:'25%'
  },
  impBtn:{
    backgroundColor:'#2C2F32',
    width: '97px',
    height: '40px',
    padding: '8px 14px',
    borderRadius:'10px',
    color:'white'
  },
  flexRow:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    textAlign:'center'
  }
});

const rows = [
  {
    id: 1,
    employee:'Robert Flyn',
    department: 'Sales',
    attendanceBy: 'John Doe',
    checkIn: '9:00 AM',
    checkOut: '5:00 PM',
    status: 'Present',
  },
  {
    id: 2,
    employee:'Robert Flyn',
    department: 'Marketing',
    attendanceBy: 'Jane Smith',
    checkIn: '9:15 AM',
    checkOut: '5:30 PM',
    status: 'Absent',
  },
  {
    id: 3,
    employee:'Robert Flyn',
    department: 'HR',
    attendanceBy: 'Mike Johnson',
    checkIn: '9:15 AM',
    checkOut: '5:30 PM',
    status: 'None',
  },
  {
    id: 4,
    employee:'Robert Flyn',
    department: 'Sales',
    attendanceBy: 'John Doe',
    checkIn: '9:00 AM',
    checkOut: '5:00 PM',
    status: 'Present',
  },
  {
    id: 5,
    employee:'Robert Flyn',
    department: 'Marketing',
    attendanceBy: 'Jane Smith',
    checkIn: '9:15 AM',
    checkOut: '5:30 PM',
    status: 'Absent',
  },
  {
    id: 6,
    employee:'Robert Flyn',
    department: 'HR',
    attendanceBy: 'Mike Johnson',
    checkIn: '9:15 AM',
    checkOut: '5:30 PM',
    status: 'None',
  },
  
];

const statusIcon = (status) => {
  switch (status) {
    case 'present':
        return <Chip icon={<FiberManualRecord style={{ color: 'green' }} />} label="Present" variant="outlined" />;
    //   return <FiberManualRecord style={{ color: 'green' }} /><b>Present</b>;
    case 'absent':
        return <Chip icon={<FiberManualRecord style={{ color: 'red' }} />} label="Absent" variant="outlined" />;
    case 'none':
        return <Chip icon={<FiberManualRecord />} label="None" variant="outlined" />;
    default:
      return null;
  }
};

const CustomTableCell = ({ row, name, selectedRows, handleRowCheckboxChange }) => {
  const classes = useStyles();

  console.log(row,name)
  return (
    <TableCell align="center">
      {name === 'status' ? (
        statusIcon(row[name])
      ) : name === 'checkbox' ? (
        <Checkbox checked={selectedRows.includes(row.id)} onChange={(event) => handleRowCheckboxChange(event, row)} />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const DailyAttendanceTable = () => {
  const classes = useStyles();
  const [attendance,setAttendance]=useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [checkIn, setCheckIn] = React.useState(new Date());
  const [checkOut, setCheckOut] = React.useState(new Date());
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleHeaderCheckboxChange = (event) => {
    if (event.target.checked) {
      // Select all rows
      setSelectedRows(rows.map((row) => row.id));
    } else {
      // Deselect all rows
      setSelectedRows([]);
    }
  };

  useEffect(()=>{
    const fetchAttendance=async ()=>{
       const response=await axios.get('http://localhost:8000/api/admin/get-attendances')
       console.log(response?.data)
        setAttendance(response?.data?.attendance)

    }
    fetchAttendance();
  },[])

  const handleRowCheckboxChange = (event, row) => {

    if (event.target.checked) {
      // Add row to selectedRows
      setSelectedRows([...selectedRows, row.id]);
    } else {
      // Remove row from selectedRows
      setSelectedRows(selectedRows.filter((id) => id !== row.id));
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id) => {
    setAnchorEl(null);
  }

  const importFilehandler=async (e)=>{
    // console.log()
    const file=e.target.files[0]
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/admin/create-attencdance-csv",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  }
  return (
    <div className={classes.mainContainer}>
      <Box component='div' className={classes.sidebar}>
            <Sidebar/>
      </Box>
      <div style={{margin:'auto'}}>
      <Typography variant="h3">Daily Attendance</Typography>
      <div className={classes.flexRow}>
        <DepartmentDropdown></DepartmentDropdown>
        <label htmlFor='file'>
          <a type='button' className={classes.impBtn}>Import</a>
        </label>
        <input type='file' name='file' id='file' hidden  onChange={importFilehandler}/>
      </div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Checkbox selected={selectedRows.length === rows.length} onChange={handleHeaderCheckboxChange} />
              </TableCell>
              <TableCell align="center">ID</TableCell>
              {/* <TableCell align="center">Department</TableCell> */}
              <TableCell align="center">Employee</TableCell>
              <TableCell align="center">Attendance By</TableCell>
              <TableCell style={{width: '0vw'}} align="center">Check in</TableCell>
              <TableCell style={{width: '0vw'}} align="center">Check out</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance?.map((row,i) => (
              <TableRow key={row.id}>
                  <CustomTableCell
                      selectedRows={selectedRows}
                      handleRowCheckboxChange={handleRowCheckboxChange}
                      row={row}
                      name="checkbox"
                  />
                  <CustomTableCell row={{'id':i+1}} name="id" />
                {/* <CustomTableCell row={row} name="email" /> */}
                <CustomTableCell row={row} name="name" />
                <CustomTableCell row={row} name="attendanceBy" />
                <TableCell align='right'>
                  <Box sx={{ border:'1px solid black', padding:0, borderRadius: 10, width:100, height: 40, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <MobileTimePicker
                          value={row?.checkin}
                          disabled={true}
                          views={['hours', 'minutes']} 
                          onChange={(newValue) => setCheckIn(newValue)}
                          sx={{ width: '100%', padding: 0 }}
                      />
                  </Box>
                </TableCell>
                <TableCell align='left'>
                  <Box sx={{ border:'1px solid black', padding:0, borderRadius: 10, width:100, height: 40, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <MobileTimePicker disabled={true} value={row?.checkout} sx={{ borderRadius: '50', width: 100, padding: '0px', overflow: 'hidden' }} onChange={(newValue) => setCheckOut(newValue)} views={['hours', 'minutes']} />        
                  </Box>
                </TableCell>
                <CustomTableCell row={row} name="status" />
                <TableCell align="center">
                  
                      <Button size="small" className={classes.presentBtn}>P</Button>
                      <Button size="small" className={classes.absentBtn}>A</Button>
                      <Button
                          id="fade-button"
                          aria-controls={open ? 'fade-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                          className={classes.lateBtn}
                          size="small"
                      >
                          L
                      </Button>
                      <Menu
                          id="fade-menu"
                          MenuListProps={{
                          'aria-labelledby': 'fade-button',
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          TransitionComponent={Fade}
                      >
                          <MenuItem onClick={()=>handleClose(1)}>Annual</MenuItem>
                          <MenuItem onClick={()=>handleClose(2)}>Casual</MenuItem>
                          <MenuItem onClick={()=>handleClose(3)}>Sick</MenuItem>
                      </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
       </TableContainer>
      </div>
    </div>
  
  );
};
export default DailyAttendanceTable;
