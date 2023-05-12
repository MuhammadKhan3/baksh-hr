import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { TextField } from '@mui/material'
const useStyles = makeStyles((theme) => ({
  root: {

    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#E1E1E1',
          borderRadius: '10px',
          height:'50px',
          padding:'10px',
      '& fieldset': {
        borderRadius: '10px',
        padding:'10px',
        height:'50px',
      },
    },
    '&:hover fieldset': {
      borderColor: '#E1E1E1', // set the hover color to be the same as the border color
    },

    '& .MuiInputLabel-root': {
      color: '#E1E1E1', // custom color for the label
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: '#C49A50', // custom color for the focused label
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#C49A50', // custom color for the focused outline
    },
  },
}));

const InputText = ({label,name,changeHandler,id}) => {
  const classes = useStyles();
  return (
    <TextField size='small' className={`${classes.root}`} id={id}   label={label} variant="outlined" onChange={changeHandler} name={name} />
  )
}

export default InputText