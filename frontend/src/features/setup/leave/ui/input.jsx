import { Box, makeStyles } from '@material-ui/core';
import { Input, TextField, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';


const useStyles=makeStyles({
    'input':{

        // outline:'none'
    },
    root: {
        fontFamily: 'Poppins , sans-serif',
        '&.css-1u3bzj6-MuiFormControl-root-MuiTextField-root':{
          height:'42px',
        },
        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{
            height:'100%',
        },
        cursor:'pointer',
        input:{
            '&::placeholder': {
                fontStyle: 'italic',
                color:'#868B90',
                fontSize:'12px'
            },
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#E1E1E1',
            },
            '&:hover fieldset': {
              borderColor: '#C49A50',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#C49A50',
            },
        },
        [`& fieldset`]: {
            border: '1px solid #E1E1E1',
          borderRadius: "10px !important",

        },
        height:'42px !important',
        width:'100%',
    },

    label:{
        fontFamily: 'Poppins',
        fontSize: '10px',
        fontWeight: '600',
        lineHeight: '15px',
        letterSpacing: '-0.02em',
        textAlign: 'left',
        color:'#868B90'
    },
    container:{
        width:'100%'
    }
})

const InputText = (props) => {
    const {
        placeholder,
        title,
        name,
        helperText, 
        handleChange, 
        ref,
        value, 
        error,
        handleBlur
    }=props
  const classes=useStyles();
  const dispatch=useDispatch();

//   const handleChange=(e)=>{
//     console.log('hit...')
    // console.log(e.target.value)
    // dispatch(setState(e.target.value));
//   }
console.log(name)

  return (<Box className={classes.container}  component='div'> 
            <Typography component='h4' className={classes.label}>
                {title}
            </Typography>
            <TextField 
                helperText={helperText}  
                error={error}
                InputProps={{
                    classes:{input: classes.input}
                }}
                defaultValue={value}
                key={value}
                // value={value}
                type='text' 
                color='primary' 
                variant='outlined'
                onBlur={(e)=>{handleBlur(e);handleChange(e)}}
                name={name}
                id={name}
                placeholder={placeholder} 
                className={classes.root}
            />
    </Box>)
}

export default InputText