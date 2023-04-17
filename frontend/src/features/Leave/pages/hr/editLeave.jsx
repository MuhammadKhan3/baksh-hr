import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../../../../components/sidebar/sidebar";
import SimpleHeader from "../../header/simpleHeader";
import AddLeave from "../../components/leave";
import Header from "../../../../components/header/header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { adminApi } from "../../../../axios/axiosData";
import { useCookies } from "react-cookie";
import EditLeaveEmployee from "../../components/editLeave";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    width: "100%",
  },
  sidebar: {
    width: "25%",
  },
  employee: {
    display: "flex",
    flexDirection: "row",
    padding: "2rem",
    width: "100%",
  },
  module:{
    width:'75%',
    marginRight:'2%'
    
  },
  sideBorder: {
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    width: 0,
    height: "auto",
    margin: "0 5vw",
  },
}));

export default function EditLeaveHr() {
  const classes = useStyles();
  const {leaveId}=useParams();
  const [cookies]=useCookies(['token']);
  const [leave,setLeave]=useState({});
  useEffect(()=>{
    const token=cookies.token;
    axios
    .get(adminApi+`/leave/${leaveId}`,{
       headers:{
           authorization: `Bearer ${token}`,
       }
    })
    .then((response)=>{
        setLeave(response?.data?.response)
    })      
  },[])

  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div" className={classes.module}>
        <Header heading={"Edit Leave"}/>
        {/* <SimpleHeader heading="Add Leave" /> */}

        <Box>
          <Box component="div" className={classes.employee}>
            <EditLeaveEmployee
               leave={leave} 
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
