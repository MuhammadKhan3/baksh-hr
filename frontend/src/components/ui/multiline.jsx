import { Box, FormControl, OutlinedInput, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@material-ui/core';


const useStyles=makeStyles({
    flexRow:{
        display:'flex',
        width:'100%',
        flex:1,
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
  root: {
    [`& fieldset`]: {
        border: '1px solid #E1E1E1',
      borderRadius: "10px !important",
    },
    width:'100%'
},
})
const MultiLineText = ({label,placeholder}) => {
    const classOwn=useStyles();
  return (
    <FormControl >
      <Typography component='h4' className={classOwn.label}>{label}</Typography>
      <OutlinedInput placeholder={placeholder} 
              multiline
              rows={4}
              className={classOwn.root}
              defaultValue=""
      />
    </FormControl>
  )
}

export default MultiLineText