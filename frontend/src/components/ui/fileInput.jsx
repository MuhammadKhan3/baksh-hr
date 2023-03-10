import { Box, makeStyles } from '@material-ui/core'
import { Label } from '@mui/icons-material'
import { Input } from '@mui/material'
import React from 'react'
import file from '../../images/file.svg'

const useStyles=makeStyles({
    container:{
        display:'flex'
    },
    file:{
        width:'133px',
        height:'133px',
        border: '1px dashed #868B90',
        borderRadius: '8px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        
    },
    fileLogo:{
        display:'flex',

    },
    filedescription:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight:'400',
        fontSize: '10px',
        lineHeight: '15px',
        textAlign: 'center',
        letterSpacing: '-0.02em'
    }
})
const FileInput = () => {
    const classes=useStyles();
  return (
    <Box component='div' className={classes.container}>
       <input type='file' hidden  name="profile" id='profile'/>
       <label htmlFor='profile'>
        <Box component='div' className={classes.file}>
            <Box component='img' src={file} className={classes.fileLogo}/>
            <p className={classes.filedescription}>Drop a file or browse a file to upload</p>
        </Box>
       </label>
        <Box component='div' className={classes.container}>
        </Box>
    </Box>
  )
}

export default FileInput