import { Input, makeStyles } from '@material-ui/core'
import { Box, Typography,Button } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React, { useEffect } from 'react'

import DatePickterUi from '../../../../components/ui/datePickter';
import SelectUi from '../../../../components/ui/select';
import InputNumber from '../../ui/editEmployee/inputNumber';
import EmployeeFinancial from './EditEmployeeFinanicial';
import EmergencyDetail from './EditEmergencyDetail';
import { useDispatch, useSelector } from 'react-redux';
import { employeeAction } from '../../../../redux/slice/employeeSlice';
import axios from 'axios';
import { adminApi } from '../../../../axios/axiosData';
import SelectLocalUi from '../../../../components/ui/selectLocal';
import AccountLogin from './EditAccountLogin';
import EditEmergencyDetail from './EditEmergencyDetail';
import EditEmployeeFinanicial from './EditEmployeeFinanicial';


const useStyles=makeStyles({
    container:{
        display:'flex',
        flexDirection:'column',
        position:'relative',
        marginTop:'1.5rem',
        paddingLeft:'0.8rem',
        width:'auto',
        gap:'20px',
        height:'auto',
        // border:'1px solid black'
        
        // #
    },
    innerContainer:{
      display:'flex',
      flexDirection:'column',
      position:'relative',
      marginTop:'1.5rem',
      paddingLeft:'0.8rem',
      width:'30vw',
      gap:'20px',
      height:'100%',
    },
    personalLabel:{
        fontFamily: 'Poppins',
        fontSize: '18px',
        fontWeight: '400',
        lineHeight: '27px',
        letterSpacing: '-0.02em',
        textAlign: 'left',
        color:'#C49150',
  
    },
    root: {
        [`& fieldset`]: {
            border: '1px solid #E1E1E1',
          borderRadius: "10px !important",
        },
        width:'100%'
    },
    flexRow:{
        display:'flex',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        gap:20
    },
    border:{
      borderTop: '1px solid #E1E1E1;',
      position:'relative',
      marginTop:'1rem',
      width:'auto',
      transform:'rotate(180)'
    },
    subBtn:{
      backgroundColor:'#C49150 !important',
      color:'white !important',
      width:'13.3rem',
      height:'46px !important',
      borderRadius:'10px !important'
    },
    flexEnd:{
        display:'flex',
        width:'100%',
        flex:1,
        justifyContent:'end',
        alignItems:'end',
        gap:20,
        marginTop:'2rem',
        paddingRight:'2rem',
        marginRight:'3rem'
    }

})

const status=[
  'active',
  'inactive'
]
const EditEmployeRight = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  isValid,
  formik,
  touched,
  values}) => {
  const dispatch=useDispatch();
  const classes=useStyles();
  const departmentId=useSelector(state=>state.emp.departmentId);
  const departments=useSelector(state=>state.emp.departments);
  const designations=useSelector(state=>state.emp.designations);
  const dateofJoining=useSelector(state=>state.emp.dateofJoining);
  const managers=useSelector(state=>state.emp.managers);


  useEffect(()=>{
    const getDesignation=async ()=>{
      const response=await axios.get(adminApi+`/designation/${values.departmentId}`)
      dispatch(employeeAction.deisgnationsAction(response?.data?.designations))
      console.log(response)
    }

    let timerOne;
    if(parseInt(values.departmentId)>0){
      timerOne=setTimeout(getDesignation,1000);
    }

    return ()=>{
      clearTimeout(timerOne)
    }
  },[values.departmentId])

  const Country=[
    'pakistan',
    'india'
  ]  
  const Gender=[
    'male',
    'female',
    'other'
  ]




  const deparmentHandler=(e)=>{
   
  }

  console.log(managers)
  return (
    <Box className={classes.container} component='div'>
      <Box component='div'>
        <Typography component='h1' className={classes.personalLabel}>
            Company Details
        </Typography>
      </Box>
      <Box className={classes.innerContainer} component='div'>
        <InputNumber
              disabled={true}
              placeholder={'Add Employee ID'} 
              value={values.employeeId} 
              error={Boolean(touched.employeeId && errors.employeeId)} 
              helperText={touched.employeeId && errors.employeeId}  
              name="employeeId" 
              label={'Empolyee Id'} 
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
        />
        <SelectUi 
           title={'Department'}  
           data={departments} 
           value={values.departmentId} 
           error={Boolean(touched.departmentId && errors.departmentId)} 
           helperText={touched.departmentId && errors.departmentId}  
           name="departmentId" 
           touched={touched}
           handleChange={handleChange}
           handleBlur={handleBlur}
           placeholder={"Select the Department"}   
           classes={classes} 
           use={'fetch'}
        />
        
        <SelectUi 
            title={'Designation'} 
            data={designations}  
            classes={classes}
            value={values.designationId} 
            error={Boolean(touched.designationId && errors.designationId)} 
            helperText={touched.designationId && errors.designationId}  
            name="designationId" 
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder={"Select the Department"}   
        />

        <Box className={classes.flexRow}>
            <DatePickterUi 
                 title={'Date of Joining'} 
                 classes={classes}
                 value={values.dateofJoining} 
                 error={Boolean(touched.dateofJoining && errors.dateofJoining)} 
                 helperText={touched.dateofJoining && errors.dateofJoining}  
                 name="dateofJoining" 
                 touched={touched}
                 handleChange={handleChange}
                 handleBlur={handleBlur} 
                 setFieldValue={formik.setFieldValue}
            />
            <SelectLocalUi 
                title={'Status'} 
                value={values.status} 
                error={Boolean(touched.status && errors.status)} 
                helperText={touched.status && errors.status}  
                name="status" 
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                placeholder={"Select the Department"}   
                data={status} 
                classes={classes}
              />
        </Box>
        <SelectUi title={'Manager'} 
                  data={managers} 
                  value={values.managerId} 
                  error={Boolean(touched.managerId && errors.managerId)} 
                  helperText={touched.managerId && errors.managerId}  
                  name="managerId" 
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder={"Select the Manager"}   
                  classes={classes}
        />
        {/* <Box className={classes.flexRow}    >
            <SelectUi title={'Nationality'} data={Gender} classes={classes}/>
            <SelectUi title={'Marital Status'} data={Country} classes={classes}/>
        </Box> */}
        <Box component='hr' className={classes.border}></Box>
        <EditEmployeeFinanicial
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isValid={isValid}
              values={values}
              touched={touched}
        />
        <Box component='hr' className={classes.border}></Box>

        <EditEmergencyDetail
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isValid={isValid}
              values={values}
              touched={touched}
        />
        <AccountLogin 
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isValid={isValid}
              values={values}
              touched={touched}
        />

        <Box component='div' className={classes.flexEnd}>
             <Button>Save as draft</Button>
             <Button className={classes.subBtn} onClick={formik.handleSubmit} type="submit">Submit</Button>
           </Box>
      </Box>
    </Box>

  )
}

export default EditEmployeRight