import { Box} from '@mui/material'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import InputText from '../ui/input'
import InputNumber from '../../../components/ui/inputNumber';
import SelectUi from '../../../components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { employeeAction } from '../../../redux/slice/employeeSlice';



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

const EmployeeBank = ({parentClass,errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
    touched,
    values}) => {
  const classes=useStyles()
  const dispatch=useDispatch();
  const banks=useSelector(state=>state.emp.banks)
  const bankId=useSelector(state=>state.emp.bankId)


  return (
    <Box component='div' className={classes.container}>
       <Box component='h1' className={classes.title}>Bank Details</Box>
       <Box component='div' className={classes.fields}>
           <InputText 
                    placeholder={'Add Account Holder Name'} 
                    value={values.accountholderName} 
                    error={Boolean(touched.accountholderName && errors.accountholderName)} 
                    helperText={touched.accountholderName && errors.accountholderName}  
                    name="accountholderName" 
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur} 
                    title={'Account Holder Name'}
            />
            {/* accountNumber */}
           <InputNumber 
                  label={'Account Number'}         
                //   value={values.accountNumber} 
                    error={Boolean(touched.accountNumber && errors.accountNumber)} 
                    helperText={touched.accountNumber && errors.accountNumber}  
                    name="accountNumber" 
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}  
                  classes={classes} 
                  placeholder={'Add Account Number'} 

            />
           <Box className={parentClass.flexRow}>
                <SelectUi    
                     title={'Add Bank Name'} 
                     data={banks} 
                     classes={classes}
                     value={values.bankId} 
                     error={Boolean(touched.bankId && errors.bankId)} 
                     helperText={touched.bankId && errors.bankId}  
                     name="bankId" 
                     touched={touched}
                     handleChange={handleChange}
                     placeholder={"Select Bank"}
                     handleBlur={handleBlur}
                />
                <InputText 
                    placeholder={'Branch Name'} 
                    title={'Add Branch Name'}
                    value={values.branchName} 
                    error={Boolean(touched.branchName && errors.branchName)} 
                    helperText={touched.branchName && errors.branchName}  
                    name="branchName" 
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}  
                />

                {/* <SelectUi title={'Add Branch Name'} data={BranchName} classes={classes}/> */}
           </Box>
       </Box>
    </Box>
  )
}

export default EmployeeBank