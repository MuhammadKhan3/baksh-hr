import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const AnimatedContainer = styled.div`
  animation: ${slideDown} 0.3s ease-in-out;
`;


const useStyles=makeStyles({
    container:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#FCFCFC',
        outline:'none',
        width: '340px',
        height: '195px',
        background: '#FCFCFC',
        border: '1px solid #E1E1E1',
        borderRadius: '15px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        gap:'20px',
    },
    text:{
        fontFamily: 'Poppins !important',
        fontStyle: 'normal !important',
        fontWeight: '400 !important',
        fontSize: '12px !important',
        lineHeight: '18px !important',
        textAlign: 'center !important',
        letterSpacing: '-0.02em !important',
        color: '#2C2F32',
    },
    Btns:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        gap:10,
        marginTop:'25px'
    },
    cancelBtn:{
        background:'white !important',
        border: '1px solid #868B90 !important',
        borderRadius: '10px !important',
        fontFamily: 'Poppins !important',
        fontStyle: 'normal !important',
        fontWeight: 600,
        fontSize: '12px !important',
        lineHeight: '18px !important',
        letterSpacing: '-0.02em !important',
        color: '#868B90 !important',
        width: '103px !important',
        height: '40px !important',
        
    },
    confirmBtn:{
        width: '98px !important',
        height: '40px !important',
        border:'none !important',
        background: '#FD5858 !important',
        borderRadius: '10px !important',
        color:'white !important',
    },
    safeBtn:{
      width: '98px !important',
      height: '40px !important',
      border:'none !important',
      background: '#36F57F !important',
      borderRadius: '10px !important',
      color:'white !important',
    }
})

export default function ModalDanger({open,handleClose,handleOpen,submitHandler,title}) {
  const classes=useStyles();

  return (
    
    <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        >
        <AnimatedContainer>
        <Box component='div' className={classes.container}>
          <Typography id="keep-mounted-modal-title" className={classes.text} variant="h6" component="h2">
          Are you sure delete this employee?
          </Typography>
          <Box className={classes.Btns} component='div'>
            <Button variant='contained'   className={classes.cancelBtn} onClick={handleClose}>Cancel</Button>
            <Button variant='outlined'  className={classes.confirmBtn} onClick={submitHandler}>{title}</Button>
          </Box>
        </Box>
    </AnimatedContainer>
      </Modal>
  );
}

export  function ModalSafe({open,handleClose,handleOpen,submitHandler,title}) {
  const classes=useStyles();

  return (
    <AnimatedContainer>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box component='div' className={classes.container}>
          <Typography id="keep-mounted-modal-title" className={classes.text} variant="h6" component="h2">
          Are you sure delete this employee?
          </Typography>
          <Box className={classes.Btns} component='div'>
            <Button variant='contained'   className={classes.cancelBtn} onClick={handleClose}>Cancel</Button>
            <Button variant='outlined'  className={classes.safeBtn} onClick={submitHandler}>{title}</Button>
          </Box>
        </Box>
      </Modal>
    </AnimatedContainer>
  );
}
