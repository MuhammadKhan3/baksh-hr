import { Box, ListItem} from '@mui/material'
import React, { useState } from 'react'
import { List } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import ViewDetails from './viewDetails';
import AccountLogin from './accountLogin';

const useStyles=makeStyles({
  innerContainer:{
    position:'relative',
    // marginTop:'2rem',
    // left:'3rem',
    // top:'2rem',
    borderRight: '2px solid #E1E1E1',
    width:'fit-content',
    width:'20%',
    // paddingRight:'1.1rem'
  },
  listContainer:{
    display:'flex',
    flexDirection:'column',
    width:'100%',
    gap:'10px',
    justifyContent:'flex-end'
  },
  listItem:{
    //styleName: 14 B;
    display:'flex',
    justifyContent:'flex-end !important',
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '21px',
    letterSpacing: '-0.02em',
    textAlign: 'right',
    color:'#868B90',
    cursor:'pointer',
    width:'100% !important'
  },
  borderRight:{
    outline:'3px solid black',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    height:'auto'
  },
  mainContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'start',
    marginTop:'1rem',
    width:"100%",
  }
})
const ViewDetailList = ({employee}) => {
  const classes=useStyles();
  const [label,setLabel]=useState('personal')

  return (<Box component='div' className={classes.mainContainer}>
            <Box className={classes.innerContainer}>
              <List className={classes.listContainer}>
                <ListItem onClick={()=>{setLabel('personal')}} className={classes.listItem}>
                  Personal 
                </ListItem>
                <ListItem onClick={()=>{setLabel('attendance')}} className={classes.listItem}>
                  Attendance
                </ListItem>
                <ListItem onClick={()=>{setLabel('financial')}} className={classes.listItem}>
                  Financial
                </ListItem>
                <ListItem onClick={()=>{setLabel('document&files')}} className={classes.listItem}>
                  Document & Files
                </ListItem>
                <ListItem onClick={()=>{setLabel('emergency')}} className={classes.listItem}>
                  Emergency
                </ListItem>
                <ListItem onClick={()=>{setLabel('accountLogin')}} className={classes.listItem}>
                  Account Login
                </ListItem>
                <ListItem onClick={()=>{setLabel('assignedEquipment')}} className={classes.listItem}>
                  Assigned Equipment
                </ListItem>
                <ListItem onClick={()=>{setLabel('reimbursement')}} className={classes.listItem}>
                  Reimbursement
                </ListItem>
                <ListItem onClick={()=>{setLabel('loan&AdvancePayment')}} className={classes.listItem}>
                  Loan & Advance Payment
                </ListItem>
                <ListItem onClick={()=>{setLabel('payroll')}} className={classes.listItem}>
                  Payroll
                </ListItem>
                
              </List>
            </Box>
            <ViewDetails employee={employee} label={label}/>
    </Box>
  )
}

export default ViewDetailList