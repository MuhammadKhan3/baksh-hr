import { Box} from '@mui/material'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import InputText from '../../ui/editEmployee/input'
import InputNumber from '../../ui/editEmployee/inputNumber';
import SelectUi from '../../../../components/ui/select';
import SelectLocalUi from '../../../../components/ui/selectLocal';
import { useDispatch, useSelector } from 'react-redux';
import { employeeAction } from '../../../../redux/slice/employeeSlice';


const BankName=[
    'UBL',
    'HBL'
]; 
const BranchName=[
    'Garden Town',
    "Bahari Tow"
]
const useStyles=makeStyles({
    container:{
        position:'relative',
        top:'1rem'
    },
    title:{
        color:'#C49150',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '18px',
        lineHeight: '27px',
        letterSpacing: '-0.02em',
    },
    fields:{
        display:'flex',
        flexDirection:'column',
        gap:'1rem',
        marginTop:'0.5rem'
    },
    label:{
        //styleName: 10 B;
        fontSize: '10px',
        fontWeight: '600',
        lineHeight: '15px',
        letterSpacing: '-0.02em',
        textAlign: 'left',
    }
})

const EditEmployeeFinanicial = ({parentClass,
    submitHandler,              
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    touched,
    values}) => {
  const classes=useStyles()
  const dispatch=useDispatch();
  const salaryTypes=useSelector(state=>state.emp.salaryTypes);

  return (
    <Box component='div' className={classes.container}>
       <Box component='h1' className={classes.title}>Financial Details</Box>
       <Box component='div' className={classes.fields}>
           {/* <InputText placeholder={'Add Account Holder Name'} title={'Account Holder Name'}/> */} 
            <SelectLocalUi    
                    title={'Select Salary Type'}  
                    data={salaryTypes} 
                    classes={classes}
                    value={values.salaryType} 
                    error={Boolean(touched.salaryType && errors.salaryType)} 
                    helperText={touched.salaryType && errors.salaryType}  
                    name="salaryType" 
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    placeholder={"Select the Department"}   
            />
            <InputNumber 
                label={'Salary'} 
                classes={classes}  
                value={values.salary} 
                error={Boolean(touched.salary && errors.salary)} 
                helperText={touched.salary && errors.salary}  
                name="salary" 
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}     
                placeholder={'Add Salary'} 
            />
       </Box>
    </Box>
  )
}

export default EditEmployeeFinanicial