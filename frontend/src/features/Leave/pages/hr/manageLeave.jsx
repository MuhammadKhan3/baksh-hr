import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../../../../components/sidebar/sidebar";

import Header from "../../../../components/header/header";
import LeaveTable from "../../components/leavesTable";
import SelectUi from "../../../../components/ui/select";
import SearchBar from "../../ui/searchBar";
import LeaveTableHr from "../../components/leavesTable";
import DepartmentThunk from "../../../../redux/thunk/departmentThunk";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    width: "100%",
  },
  sidebar: {
    width: "25%",
  },
  table: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  module:{
    width:'75%',
    marginRight:'2%',
    // display:'flex',
    // flexDirection:'column'
  },
  sideBorder: {
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    width: 0,
    height: "auto",
    margin: "0 5vw",
  },
  filterContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start'
  },
  selectContainer:{
    width:'30%'
  },
  inputContainer:{
    // width:'100%'
  }
}));

export default function ManageLeaveHr() {
  const classes = useStyles();
  const [search,setSearch]=useState('');
  const [cookies]=useCookies(['token']);
  const [departmentId,setdepartmentId]=useState('');
  const dispatch=useDispatch();
  const departments=useSelector(state=>state.emp.departments);

  useEffect(()=>{
    const token=cookies.token;
    dispatch(DepartmentThunk(token));
  },[])

  const departmentHandler=(e)=>{
    console.log(e.target.value)
    setdepartmentId(e.target.value)

  }
  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div" className={classes.module}>
        <Header heading={"Manage Leave"}/>
        {/* <SimpleHeader heading="Add Leave" /> */}

        <Box>
          
          <Box component='div' className={classes.filterContainer}>
             <Box component='div' className={classes.selectContainer}>
                  <SelectUi 
                      data={departments} 
                      value={departmentId} 
                      handleChange={departmentHandler}
                      // handleBlur={handleBlur}
                      placeholder={"Select the Department"}   
                    />
             </Box>
             <Box component='div' className={classes.inputContainer}>
                <SearchBar setSearch={setSearch}/>
             </Box>
          </Box>
          <Box component="div" className={classes.table}>
            {/* <AddLeave /> */}
            <LeaveTableHr departmentId={departmentId} search={search}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
