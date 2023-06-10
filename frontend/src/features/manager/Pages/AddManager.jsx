import React, { useEffect } from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import { makeStyles } from "@material-ui/core";
import { Box, FormControl } from "@mui/material";
import AddManagerLeft from "../compnents/addManagerLeft";
import AddManagerRight from "../compnents/addManagerRight";
import AttendanceHeader from "../../attendance/ui/attendanceHeader";
import BlackButton from "../../Leave/ui/blackButton";
import { useDispatch, useSelector } from "react-redux";
import FetchOfficeThunk from "../../../redux/thunk/fetchOfficesThunk";
import * as Yup from 'yup';
import { Formik } from "formik";
import axios from "axios";
import { adminApi } from "../../../axios/axiosData";
import { useCookies } from "react-cookie";
import DepartmentThunk from "../../../redux/thunk/departmentThunk";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/header";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  sidebar: {
    width: "24%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  employee: {
    display: "flex",
    flexDirection: "row",
    padding: "0rem",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      padding: "1rem",
    },
  },
  // #E1E1E1
  sideBorder: {
    width: "0px",
    height: "auto",
    margin: "0 5vw",
    [theme.breakpoints.down("lg")]: {
      margin: "0 3vw",
    },
    [theme.breakpoints.down("md")]: {
      // margin: "0 4vw",
      margin: "0 2vw",
    },
    [theme.breakpoints.down("sm")]: {},
  },
  formikDiv: {
    width: "100%",
  },
  subBtn: {
    backgroundColor: "#C49150 !important",
    color: "white !important",
    width: "13.3rem",
    height: "46px !important",
    borderRadius: "10px !important",
  },
  btnBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "1.38rem",
  },
  border: {
    borderTop: "5px solid #868B90",
    position: "relative",
    // marginTop: "1rem",
    width: "auto",
    transform: "rotate(180)",
    marginTop: "1.375rem",
  },
}));

const AddManager = () => {
  const navigate=useNavigate();
  const dispach=useDispatch();
  const offices=useSelector(state=>state?.company?.offices);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const picture=useSelector(state=>state?.company?.picture);

  const {token}=cookies;
  const classes = useStyles();
  
  const initialValues={
    name:'',
    phone:'',
    email:'',
    password:'',
    status:'',
    officeId:'',
    departmentId:''
  }

  const validationSchema=Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    phone: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .min(10,'Minimum Character 10')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .required('Required')
      .max(20,"password maximum length is 20"),
    status: Yup.string()
      .required('Required')
      .max(20,"Status length is 20"),  
    officeId:Yup.string().required("Office Code is required"),
    departmentId:Yup.string().required("Department Id is required")
  })
  

  useEffect(()=>{
    dispach(DepartmentThunk(token))
    dispach(FetchOfficeThunk())
  },[])
  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div" style={{width:'75%'}}>
        <Header
          heading={"Add Manager"}
          width={"100%"}
          marginLeft={"0%"}
        />
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async(values)=>{
              const formdata=new FormData();  
              formdata.append('managerPhoto',picture)
              formdata.append('name',values?.name)
              formdata.append('phone',values?.phone);
              formdata.append('email',values?.email);
              formdata.append('password',values?.password);
              formdata.append('status',values?.status);
              formdata.append('officeId',values?.officeId);
              formdata.append('departmentId',values?.departmentId);

              const response=await axios.post(adminApi+'/create-manager',formdata,{
                headers: {
                  authorization: `Bearer ${token}`,
                },
              })
              console.log(response)
              console.log(response?.data?.flag,typeof(response?.data?.flag))
              if(response?.data?.flag===true){
                navigate('/manage-manager')
              }

            }}          
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          })=>(
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Box component="div" className={classes.employee}>
                <AddManagerLeft touched={touched} offices={offices} handleSubmit={handleSubmit} handleBlur={handleBlur} handleChange={handleChange} errors={errors} values={values}/>
                <Box component="hr" className={classes.sideBorder}></Box>
                {/* <AddManagerRight /> */}
              </Box>
              <Box className={classes.btnBox}>
                <BlackButton label="Save" fontWeight={500} onSubmit={handleSubmit}/>
              </Box>
              <Box component="hr" className={classes.border}></Box>
            </FormControl>
           </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default React.memo(AddManager);
