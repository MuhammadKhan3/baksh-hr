import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { TextField } from '@mui/material'
const useStyles = makeStyles((theme) => ({
  root: {
    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':{
        padding:'8px',
        width:'400px',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E1E1E1',
          borderRadius: '10px',
          height:'42px',
          padding:'10px',
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          padding:'0px',
      '& fieldset': {
        width:'100%',
        borderRadius: '10px',
        // padding:'10px',
        height:'42px',
      },
    },
    '&:hover fieldset': {
      borderColor: '#E1E1E1', // set the hover color to be the same as the border color
    },

    '& .MuiInputLabel-root': {
      color: '#C49150', // custom color for the label
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: '#C49A50', // custom color for the focused label
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#C49A50', // custom color for the focused outline
    },
  },
}));

const InputText = ({label,name,changeHandler,placeholder,id,value}) => {
  const classes = useStyles();
  return (
    <>
     <TextField  value={value} placeholder={placeholder} size='medium' className={`${classes.root}`} id={id}   label={label} variant="outlined" onChange={changeHandler} name={name} />
    </>
  )
}

export default InputText