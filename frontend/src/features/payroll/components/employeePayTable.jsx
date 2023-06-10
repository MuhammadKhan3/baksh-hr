import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import {  makeStyles } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { spacing } from '@mui/system';
import { Avatar, Box, Typography } from '@mui/material';
import active from '../../../images/employee/active.svg'
import inactive from '../../../images/employee/inactive.svg'
import edit from '../../../images/employee/edit.svg'
import eye from '../../../images/employee/eye.svg'
import deleteIcon from '../../../images/employee/delete.svg'
import axios from 'axios';
import { adminApi, publicApi, url } from '../../../axios/axiosData';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import BlackButton from '../ui/button';
import SalaryPDF from './pdf';


//employeespay
// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

const rows = [
  { id: 1, name: 'ahmad', department:'marketing',designation:'manager',status:'active', basicpay:'45000', basicpay:'45000', houserent:'10,000', travelling:'10,000', loan:'10,000', taxes:'10,000' },
  { id: 1, name: 'muhammad',department:'Human',designation:'hr',status:'active', basicpay:'45000', houserent:'10,000', travelling:'10,000', loan:'10,000', taxes:'10,000' },
  { id: 1, name: 'zain', department:'marketing',designation:'manager',status:'inactive', basicpay:'45000', houserent:'10,000', travelling:'10,000', loan:'10,000', taxes:'10,000' },
  { id: 1, name: 'jabbarkhan',department:'marketing',designation:'manager',status:'inactive', basicpay:'45000', houserent:'10,000', travelling:'10,000', loan:'10,000', taxes:'10,000' },
  { id: 1, name: 'ahmaddf',department:'marketing',designation:'manager',status:'inactive', basicpay:'45000', houserent:'10,000', travelling:'10,000', loan:'10,000', taxes:'10,000' },
];

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'employee', label: 'Employee' },
  { id: 'designation', label: 'Designation' },
  { id: 'basicpay', label: 'Basic Pay' },
  { id: 'allowances', label: 'Allowances' },
  { id: 'deductions', label: 'Deduction' },
  { id: 'action', label: 'Action' },
];

const useStyles=makeStyles({
  
  nameContainer:{
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600 !important',
    fontSize: '12px !important',
    // linehHeight: '18px',
    letterSpacing: '-0.02em',
    color: '#2C2F32',
  },
  depdisContainer:{
    //styleName: 12 B;
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '18px',
    letterSpacing: '-0.02em',
    textAlign: 'left',
    color:'#868B90'
  },
  inActiveContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    padding: '3px 8px',
    width: '65px',
    height: '20px',
    border: '1px solid #2C2F32',
    borderRadius: '32px',
  },
  tableCotainer:{
    border: '1px solid #E1E1E1',
    borderRadius: '11px',
    width:'100%',
    marginTop:'1%'
  },
  tableHeader:{
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '10px',
    lineHeight: '15px',
    color:'#2C2F32',
    /* identical to box height */

    letterSpacing: '-0.02em',
  },
  headerText:{
    //styleName: 10 B;
    fontFamily: 'Poppins',
    fontSize: '10px',
    fontWeight: '600 !important',
    lineHeight: '15px',
    letterSpacing: '-0.02em',
    textAlign: 'left'

  },
  tableCell:{
    padding:'10px'
  },
  actionContainer:{
    display:'flex',
    gap:'10px',
    flexDirection:'row'
  },
  iconDiv:{
      width: '38px',
    height: '38px',
    background: '#FFFFFF',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    boxShadow: '0px 1px 7px -2px rgba(0, 0, 0, 0.15)',
    borderRadius: '7px',
    cursor:'pointer'
  },
  editIcon:{
    '&:hover':{
      background: '#ECF7FB',
    },
    '&:active':{
      color:'white',
      fill:'white',
      background:'#46B7DA',
      '& > img': {
        color: 'white',
      },
    }
  },
  deleteIconc:{
    '&:hover':{
      background:'#FFEEEE'
    },
    '&:active':{
      background: '#FD5858'
    }
  },
  checked: {},
})

const EmployeePayTable = ({payslips,search,setsearch,handleOpen,setDelete}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const classes=useStyles();
  const [cookies] = useCookies(['token']);
  // const [search,setsearch]=useState('');




  return (
    <div className={classes.tableCotainer}>
      <TableContainer  >
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeader} >
              {columns

              .map((column) => (
                <TableCell className={`${classes.tableCell} ${classes.headerText}`}  key={column.id}>{column.label==='ID' ? <><Checkbox />{column.label}</> :column.label }</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payslips
              .map((row,index) => (
                <TableRow key={row.id}>
                    <TableCell className={classes.tableCell}>
                      <Checkbox   color="primary" 
                        classes={{
                          root: classes.root,
                          checked: classes.checked,
                        }}
                      />                      
                         {index+1}
                    </TableCell>
                    <TableCell className={`${classes.tableCell} ${classes.nameContainer}`}>
                       {row?.name}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {row?.designation}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {`${row?.salary} RS`}
                     </TableCell>
                     {row?.allowances?.slice(0,2)?.map((item)=>{
                         return <>
                          <TableCell className={classes.tableCell}>
                            <Typography variant='body1' className={classes.depdisContainer} sx={{textAlignLast:'justify'}}>
                              {item?.allowance}
                            </Typography>
                            <Typography variant='body1' className={classes.depdisContainer}  sx={{textAlignLast:'justify'}}>
                                  {item?.deduction}
                                  </Typography>
                          </TableCell>

                         </>
                     })}                     
                     <TableCell className={classes.tableCell}>
                        <Box className={classes.actionContainer}>
                          <NavLink to={`/edit/payscale/${row.id}`}>
                            <Box component='div' className={`${classes.iconDiv} ${classes.editIcon}`}>
                              <img src={edit} className={classes.icons} />
                            </Box>
                          </NavLink>
                          <Box onClick={(e)=>{handleOpen(e);setDelete(row?.id)}} component='div' className={`${classes.iconDiv} ${classes.deleteIconc}`}>
                              <img src={deleteIcon} className={classes.icons}/>
                          </Box>
                        </Box>
                     </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        style={{display:'flex',flexDirection:'flex-start'}}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={({ from, to, count }) => {
                return `Showing ${from} to ${to} of ${3} entries`;
        }}
      />
    </div>
  );
};

export default EmployeePayTable;




export const EmployeePayslipTable = ({payslips,search,setsearch,handleOpen,setDelete}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const classes=useStyles();
  const [cookies] = useCookies(['token']);
  // const [search,setsearch]=useState('');
  const salary = [{
    name: 'John Doe',
    amount: 5000,
  }];
  return (
    <div className={classes.tableCotainer}>
      <TableContainer  >
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeader} >
              {columns
              .map((column) => (
                <TableCell className={`${classes.tableCell} ${classes.headerText}`}  key={column.id}>{column.label==='ID' ? <><Checkbox />{column.label}</> :column.label }</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payslips
              .map((row,index) => (
                <TableRow key={row.id}>
                    <TableCell className={classes.tableCell}>
                      <Checkbox   color="primary" 
                        classes={{
                          root: classes.root,
                          checked: classes.checked,
                        }}
                      />                      
                         {index+1}
                    </TableCell>
                    <TableCell className={`${classes.tableCell} ${classes.nameContainer}`}>
                       {row?.name}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {row?.designation}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {`${row?.salary} RS`}
                     </TableCell>
                     {row?.allowances?.map((item)=>{
                         return <>
                          <TableCell className={classes.tableCell}>
                            <Typography variant='body1' className={classes.depdisContainer} sx={{textAlignLast:'justify'}}>
                              {item?.allowance}
                            </Typography>
                            <Typography variant='body1' className={classes.depdisContainer}  sx={{textAlignLast:'justify'}}>
                                  {item?.deduction}
                                  </Typography>
                          </TableCell>

                         </>
                     })}    
                     <TableCell className={classes.tableCell}>
                        <SalaryPDF data={row}/>
                     </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        style={{display:'flex',flexDirection:'flex-start'}}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={({ from, to, count }) => {
                return `Showing ${from} to ${to} of ${2} entries`;
        }}
      />
    </div>
  );
};