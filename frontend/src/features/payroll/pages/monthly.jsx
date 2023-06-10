
import React, { createRef, useEffect, useState } from 'react'
import Header from '../../../components/header/header'
import Sidebar from '../../../components/sidebar/sidebar'
import { Grid, makeStyles } from '@material-ui/core';
import { Box, Button, FormControl} from '@mui/material'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { adminApi } from '../../../axios/axiosData';
import SearchBar from '../ui/seachBar';
import EmployeePayTable from '../components/employeePayTable';
import DeleteModal from '../../../components/ui/modals';
import SearchandAddContainer from '../ui/Seacrhandbutton';
import DatePickterUi from '../components/datePicker';
import BlackButton from '../ui/button';
import SelectUi from '../ui/select';


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
  },
  rowContainer:{
    display:'flex',
    

  }

})

const data=[{id:1,label:'create'},{id:2,label:'unpaid'},{id:3,label:'paid'}]

const MonthlyPayScale = () => {
    const classes=useStyles();
    const [employeespay,setemployeespay]=useState([])
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(0);
    const [cookies] = useCookies(['token']);
    const [year,setYear]=useState('')
    const [month,setMonth]=useState('')
    const [status,setStatus]=useState('')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteHandler=()=>{
      const token=cookies.token;

      // api call by axios
    }


    const getYearHandler=(value)=>{
      const date=new Date(value);
      const year=date.getFullYear();
      setYear(year)
    }

    const getMonthHandler=(value)=>{
      const date=new Date(value);
      const month=date.getMonth();
      console.log(month)
      setMonth(month)
    }
    const statusHandler=(e)=>{
      const index=e.target.value;
      const value=data.find(i=>i.id===index);
      setStatus(value.label)
    }

    const submitHandler=(e)=>{
      e.preventDefault();
      const data={
        year:year,
        month:month,
        status:status
      } 
      axios.post(adminApi+"/create-payslips",data)
    }
  return (
    <Box component='div' className={classes.mainContainer}>
        <Box component='div' className={classes.sidebar}>
            <Sidebar/>
        </Box>
        <Box component='div' className={classes.column}>
            <DeleteModal handleClose={handleClose} submitHandler={deleteHandler} handleOpen={handleOpen} open={open}/>
            <Header heading={"PayScale"}/>
            <form onSubmit={submitHandler}>
            <Grid container spacing={1}  columns={5}>
                <Grid item xs={2.5}> 
                   <DatePickterUi name='year' onChange={getYearHandler} format={'YYYY'} view={'year'}/>
                </Grid> 
                <Grid item xs={2.5} > 
                  <DatePickterUi name='month' format={'MMM'} onChange={getMonthHandler} view={'month'}/>
                </Grid>
                 <Grid item xs={2.5}>
                   <SelectUi name='status' handleChange={statusHandler} data={data}/>
                </Grid>
                <Grid item >
                   <BlackButton label='Generate' />
                </Grid>
            </Grid>
            </form>

        </Box>
    </Box>
  )
}

export default MonthlyPayScale