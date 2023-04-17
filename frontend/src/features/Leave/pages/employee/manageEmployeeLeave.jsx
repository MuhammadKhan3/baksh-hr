import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../../../../components/sidebar/sidebar";

import Header from "../../../../components/header/header";
import LeaveTable, { LeaveTableEmployee } from "../../components/leavesTable";
import SelectUi from "../../../../components/ui/select";
import SearchBar from "../../ui/searchBar";
import SelectLocalUi from "../../../../components/ui/selectLocal";
import DeleteModal, { ModalSafe } from "../../../../components/ui/modals";
import ModalDanger from "../../../../components/ui/modals";

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

export default function ManageLeaveEmployee() {
  const classes = useStyles();
  const [search,setSearch]=useState('');
  const [filter,setfilter]=useState('');
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
                  <SelectLocalUi
                      data={['approve','reject','applied']} 
                      value={filter} 
                      handleChange={(e)=>{setfilter(e.target.value)}}
                      placeholder={"Select the Filter"}   
                      
                    />
             </Box>
             <Box component='div' className={classes.inputContainer}>
                <SearchBar  setSearch={setSearch}/>
             </Box>
          </Box>
          <Box component="div" className={classes.table}>
            {/* <AddLeave /> */}
            <LeaveTableEmployee filter={filter} search={search}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
