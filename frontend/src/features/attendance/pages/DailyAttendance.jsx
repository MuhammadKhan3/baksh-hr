import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box, Checkbox, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FiberManualRecord, CancelOutlined, CheckCircleOutlined, RadioButtonUnchecked } from '@material-ui/icons';
import {Button,Menu,MenuItem, Fade} from '@material-ui/core';
import { green, purple, red } from '@material-ui/core/colors';
import { MobileTimePicker } from '@mui/x-date-pickers';
import DepartmentDropdown from '../components/DepartmentsDropDown';


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
    case 'Present':
        return <Chip icon={<FiberManualRecord style={{ color: 'green' }} />} label="Present" variant="outlined" />;
    //   return <FiberManualRecord style={{ color: 'green' }} /><b>Present</b>;
    case 'Absent':
        return <Chip icon={<FiberManualRecord style={{ color: 'red' }} />} label="Absent" variant="outlined" />;
    case 'None':
        return <Chip icon={<FiberManualRecord />} label="None" variant="outlined" />;
    default:
      return null;
  }
};

const CustomTableCell = ({ row, name, selectedRows, handleRowCheckboxChange }) => {
  const classes = useStyles();


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


  return (
    <div style={{margin:'auto'}}>
      <Typography variant="h3">Daily Attendance</Typography>
      <DepartmentDropdown></DepartmentDropdown>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
            <TableCell align="center">
                <Checkbox selected={selectedRows.length === rows.length} onChange={handleHeaderCheckboxChange} />
              </TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Department</TableCell>
              <TableCell align="center">Employee</TableCell>
              <TableCell align="center">Attendance By</TableCell>
              <TableCell style={{width: '0vw'}} align="center">Check in</TableCell>
              <TableCell style={{width: '0vw'}} align="center">Check out</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                  <CustomTableCell
                      selectedRows={selectedRows}
                      handleRowCheckboxChange={handleRowCheckboxChange}
                      row={row}
                      name="checkbox"
                  />
                  <CustomTableCell row={row} name="id" />
                <CustomTableCell row={row} name="employee" />
                <CustomTableCell row={row} name="department" />
                <CustomTableCell row={row} name="attendanceBy" />
                <TableCell align='right'>
                  <Box sx={{ border:'1px solid black', padding:0, borderRadius: 10, width:100, height: 40, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <MobileTimePicker
                          views={['hours', 'minutes']} 
                          onChange={(newValue) => setCheckIn(newValue)}
                          sx={{ width: '100%', padding: 0 }}
                      />
                  </Box>
                </TableCell>
                <TableCell align='left'>
                  <Box sx={{ border:'1px solid black', padding:0, borderRadius: 10, width:100, height: 40, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <MobileTimePicker sx={{ borderRadius: '50', width: 100, padding: '0px', overflow: 'hidden' }} onChange={(newValue) => setCheckOut(newValue)} views={['hours', 'minutes']} />        
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
  );
};

export default DailyAttendanceTable;
