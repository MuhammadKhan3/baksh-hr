
import React, { createRef, useEffect, useState } from 'react'
import Header from '../../../components/header/header'
import Sidebar from '../../../components/sidebar/sidebar'
import { makeStyles } from '@material-ui/core';
import { Box, Button, FormControl} from '@mui/material'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { adminApi } from '../../../axios/axiosData';
import SearchBar from '../ui/seachBar';
import EmployeePayTable from '../components/employeePayTable';
import DeleteModal from '../../../components/ui/modals';
import SearchandAddContainer from '../ui/Seacrhandbutton';


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
  },
  searchContainer:{
    width:'22%'
  }

})


const PayrollScale = () => {
    const classes=useStyles();
    const [employeespay,setemployeespay]=useState([])
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(0);
    const [cookies] = useCookies(['token']);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteHandler=()=>{
      const token=cookies.token;

      // api call by axios
    }
  return (
    <Box component='div' className={classes.mainContainer}>
        <Box component='div' className={classes.sidebar}>
            <Sidebar/>
        </Box>
        <Box component='div' className={classes.column}>
            <DeleteModal handleClose={handleClose} submitHandler={deleteHandler} handleOpen={handleOpen} open={open}/>
            <Header heading={"PayScale"}/>
            <Box component='div' className={classes.searchContainer}>
              <SearchandAddContainer setemployeespay={setemployeespay}/>
            </Box>
            <EmployeePayTable employeespay={employeespay} setDelete={setDeleteId} handleOpen={handleOpen} setemployeespay={setemployeespay}/>
        </Box>
    </Box>
  )
}

export default PayrollScale