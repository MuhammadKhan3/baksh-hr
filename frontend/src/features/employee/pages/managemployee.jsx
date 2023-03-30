import { Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import Header from '../../../components/header/header'
import Sidebar from '../../../components/sidebar/sidebar'
import { makeStyles } from '@material-ui/core';
import { Box, Button, FormControl} from '@mui/material'
import EmployeLeft from '../components/employeLeft';
import EmployeeRight from '../components/employeeRight';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeThunk from '../../../redux/thunk/employeeThunk';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { adminApi } from '../../../axios/axiosData';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import TopHeader from '../ui/seachBar';
import SearchBar from '../ui/seachBar';
import EmployeeTable from '../components/employeeTable';
import Modal from '../../../components/ui/modal';
import DeleteModal from '../../../components/ui/modal';



const useStyles=makeStyles({
  mainContainer:{
    display:'flex',
    flexDirection:'row',
    width:'100%',

  },
  sidebar:{
    width:'25%'
  },
  employee:{
    display:'flex',
    flexDirection:'row',
    padding:'2rem',
    width:'100%'
  },
  // #E1E1E1
  sideBorder:{
    borderRight: '1px solid #E1E1E1;',
    width:'0px',
    height:'auto',
    margin:'0 5vw',
  },
  formikDiv:{
    // display:'flex',
    // flexDirection:'row',
    width:'100%'
  },
  column:{
    display:'flex',
    flexDirection:'column',
    width:'70%'
  }

})


const Managemployee = () => {
    const classes=useStyles();
    const [employees,setemployees]=useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <Box component='div' className={classes.mainContainer}>
        <Box component='div' className={classes.sidebar}>
            <Sidebar/>
        </Box>
        <Box component='div' className={classes.column}>
            <DeleteModal handleClose={handleClose} handleOpen={handleOpen} open={open}/>
            <Header heading={"Manage Employee"}/>
            <SearchBar setemployees={setemployees}/>
            <EmployeeTable employees={employees} handleOpen={handleOpen} setemployees={setemployees}/>
        </Box>
    </Box>
  )
}

export default Managemployee