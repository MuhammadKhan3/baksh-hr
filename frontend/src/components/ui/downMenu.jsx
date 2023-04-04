import React from 'react'

import { Container, List, ListItem, ListItemButton,ListItemIcon, ListItemText  } from '@mui/material';
import { Box } from '@mui/system'
import { makeStyles } from '@material-ui/core';
import { NavLink, useLocation } from 'react-router-dom';

const useStyles=makeStyles({
   childList:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'start !important',
    alignItems:'start !important',
    width:'86%',
    borderRadius:'10px',
   },
   listItem:{
    padding:'12px 11px 12px 11px !important',
    width:'100%',
   },
   nestedList:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'end !important',
    alignItems:'end !important',
    width:'100%'
   },
   rotate:{
    '-webkit-transform': 'rotateX(180deg)',
    transform: 'rotateX(180deg)',
   },
   active:{
    backgroundColor:'#2C2F32',
    color:'white',
    borderRadius: '10px',
    fill:'white'
   },
   list:{
    cursor:'pointer',
    //styleName: 14 B;
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '21px',
    letterSpacing: '-0.02em',
    textAlign: 'left',
    gap:'0.8rem',
    padding:'12px, 11px, 12px, 11px',
    width:'100%',
    justifyContent:'center',
  },
})


const menuClickHandler=()=>{

}

const DownMenu = ({classes,icon,label,downArrow,droplabel,tab,settab,path}) => {
  const location = useLocation();
  const currentRoute = location.pathname;


  

  
  const classStyle=useStyles();

  const openHandler=(value)=>{
    console.log(value)
    if(value===tab){
      settab('')
    }else{
      settab(value)
    }
  }
  
  return (<>
                   <NavLink className={`${classStyle.list}   ${droplabel?.some(arr=>arr.path===currentRoute)===true && classStyle.active}`} to={path}>
                      <ListItemButton className={classStyle.list} style={{borderRadius:'10px'}} >
                        <Box component='img' src={icon}/>
                          <ListItemText primary={label}/>
                        <Box component='img' src={downArrow} className={tab===label && classStyle.rotate} onClick={()=>{openHandler(label)}}/>
                      </ListItemButton>
                   </NavLink>

                    {tab===label &&
                          <List className={classStyle.nestedList}> 
                            {droplabel?.map((page)=>{
                              return<NavLink  className={classStyle.childList} to={page.path}>
                                <ListItemButton className={classStyle.listItem}  style={{borderRadius:'10px'}}>
                                    {page.label}
                                </ListItemButton>
                              </NavLink>
                            })}
                          </List>
                      }
                      {/* <NavLink to={}>
                      </NavLink>                        */}

  </>
  )
}

export default DownMenu