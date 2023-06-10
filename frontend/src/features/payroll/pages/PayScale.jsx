
import React, { createRef, useContext, useEffect, useState } from 'react'
import Header from '../../../components/header/header'
import Sidebar from '../../../components/sidebar/sidebar'
import { makeStyles } from '@material-ui/core';
import { Box, Button, FormControl} from '@mui/material'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { adminApi } from '../../../axios/axiosData';
import SearchBar from '../ui/seachBar';
import EmployeePayTable, { EmployeePayslipTable } from '../components/employeePayTable';
import DeleteModal from '../../../components/ui/modals';
import SearchandAddContainer from '../ui/Seacrhandbutton';
import { UserContext } from '../../../App';


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
    const [search,setsearch]=useState('');
    const [payslips,setPayslips]=useState([])
    const [open, setOpen] = React.useState(false);
    const {role}=useContext(UserContext);
    
    const [deleteId, setDeleteId] = React.useState(0);
    const [cookies] = useCookies(['token']);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const token=cookies.token;

    const deleteHandler=async ()=>{
      const response=await axios.delete(adminApi+`/payslip/${deleteId}`);
      console.log(response?.data?.flag,typeof(response?.data?.flag))
      if(response?.data?.flag===true){
        window.location.reload();
      }
    }

    useEffect(()=>{
      const fetchPayslips=async ()=>{
        console.log(token)
        const response=await axios.get(adminApi+`/get-payslips?search=${search}&role=${role}`,{
          headers:{
            authorization:'Bearer '+ token,
          },
          timeout: 2000
        });
        setPayslips(response?.data?.payslips)
      }
      const timer=setTimeout(fetchPayslips, 2000);
      return ()=>{
        clearTimeout(timer)
      }      
    },[search])

    console.log(search)
    console.log(payslips)
  return (
    <Box component='div' className={classes.mainContainer}>
        <Box component='div' className={classes.sidebar}>
            <Sidebar/>
        </Box>
        <Box component='div' className={classes.column}>
            <DeleteModal title={'Delete'} handleClose={handleClose} submitHandler={deleteHandler} handleOpen={handleOpen} open={open}/>
            
            <Header heading={"PayScale"}/>
            <Box component='div' className={classes.searchContainer}>
              <SearchandAddContainer setsearch={setsearch}/>
            </Box>
            {role==='hr' ?
             <EmployeePayTable payslips={payslips} setDelete={setDeleteId} handleOpen={handleOpen} />
            :role==='employee' && <EmployeePayslipTable payslips={payslips} setDelete={setDeleteId} handleOpen={handleOpen}/> 
            }
        </Box>
    </Box>
  )
}

export default PayrollScale