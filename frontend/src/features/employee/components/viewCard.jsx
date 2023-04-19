import { makeStyles, Typography } from '@material-ui/core'
import { Box } from '@mui/material';
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import active from '../../../images/employee/active.svg'
import inactive from '../../../images/employee/inactive.svg'
import edit from '../../../images/employee/edit.svg'
import eye from '../../../images/employee/eye.svg'
import { url } from '../../../axios/axiosData';
import { UserContext } from '../../../App';

const useStyles=makeStyles({
    mainContainer:{
    },
    cardContainer:{
        border: "1px solid #E1E1E1",
        borderRadius: '21px',
        marginTop:'2%',
        boxSizing:'border-box',
        padding:"10px",
        display:'flex',
    },
    inActiveContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        padding: '3px 8px',
        width: '65px',
        height: '20px',
        border: '1px solid #2C2F32',
        borderRadius: '32px',
    },
    activeContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        padding: '3px 8px',
        width: '58px',
        height: '20px',
    
        border: '1px solid #2C2F32',
        borderRadius: '32px',
    },
    status:{
        //styleName: 10 B;
    
        fontFamily: 'Poppins',
        fontSize: '10px !important',
        fontWeight: '600 !important',
        lineHeight: '15px',
        letterSpacing: '-0.02em',
        textAlign: 'left',
        marginLeft:'4px !important',
      },
    viewImage:{
        width:'196px',
        height:'196px',
        borderRadius: '16px',
        objectFit:'cover'
    },
    leftContainer:{
        display:'flex',
        flexDirection:'row',
        gap:'20px',
        flexBasis:'70%',
        borderRight: '1px solid #868B90',
    },
    
    rightContainer:{
        flexBasis:'30%'
    },
    informationContainer:{
        paddingTop:'0.7rem',
    },
    name:{
        fontFamily: 'Poppins',
        fontSize: '28px',
        fontWeight: '600',
        lineHeight: '42px',
        letterSpacing: '-0.02em',
        textAlign: 'left'
    },
    actionContainer:{
        display:'flex',
        gap:'10px',
        flexDirection:'row'
    },
    department:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '18px',
        letterSpacing: '-0.02em',
        color: '#868B90',
    },
    icons:{

    },
    iconDiv:{
        width: '38px',
      height: '38px',
      background: '#FFFFFF',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      boxShadow: '0px 1px 7px -2px rgba(0, 0, 0, 0.15)',
      borderRadius: '7px',
      cursor:'pointer'
    },
    editIcon:{
      '&:hover':{
        background: '#ECF7FB',
      },
      '&:active':{
        color:'white',
        fill:'white',
        background:'#46B7DA',
        '& > img': {
          color: 'white',
        },
      }
    },
    Leftcontent:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        height:'100%'
    },
    rightContent:{
        display:'flex',
        padding:'0.7rem',
        flexDirection:'column',
        gap:'10px'
    },
    rightContentList:{
        display:'flex',
        flexDirection:'row',
        marginLeft:'1rem',
        gap:'1rem'
    },
    rightLabel:{
        fontFamily: 'Poppins',
        fontSize: '12px',
        fontWeight: '400',
        lineHeight: '18px',
        letterSpacing: '-0.02em',
        textAlign: 'left',
        color:'#868B90'
    },
    rightOutput:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '18px',
        letterSpacing: '-0.02em',

        color: '#2C2F32'
    }


})
const ViewCard = ({employee}) => {
    const classes=useStyles();
    const context=useContext(UserContext);
    const {role}=context;
    console.log(context)
    console.log(employee)
  return (
    <Box className={classes.mainContainer} component='div'>
        <Box className={classes.cardContainer}>
          <Box component='div' className={classes.leftContainer}>
              <Box component='img' className={classes.viewImage} src={url+employee?.profilePhoto?.filename}></Box>          
            
            <Box component='div' className={classes.informationContainer}>
                        <Box component='div' className={classes.Leftcontent}>
                            <Box component='div' >
                                <Box>
                                    {employee?.user?.status?.trim()==='active'
                                        ?
                                        <Box component='div' className={classes.activeContainer}>
                                                    <img src={active} style={{width:'5px'}}/>
                                                    <Typography component='h4' className={classes.status}>
                                                        active
                                                    </Typography>
                                            </Box>
                                                                    :
                                            <Box component='div' className={classes.inActiveContainer}>                
                                                <img src={inactive} style={{width:'5px'}}/>
                                                <Typography component='h4' className={classes.status}>
                                                    inactive
                                                </Typography>
                                            </Box>
                                    }   
                                </Box>
                                <Box>
                                    <Typography className={classes.name}>
                                    {employee?.name}
                                    </Typography>
                                    <Typography className={classes.department}>
                                    HR Manager
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className={classes.actionContainer}>
                                    <NavLink to={`/view-employee/${employee?.id}`}>
                                        <Box component='div' className={`${classes.iconDiv} ${classes.eyeIcon}`}>
                                        <img src={eye}  className={classes.icons}/>
                                        </Box>
                                    </NavLink>
                                    {role==='hr' &&
                                    <NavLink to={`/edit-employee/${employee?.id}`}>
                                        <Box component='div' className={`${classes.iconDiv} ${classes.editIcon}`}>
                                        <img src={edit} className={classes.icons} />
                                        </Box>
                                    </NavLink>
                                    }
                            </Box>
                        </Box>                        

            </Box>
          </Box>
          <Box className={classes.horizontalBorder}></Box>
          <Box className={classes.rightContainer} component='div'>
                       <Box component='ul' className={classes.rightContent}>
                           <Box component='li' className={classes.rightContentList}>
                              <Typography className={classes.rightLabel}>
                                  Employee ID:
                              </Typography>
                              <Typography className={classes.rightOutput}>
                                  {employee?.id}
                                </Typography>
                           </Box>
                           <Box component='li' className={classes.rightContentList}>
                              <Typography className={classes.rightLabel}>
                                  Department:
                              </Typography>
                              <Typography className={classes.rightOutput}>
                                  Human Resource
                                </Typography>
                           </Box>
                           <Box component='li' className={classes.rightContentList}>
                              <Typography className={classes.rightLabel}>
                                  email
                              </Typography>
                              <Typography className={classes.rightOutput}>
                                  {employee?.email}
                                </Typography>
                           </Box>
                           <Box component='li' className={classes.rightContentList}>
                              <Typography className={classes.rightLabel}>
                                  Age
                              </Typography>
                              <Typography className={classes.rightOutput}>
                                  29
                                </Typography>
                           </Box>
                           <Box component='li' className={classes.rightContentList}>
                              <Typography className={classes.rightLabel}>
                                  Location
                              </Typography>
                              <Typography className={classes.rightOutput}>
                                  {employee?.localAddress}
                                </Typography>
                           </Box>
                       </Box>
          </Box>
          
        </Box>
    </Box>
  )
}

export default ViewCard