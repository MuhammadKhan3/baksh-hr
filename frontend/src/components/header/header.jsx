import { Avatar, makeStyles } from '@material-ui/core';
import { Box, Button, IconButton} from '@mui/material'
import React from 'react'
import msg from '../../images/msg.svg'
import notification from '../../images/notification.svg'
import Elipise from '../../images/Ellipse 8.svg'
import BasicMenu from '../ui/menu';
const useStyles=makeStyles({
    mainContainer:{
        backgroundColor:'#FFFFFF',
        paddingTop:'1rem',
        paddingLeft:'0rem',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    pageName:{
        fontFamily: 'Poppins',
        fontSize: '28px',
        fontWeight: '600',
        lineHeight: '42px',
        letterSpacing: '-0.02em',
        textAlign: 'left',
        display:'flex'
    },
    msgIcon:{
        cursor:'pointer',
        color:'#868B90',
        stroke:'#868B90',
        width:'18px',
        height:'18.46px'
    },
    notificationIcon:{
      cursor:'pointer',
      color:'#868B90',
      stroke:'#868B90',
      width:'18px',
      height:'18.46px'
    },
    menu:{

    }
})

const Header = ({heading,width}) => {
    const classes=useStyles();
  return (
    <Box component='div'  className={classes.mainContainer}>
      <Box component='div' className={classes.pageName}>
        {heading}
      </Box>
      <Box component='div' className={classes.pageName}>
         {/* <Button> */}
            {/* <IconButton
             size="large"
              aria-label="show more"
              color="inherit"
            //   aria-controls={mobileMenuId}
              aria-haspopup="true"
            //   onClick={handleMobileMenuOpen}
            >
               <Box component='img' src={msg} className={classes.msgIcon}/>
            </IconButton> */}

            <IconButton>
              {/* <Box component='img' src={Elipise} /> */}
              <Box component='img' src={notification} className={classes.notificationIcon}/>
            </IconButton>
            <Box>
              <BasicMenu/>
            </Box>
         {/* </Button> */}
      </Box>
    </Box>
  )
}

export default Header