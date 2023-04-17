import React, { useState } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../../../../components/sidebar/sidebar";

import Header from "../../../../components/header/header";
import LeaveTable, { LeaveTableManager, LeaveTableManagerEmployees } from "../../components/leavesTable";
import SelectUi from "../../../../components/ui/select";
import SearchBar from "../../ui/searchBar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { adminApi } from "../../../../axios/axiosData";
import ModalDanger, { ModalSafe } from "../../../../components/ui/modals";
import SelectLocalUi from "../../../../components/ui/selectLocal";

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

export default function ManageLeaveManagerEmployee() {
  const classes = useStyles();
  const [search,setSearch]=useState('');
  const [cookies] = useCookies(['token']);
  const [filter,setfilter]=useState('')
  const [approvalData,setApprovalData]=useState({
    status:'',
    leaveId:''
  })

  const LeaveApproval=()=>{
    const token=cookies.token;
    axios
    .post(adminApi+`/leave-approval`,approvalData,{
        headers:{
            authorization: `Bearer ${token}`,
        }
    })
    .then((response)=>{
      window.location.reload();
      console.log(response)
    })
  }
  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div" className={classes.module}>
        <Header heading={"Employees  Manage Leave"}/>
        {/* <SimpleHeader heading="Add Leave" /> */}

        <Box>

          <Box component='div' className={classes.filterContainer}>
             <Box component='div' className={classes.selectContainer}>
                <SelectLocalUi
                          data={['approve','reject','applied']} 
                          value={filter} 
                          handleChange={(e)=>{setfilter(e.target.value)}}
                          placeholder={"Select the Filter"}   
                          
                />
             </Box>
             <Box component='div' className={classes.inputContainer}>
                <SearchBar setSearch={setSearch}/>
             </Box>
          </Box>
          <Box component="div" className={classes.table}>
            {/* <AddLeave /> */}
            <ModalDanger title={'Reject'}  handleClose={()=>{setApprovalData({})}} submitHandler={LeaveApproval}  open={approvalData?.status==='reject'} />
            <ModalSafe   title={'Approve'}  handleClose={()=>{setApprovalData({})}} submitHandler={LeaveApproval}  open={approvalData?.status==='approve'}/>

            <LeaveTableManagerEmployees filter={filter} setApprovalData={setApprovalData} search={search}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
