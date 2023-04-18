import { Box, makeStyles } from '@material-ui/core'
import { Typography } from '@mui/material'
import React from 'react'
import SelectLocalUi from '../../../components/ui/selectLocal'
import DatePickterUi from '../../../components/ui/datePickter'
import InputText from '../ui/input'
import InputNumber from '../../../components/ui/inputNumber'
import MultiLineText from '../../../components/ui/multiline'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
const { country } = require("./country");


const useStyles=makeStyles({
    bottomDiv:{
    },
    // mainContainer:{

    // },
    mainContainer:{
        display:'flex',
        flexDirection:'column',
        width:'40%',
        marginLeft:'12%'
    },
    flexRow:{
        display:'flex',
        alignContent:'start',
        flexBasis:'25%',
        flexGrow:0,
        justifyContent: 'space-between'
    },
    flexChild:{
        width:'48%'
    }
})
const martialStatus = ["single", "married", "other"];
const Gender = ["male", "female"];

const ViewDetails = ({employee,label}) => {
    const classes=useStyles();
    const salaryTypes=useSelector(state=>state.emp.salaryTypes);


    console.log(employee?.gender)
  if(label==='personal'){
        return (
            <Box  component="div" className={classes.mainContainer}>
                <InputText
                    value={employee?.name}
                    placeholder={"Add Full name"}
                    title={"Name"}
                    name="name"
                    disabled={true}
                />
                <InputText
                    placeholder={"Add Father Name"}
                    title={"Father Name"}
                    name="fatherName"
                    disabled={true}
                    value={employee?.fatherName}
                /> 
                <Box className={classes.flexRow}>
                    <Box component='div' className={classes.flexChild}>
                            <DatePickterUi
                                title={"Date of Birth"}
                                name="dob"
                                value={dayjs(employee?.dob)}
                                disabled={true}
                            />
                    </Box>
                    <Box component='div' className={classes.flexChild}>

                        <SelectLocalUi
                                title={"Gender"}
                                disabled={true}
                                name="gender"
                                data={Gender}
                                value={employee?.gender || ''}
                                placeholder={"Select Gender"}
                            />
                    </Box>
                </Box>
                <Box className={classes.flexRow}>
                    <Box component='div' className={classes.flexChild}>
                    <InputNumber
                            label={"Phone 1"}
                            name="contactOne"
                            disabled={true}
                            value={employee?.contactOne}
                            placeholder="Add Contact No"
                        />
                    </Box>
                    <Box component='div' className={classes.flexChild}>
                        <InputNumber
                            label={"Phone 2"}
                            name="contactTwo"
                            disabled={true}
                            value={employee?.contactTwo}
                            placeholder="Add Contact No"
                        />
                    </Box>
                </Box>
                <MultiLineText
                    disabled={true}
                    label={"Local Address"}
                    name="localAddress"
                    value={employee?.localAddress}
                    placeholder={"Add Local Address"}
                />
                <InputText
                    value={employee?.permanentAddress}
                    placeholder={"Add Permanent Address"}
                    title={"Permanent Address"}
                    name="permanentAddress"
                    disabled={true}
                />
                <Box className={classes.flexRow}>
                <Box component='div' className={classes.flexChild}>
                        <SelectLocalUi
                            title={"Nationality"}
                            disabled={true}
                            value={employee?.nationality || ''}
                            placeholder={"Select Nationality"}
                            data={country}
                        />
                    </Box>
                    <Box component='div' className={classes.flexChild}>
                        <SelectLocalUi
                            title={"Marital Status"}
                            data={martialStatus}
                            value={employee?.martialStatus || ''}
                            disabled={true}
                            name="martialStatus"
                            placeholder={"Select Marital Status"}
                        />
                    </Box>
                </Box>
        </Box>
    )
  }else if(label==='accountLogin'){
    return (  <Box  component="div" className={classes.mainContainer}>
                {/* <Box component='div' className={classes.fields}> */}
                    <InputText 
                            placeholder={'Email'}            
                            name="email" 
                            value={employee?.user?.email}
                            disabled={true}
                            title={'Add the Email'}
                    /> 

                    <InputText
                            placeholder={'Password'}
                            name="password" 
                            title={'Add the Password'}        
                            value={employee?.password}
                            disabled={true}
                    /> 
                {/* </Box> */}
        </Box>)
  }else if(label==='financial'){
    return (
        <Box component='div' className={classes.mainContainer}>
                <SelectLocalUi    
                        data={salaryTypes}
                        value={employee?.employee_bank?.salaryType}
                        disabled={true}
                        title={'Select Salary Type'}  
                        placeholder={"Select Salary Type"}   
                />
                <InputNumber 
                    label={'Salary'} 
                    disabled={true}
                    value={employee?.employee_bank?.salary}
                    placeholder={'Add Salary'} 
                />
        </Box>

    )
  }else if(label==='emergency'){
    return(<Box component='div' className={classes.mainContainer}>
            <Box className={classes.flexRow}>
                <Box component='div' className={classes.flexChild}>
                    <InputText 
                        disabled={true}
                        value={employee?.bloodGroup}
                        placeholder={'Add Blood Group'} 
                        title={'Blood Group'}
                    />
                </Box>
                <Box component='div' className={classes.flexChild}>
                    <InputNumber 
                        disabled={true}
                        label={'Add Phone Number'}
                        value={employee?.emergencyContact}
                        placeholder={'Emergency Contact'} 
                    />
                </Box>
                    
           </Box>
           <InputText 
                placeholder={'Add Name of Kin'}  
                value={employee?.kinname}
                disabled={true}
                title={'Next of Kin'}
           />
           <Box className={classes.flexRow}>
              <Box component='div' className={classes.flexChild}>
                <InputText 
                    placeholder={'Relation'} 
                    title={'Add Relation '}
                    disabled={true}
                    value={employee?.relation}
                />
              </Box>
              <Box component='div' className={classes.flexChild}>
                <InputNumber 
                     label={'Phone'}
                     value={employee?.kinPhone}
                     disabled={true} 
                     placeholder={'Add Phone Number'} 
                />
               </Box>
           </Box>

    </Box>)
  }
}

export default ViewDetails 