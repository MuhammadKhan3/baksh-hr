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




const rows = [
  { id: 1, name: 'ahmad', email: "ahmad327@gmail.com",department:'marketing',designation:'manager',status:'active' },
  { id: 1, name: 'muhammad', email: "muhammad327@gmail.com",department:'Human',designation:'hr',status:'active' },
  { id: 1, name: 'zain', email: "zain327@gmail.com",department:'marketing',designation:'manager',status:'inactive' },
  { id: 1, name: 'jabbarkhan', email: "jabbar327@gmail.com",department:'marketing',designation:'manager',status:'inactive' },
  { id: 1, name: 'ahmaddf', email: "ahmad3273344@gmail.com",department:'marketing',designation:'manager',status:'inactive' },
];

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'employee', label: 'Employees' },
  { id: 'department', label: 'Department' },
  { id: 'designation', label: 'Designation' },
  { id: 'status', label: 'status' },
  { id: 'action', label: 'Action' },
];

const useStyles=makeStyles({
  mainContainer:{

  },
  MuiCheckbox:{
    border: '1.5px solid #E1E1E1',
    borderRadius: '4px',
  },
  avatarContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'start'
  },
  emailType:{
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400 !important',
    fontSize: '12px !important',
    lineHeight: '18px',
    letterSpacing: '-0.02em',
    color: '#868B90',
  },
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
  statusContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    padding: '3px 8px',
    width: '58px',
    height: '20px',

    border: '1px solid #2C2F32',
    borderRadius: '32px',
  },
  status:{
    //styleName: 10 B;

    fontFamily: 'Poppins',
    fontSize: '10px !important',
    fontWeight: '600 !important',
    lineHeight: '15px',
    letterSpacing: '-0.02em',
    textAlign: 'left',
    marginLeft:'4px !important',
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
  icons:{

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
  eyeIcon:{
    '&:hover':{
      background:'#F1ECFD'
    },
    '&:active':{
      background: '#7549EB'
    }
  },
  checked: {},
})

const EmployeeTable = ({employees,setemployees,handleOpen,setDelete}) => {
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
  const [search,setsearch]=useState('');

  useEffect(()=>{
    const fetchManager=async ()=>{
      const token=cookies.token;
      const response=await axios.get(adminApi+'/get-employees',{
        headers:{
          authorization: `Bearer ${token}`,
        }
      });
      setemployees(response?.data?.employees)
      // console.log('hit',)

    }
    fetchManager();
  },[search])


  return (
    <div className={classes.tableCotainer}>
      <TableContainer  >
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeader} >
              {columns.map((column) => (
                <TableCell className={`${classes.tableCell} ${classes.headerText}`}  key={column.id}>{column.label==='ID' ? <><Checkbox />{column.label}</> :column.label }</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                    <TableCell className={classes.tableCell}>
                      <Box className={classes.avatarContainer}>
                          <Avatar alt="Remy Sharp" sx={{width:'34px',height:'34px'}} src={url+row?.profile} />
                          <Box sx={{marginLeft:'8px'}}>
                            <Typography variant='body1' className={classes.nameContainer}>
                                {row?.name}
                            </Typography>
                            <Typography variant='body1' className={classes.emailType}>
                                {row?.email}
                            </Typography>
                          </Box>
                      </Box>
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {row?.department}
                     </TableCell>
                    <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {row?.designation}
                     </TableCell>
                     <TableCell className={classes.tableCell }>
                     {row?.status?.trim()==='active'
                           ?
                            <Box component='div' className={classes.statusContainer}>
                                    <img src={active} style={{width:'5px'}}/>
                                    <Typography component='h4' className={classes.status}>
                                        {row.status}
                                    </Typography>
                            </Box>
                           :
                            <Box component='div' className={classes.inActiveContainer}>                
                                <img src={inactive} style={{width:'5px'}}/>
                                <Typography component='h4' className={classes.status}>
                                    {row.status}
                                </Typography>
                              </Box>
                           }
                     </TableCell>
                     <TableCell className={classes.tableCell}>
                        <Box className={classes.actionContainer}>
                          <NavLink to={`/view-employee/${row.id}`}>
                            <Box component='div' className={`${classes.iconDiv} ${classes.eyeIcon}`}>
                              <img src={eye}  className={classes.icons}/>
                            </Box>
                          </NavLink>
                          <NavLink to={`/edit-employee/${row.id}`}>
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
                return `Showing ${from} to ${to} of ${count} entries`;
        }}
      />
    </div>
  );
};

export default EmployeeTable;
