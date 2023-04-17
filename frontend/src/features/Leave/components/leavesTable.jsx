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
import edit from '../../../images/leaves/edit.svg'
import approve from '../../../images/leaves/approve.svg'
import reject from '../../../images/leaves/reject.svg'
import deleteIcon from '../../../images/employee/delete.svg'
import axios from 'axios';
import { adminApi, publicApi, url } from '../../../axios/axiosData';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import moment from 'moment'
import LockIcon from '@mui/icons-material/Lock';
import DepartmentThunk from '../../../redux/thunk/departmentThunk';
import { useSelector } from 'react-redux';




const rows = [
  { id: 1, name: 'ahmad', email: "ahmad327@gmail.com",department:'marketing',designation:'manager',status:'active' },
  { id: 1, name: 'muhammad', email: "muhammad327@gmail.com",department:'Human',designation:'hr',status:'active' },
  { id: 1, name: 'zain', email: "zain327@gmail.com",department:'marketing',designation:'manager',status:'inactive' },
  { id: 1, name: 'jabbarkhan', email: "jabbar327@gmail.com",department:'marketing',designation:'manager',status:'inactive' },
  { id: 1, name: 'ahmaddf', email: "ahmad3273344@gmail.com",department:'marketing',designation:'manager',status:'inactive' },
];

const columnsEmployee = [
  { id: 'id', label: 'ID' },
  { id: 'employee', label: 'Employee' },
  { id: 'department', label: 'Department' },
  { id: 'leaveType', label: 'Leave Type' },
  { id: 'duration', label: 'Duration' },
  { id: 'date', label: 'Date' },
  {id:'reason',label:'Reason'},
  { id: 'status', label: 'Status' },
];

const columnsManager = [
  { id: 'id', label: 'ID' },
  { id: 'employee', label: 'Employee' },
  { id: 'department', label: 'Department' },
  { id: 'leaveType', label: 'Leave Type' },
  { id: 'duration', label: 'Duration' },
  { id: 'date', label: 'Date' },
  {id:'reason',label:'Reason'},
  { id: 'status', label: 'Status' },
  { id: 'action', label: 'Action' },
];


const columnsHr = [
  { id: 'id', label: 'ID' },
  { id: 'employee', label: 'Employee' },
  { id: 'department', label: 'Department' },
  { id: 'leaveType', label: 'Leave Type' },
  { id: 'duration', label: 'Duration' },
  { id: 'date', label: 'Date' },
  {id:'reason',label:'Reason'},
  { id: 'status', label: 'Status' },
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

  approve:{
    width: '38px',
    height: '38px',
    background: '#EAF9F0',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    boxShadow: '0px 1px 7px -2px rgba(0, 0, 0, 0.15)',
    borderRadius: '7px',
    cursor:'pointer'

  },
  reject:{
    width: '38px',
    height: '38px',
    background: '#FFEEEE',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    boxShadow: '0px 1px 7px -2px rgba(0, 0, 0, 0.15)',
    borderRadius: '7px',
    cursor:'pointer'
  },
  edit:{
    width: '38px',
    height: '38px',
    background: '#ECF7FB',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    boxShadow: '0px 1px 7px -2px rgba(0, 0, 0, 0.15)',
    borderRadius: '7px',
    cursor:'pointer'
  },
  checked: {},
})

// LeaveTable by default
export default function LeaveTableHr  ({employees=[],setemployees,handleOpen,setDelete,search,departmentId}) {
  const [page, setPage] = useState(0);
  const [totalPages,setTotalPages]=useState(0);
  const [totalData,setTotalData]=useState(0);
  const [data,setdata]=useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(6);



  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage)
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };
  const classes=useStyles();
  const [cookies] = useCookies(['token']);;


  useEffect(()=>{
    const token=cookies.token;
    console.log(departmentId)
    axios
     .get(adminApi+`/get-leaves-Employees-hr?search=${search}&page=${page+1}&departmentId=${departmentId}`,{
        headers:{
            authorization: `Bearer ${token}`,
        }
     })
     .then((response)=>{
        console.log(response)
        setdata(response?.data?.response?.leaves);
        setTotalData(response?.data?.response?.totalData)
        setTotalPages(response?.data?.response?.totalPages);
        setPage(0)
     })
 
  },[search,departmentId])


  return (
    <div className={classes.tableCotainer}>
      <TableContainer  >
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeader} >
              {columnsHr.map((column) => (
                <TableCell className={`${classes.tableCell} ${classes.headerText}`}  key={column.id}>{column.label==='ID' ? <>{column.label}</> :column.label }</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => (
                <TableRow key={row.id}>
                    <TableCell className={classes.tableCell}>
                         {row?.id}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Box className={classes.avatarContainer}>
                          {/* <Avatar alt="Remy Sharp" sx={{width:'34px',height:'34px'}} src={url+row?.profile} /> */}
                          <Box sx={{marginLeft:'8px'}}>
                            <Typography variant='body1' className={classes.nameContainer}>
                                {/* {row?.name} */}
                                {row?.users?.name}
                            </Typography>
                            {/* <Typography variant='body1' className={classes.emailType}>
                                {row?.email}
                            </Typography> */}
                          </Box>
                      </Box>
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {/* {row?.department} */}
                       {row?.users?.employeeData?.employee_company?.department?.department}
                     </TableCell>
                    <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                        {row?.leavetype?.leaveType}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                        {row?.leaves} Days
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                     {moment(row?.startDate).format('Do MMM')}- {moment(row?.endDate).format('Do MMM')}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {row?.reason}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {row?.status}
                     </TableCell>
                     <TableCell className={classes.tableCell}>
                        <Box className={classes.actionContainer}>
                          {/* <NavLink to={`/view-employee/${row.id}`}>
                            <Box component='div' className={`${classes.approve} ${classes.eyeIcon}`}>
                              <img src={approve}  className={classes.icons}/>
                            </Box>
                          </NavLink>
                          <NavLink to={`/edit-employee/${row.id}`}>
                            <Box component='div' className={`${classes.reject} ${classes.editIcon}`}>
                              <img src={reject} className={classes.icons} />
                            </Box>
                          </NavLink> */}
                          <NavLink to={`/edit-leave/${row.id}`}>
                          <Box  component='div' className={`${classes.edit} `}>
                              <img src={edit} className={classes.icons}/>
                          </Box>
                          </NavLink>                         
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
        onPageChange={handleChangePage}
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={({ from, to, count }) => {
                return `Showing ${from} to ${to} entries ${count}`;
        }}
      />
    </div>
  );
};



// Leave Table Employee
export const LeaveTableEmployee = ({search,filter}) => {
  const [page, setPage] = useState(0);
  const [totalPages,setTotalPages]=useState(0);
  const [totalData,setTotalData]=useState(0);
  const [data,setdata]=useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(6)
  console.log(filter)
  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage)
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };
  const classes=useStyles();
  const [cookies] = useCookies(['token']);;


  useEffect(()=>{
    const token=cookies.token;
    axios
     .get(adminApi+`/get-leaves-employee?search=${search}&page=${page+1}&filter=${filter}`,{
        headers:{
            authorization: `Bearer ${token}`,
        }
     })
     .then((response)=>{
        console.log(response)
        setdata(response?.data?.response?.leaves);
        setTotalData(response?.data?.response?.totalData)
        setTotalPages(response?.data?.response?.totalPages);
        setPage(0)
     })

  },[search,filter])


  return (
    <div className={classes.tableCotainer}>
      <TableContainer  >
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeader} >
              {columnsEmployee.map((column) => (
                <TableCell className={`${classes.tableCell} ${classes.headerText}`}  key={column.id}>{column.label==='ID' ? <>{column.label}</> :column.label }</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => (
                <TableRow key={row.id}>
                    <TableCell className={classes.tableCell}>
                         {row?.id}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Box className={classes.avatarContainer}>
                          {/* <Avatar alt="Remy Sharp" sx={{width:'34px',height:'34px'}} src={url+row?.profile} /> */}
                          <Box sx={{marginLeft:'8px'}}>
                            <Typography variant='body1' className={classes.nameContainer}>
                                {/* {row?.name} */}
                                {row?.users?.name}
                            </Typography>
                            {/* <Typography variant='body1' className={classes.emailType}>
                                {row?.email}
                            </Typography> */}
                          </Box>
                      </Box>
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {/* {row?.department} */}
                       {row?.users?.employeeData?.employee_company?.department?.department}
                     </TableCell>
                    <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                        {row?.leavetype?.leaveType}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                        {row?.leaves} Days
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                     {moment(row?.startDate).format('Do MMM')}- {moment(row?.endDate).format('Do MMM')}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {row?.reason}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {row?.status}
                     </TableCell>
                     {/* <TableCell className={classes.tableCell}>
                        <Box className={classes.actionContainer}>
                          <Box onClick={(e)=>{handleOpen(e);setDelete(row?.id)}} component='div' className={`${classes.edit} ${classes.deleteIconc}`}>
                              <img src={edit} className={classes.icons}/>
                          </Box>
                        </Box>
                     </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        style={{display:'flex',flexDirection:'flex-start'}}
        onChangePage={handleChangePage}
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={({ from, to, count }) => {
                return `Showing ${from} to ${to} entries ${count}`;
        }}
      />
    </div>
  );
};


export const LeaveTableManagerEmployees= ({search,setApprovalData,filter}) => {
  const [page, setPage] = useState(0);
  const [totalPages,setTotalPages]=useState(0);
  const [totalData,setTotalData]=useState(0);
  const [data,setdata]=useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(6)

  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage)
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };
  const classes=useStyles();
  const [cookies] = useCookies(['token']);;
  const token=cookies.token;


  useEffect(()=>{
    
    axios
     .get(adminApi+`/get-leaves-manager?search=${search}&page=${page+1}&filter=${filter}`,{
        headers:{
            authorization: `Bearer ${token}`,
        }
     })
     .then((response)=>{
        console.log(response)

        setdata(response?.data?.response?.leaves);
        setTotalData(response?.data?.response?.totalData)
        setTotalPages(response?.data?.response?.totalPages);
        setPage(0)
     })

  },[search,filter])


 

  return (
    <div className={classes.tableCotainer}>
      <TableContainer  >
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeader} >
              {columnsManager.map((column) => (
                <TableCell className={`${classes.tableCell} ${classes.headerText}`}  key={column.id}>{column.label==='ID' ? <>{column.label}</> :column.label }</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => (
                <TableRow key={row.id}>
                    <TableCell className={classes.tableCell}>
                         {row?.id}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Box className={classes.avatarContainer}>
                          {/* <Avatar alt="Remy Sharp" sx={{width:'34px',height:'34px'}} src={url+row?.profile} /> */}
                          <Box sx={{marginLeft:'8px'}}>
                            <Typography variant='body1' className={classes.nameContainer}>
                                {/* {row?.name} */}
                                {row?.users?.name}
                            </Typography>
                            {/* <Typography variant='body1' className={classes.emailType}>
                                {row?.email}
                            </Typography> */}
                          </Box>
                      </Box>
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {/* {row?.department} */}
                       {row?.users?.employeeData?.employee_company?.department?.department}
                     </TableCell>
                    <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                        {row?.leavetype?.leaveType}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                        {row?.leaves} Days
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                     {moment(row?.startDate).format('Do MMM')}- {moment(row?.endDate).format('Do MMM')}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {row?.reason}
                     </TableCell>
                     <TableCell className={`${classes.tableCell} ${classes.depdisContainer}`}>
                       {row?.status}
                     </TableCell>
                     <TableCell className={classes.tableCell}>
                        <Box className={classes.actionContainer}>
                          {row?.status==='reject' || row?.status==='approve' ?
                              <LockIcon sx={{color:'white',borderRadius:'50%',backgroundColor:'#C49150',width:'30px',height:'30px',padding:'3px'}}/>
                               :
                              <>
                                <Box component='div' className={`${classes.approve} ${classes.eyeIcon}`}  onClick={()=>{setApprovalData({status:'approve',leaveId:row?.id})}}>
                                  <img src={approve}  className={classes.icons}/>
                                </Box>
                                <Box component='div' className={`${classes.reject} ${classes.editIcon}`} onClick={()=>{setApprovalData({status:'reject',leaveId:row?.id})}}>
                                  <img src={reject} className={classes.icons} />
                                </Box>
                              </> 
                          }
                          {/* <Box onClick={(e)=>{handleOpen(e);setDelete(row?.id)}} component='div' className={`${classes.edit} ${classes.deleteIconc}`}>
                              <img src={edit} className={classes.icons}/>
                          </Box> */}
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
        onChangePage={handleChangePage}
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={({ from, to, count }) => {
                return `Showing ${from} to ${to} entries ${count}`;
        }}
      />
    </div>
  );
};
