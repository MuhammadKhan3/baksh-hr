import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Box, FormControl } from "@mui/material";
import Sidebar from "../../../../components/sidebar/sidebar";
import ComponentLeft from "../components/companyLeft";
import RenderingComponentRight from "../components/renderingCompanyRight";
import AttendanceHeader from "../../../attendance/ui/attendanceHeader";
import Tab from "../ui/colorTabs";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import axios from "axios";
import { adminApi } from "../../../../axios/axiosData";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",

    [theme.breakpoints.down("sm")]: {},
  },
  sidebar: {
    width: "25%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  employee: {
    display: "flex",
    flexDirection: "row",
    padding: "1rem 2rem",
    width: "100%",
    // border: "2px solid blue",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  // #E1E1E1
  sideBorder: {
    borderRight: "1px solid #E1E1E1",
    width: "0px",
    height: "auto",
    margin: "0 5vw",
    [theme.breakpoints.down("md")]: {
      border: "none",
      margin: "0 2vw",
    },
  },
  formikDiv: {
    width: "100%",
    // border: "2px solid black",
  },
  subBtn: {
    backgroundColor: "#C49150 !important",
    color: "white !important",
    width: "13.3rem",
    height: "46px !important",
    borderRadius: "10px !important",
  },
  btn: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "400 !important",
    fontSize: "14px  !important",
    lineHeight: "21px  !important",
    letterSpacing: "-0.02em  !important",
    color: "#868B90  !important",
  },
  btnBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "1.38rem",
  },
}));

export default function CompanyDetails() {
  const classes = useStyles();
  const picture=useSelector(state=>state?.company?.picture);

  const [offices,setOffices]=React.useState([{
    id:1,
    address:'',
    country:'',
    city:'',
    userId:'',
    officeCode:''
  }])

  console.log('offices',offices)

  const initialValues={
    companyName:'',
    phone:'',
    email:'',
    websiteUrl:'',
  }
  const validationSchema=Yup.object({
    companyName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    phone: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .min(10,'Minimum Character 10')
    .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    websiteUrl: Yup.string()
      .required('Required')
      .max(40,"website url less than 40")  
    })

  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div">
        {/* <Header heading="Configuration" /> */}
        <AttendanceHeader
          heading={"Configuration"}
          marginLeft={"0px"}
          width={"100%"}
        />
        <Tab />
        <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={async(values)=>{
          const formdata=new FormData()
          formdata.append('companyName',values?.companyName);
          formdata.append('email',values?.email);
          formdata.append('phone',values?.phone);
          formdata.append('url',values?.websiteUrl)
          formdata.append('picture',picture)
          offices.forEach((data,i)=>{
            console.log(data["country"])

            formdata.append(`offices[${i}][address]`, data["address"]);
            formdata.append(`offices[${i}][country]`, data["country"]);
            formdata.append(`offices[${i}][city]`, data["city"]);
            formdata.append(`offices[${i}][userId]`, data["userId"]);
            formdata.append(`offices[${i}][officeCode]`, data["officeCode"]);
          })

          const response=await axios.post(adminApi+'/create-company',formdata)
          console.log(response)
          
        }}
        enableReinitialize={true}
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
                  <ComponentLeft values={values} touched={touched} handleBlur={handleBlur} errors={errors} handleChange={handleChange}/>
                <Box component="hr" className={classes.sideBorder}></Box>
                <RenderingComponentRight office={"Office #1"} offices={offices} setOffices={setOffices} />
                </Box>
                <Box className={classes.btnBox}>
                      {/* <Button>Save as draft</Button> */}
                <Button className={classes.subBtn}  type="submit">
                        Submit
                </Button>
              </Box>
            </FormControl>        
          </form>
        )}
        </Formik>
      </Box>
    </Box>
  );
}
