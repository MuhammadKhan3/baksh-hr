import { Box, Button} from '@mui/material'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import InputText from '../ui/input'
import InputNumber from '../../../components/ui/inputNumber';
import SelectUi from '../../../components/ui/select';
import ButtonUi from '../../../components/ui/button';
import { useSelector } from 'react-redux';
import { employeeAction } from '../../../redux/slice/employeeSlice';


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
        top:'1rem',
        
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
    },
    flexRow:{
        display:'flex',
        width:'100%',
        justifyContent:'center',
        alignItems:'start',
        gap:20
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
        marginTop:'2rem'
    }
})

const EmergencyDetail = ({
    submitHandler,              
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
    touched,
    values
}) => {
  const classes=useStyles()
  const name=useSelector(state=>state.emp.name);
  const fatherName=useSelector(state=>state.emp.fatherName);
  const profilePic=useSelector(state=>state.emp.profilePic);
  const dob=useSelector(state=>state.emp.dob);

  
  

  return (
    <Box component='div' className={classes.container}>
       <Box component='h1' className={classes.title}>Emergency Details</Box>
       <Box component='div' className={classes.fields}>
           <Box className={classes.flexRow}>
                <InputText 
                   placeholder={'Add Blood Group'} 
                    value={values.bloodGroup} 
                    error={Boolean(touched.bloodGroup && errors.bloodGroup)} 
                    helperText={touched.bloodGroup && errors.bloodGroup}  
                    name="bloodGroup" 
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur} 
                    title={'Blood Group'}
                />
                <InputNumber 
                    label={'Add Phone Number'}

                    error={Boolean(touched.emergencyContact && errors.emergencyContact)} 
                    helperText={touched.emergencyContact && errors.emergencyContact}  
                    name="emergencyContact" 
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}     
                    classes={classes} 
                    placeholder={'Emergency Contact'} 
                />
           </Box>
           <InputText 
                placeholder={'Add Name of Kin'}  
                value={values.kinname} 
                error={Boolean(touched.kinname && errors.kinname)} 
                helperText={touched.kinname && errors.kinname}  
                name="kinname" 
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur} 
                title={'Next of Kin'}
           />
           <Box className={classes.flexRow}>
                <InputText 
                    placeholder={'Relation'} 
                    value={values.relation} 
                    error={Boolean(touched.relation && errors.relation)} 
                    helperText={touched.relation && errors.relation}  
                    name="relation" 
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur} 
                    title={'Add Relation '}
                            
                />
                <InputNumber 
                     label={'Phone'} 
                     classes={classes} 
                     placeholder={'Add Phone Number'} 

                     error={Boolean(touched.relationContact && errors.relationContact)} 
                     helperText={touched.relationContact && errors.relationContact}  
                     name="relationContact" 
                     touched={touched}
                     handleChange={handleChange}
                     handleBlur={handleBlur}     
                />
           </Box>

       </Box>
    </Box>
  )
}

export default EmergencyDetail