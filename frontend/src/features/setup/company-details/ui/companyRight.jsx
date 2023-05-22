import React, { useEffect, useState } from "react";
import { Box, Typography, Theme } from "@mui/material";
import InputNumber from "../../../employee/ui/editEmployee/inputNumber";
import MultiLineText from "../../../employee/ui/editEmployee/multiline";
import SelectLocalUi from "../ui/selectLocal";
import PropTypes from "prop-types";
import { country } from "../../../employee/components/country";

import { makeStyles } from "@material-ui/core";
import SelectUi from "../ui/select";
import axios from "axios";
import { adminApi } from "../../../../axios/axiosData";
import InputText from "../../../../components/ui/inputtext";

const useStyles = makeStyles((Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: "0.8rem",
    width: "auto",
    height: "auto",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.25rem",
    width: "30vw",
    gap: "0.57rem",
    height: "100%",
  },
  personalLabel: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "12px !important",
    lineHeight: "18px !important",
    letterSpacing: "-0.02em",
    color: "#2C2F32",
  },
  flexRow: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    [Theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      gap: "0px",
    },
  },
}));

const status = ["active", "inactive"];
const city = ["Islambad", "Peshawar", "Quetta", "Karachi"];

const CompanyRight = ({ office,offices,data,id,setOffices }) => {
  const classes = useStyles();
  const [Hrs,setHrs]=useState([]);
 
  const onChangeHandler=(e)=>{
    
    const {value,name,id}=e.target;
    // console.log(value,name,id)
    setOffices(
      offices.map(item => 
          item.id === parseInt(id) 
          ? {...item, [name]:value}
          : item 
    ))
  }

  const onChangeSelect=(e)=>{    
    let {value,name}=e.target;
    const splitValue=value.split('-');
    value=splitValue[0]
    const id=splitValue[1];
    setOffices(
      offices.map(item => 
          item.id === parseInt(id) 
          ? {...item, [name]:value}
          : item 
    ))
  }

  useEffect(()=>{
    const FetchHandler=async ()=>{
      const response=await axios.get(adminApi+'/get-Hr')
      setHrs(response?.data?.hrs)
      console.log(data)
    }
    FetchHandler()
  },[])
  return (
    <Box id="company" key={1} value className={classes.container} component="div">
      <Box component="div">
        <Typography component="h1" className={classes.personalLabel}>
          {office}:
        </Typography>
      </Box>
      <Box id={id} className={classes.innerContainer} component="div">
        <SelectUi
                data={Hrs} 
                name="userId"
                id={id}
                value={data?.userId}
                handleChange={onChangeSelect}
                handleBlur={onChangeSelect}
                placeholder={"Select the Hr"}   
                classes={classes}
        />
        <Box component='div' style={{display:'flex',flexDirection:'column'}}>
        <label>Office Code</label>                    
        <InputText
          id={id}
          name={'officeCode'}
          value={data?.officeCode}
          changeHandler={onChangeHandler}
          placeholder={"office Code"}
        />
  
        </Box>      
        <MultiLineText 
             label={"Address"}
             name="address"
             id={id}
             value={data?.address}
             handleBlur={onChangeHandler}
             handleChange={onChangeHandler}
             placeholder={"Add Address"} 
        />
        <Box className={classes.flexRow}>
          <SelectLocalUi
            title={"Country"}
            id={id}
            handleBlur={onChangeSelect}
            handleChange={onChangeSelect}
            value={data?.country}
            // helperText={"Country"}
            name="country"
            placeholder={"Select Country"}
            data={country}
          />
          <SelectLocalUi
            title={"City"}
            id={id}
            handleBlur={onChangeSelect}
            handleChange={onChangeSelect}
            value={data?.city}
            // helperText={"Country"}
            name="city"
            placeholder={"Select City"}
            data={city}
          />
        </Box>
      </Box>
    </Box>
  );
};

CompanyRight.propTypes = {
  office: PropTypes.string.isRequired,
};

export default CompanyRight;
