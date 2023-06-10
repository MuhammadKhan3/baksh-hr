import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { UserContext } from '../../App';
import { adminApi, url } from '../../axios/axiosData';


const useStyles=makeStyles({
    btnContainer:{
        backgroundColor:'#2C2F32',
        borderRadius: '52px'
    },
    dropIcon:{
        width:'12px',
        height:'6px',
        marginLeft:'5px'
    },
    label:{
        color:'#868B90',
        fontSize: '12px',
        marginLeft:'5px'


    },
    avatar:{
        width: '36px',
        height: '36px',
        marginLeft:'5px'
    },
    menuContainer:{
        width:'10%'
    }
})



const CustomButton = styled(Button)`
  && {
    background:none;
    &:active {
        background: #2C2F32;
        border-radius: 52px;      
    }
    &:hover {
        background: #2C2F32;
        border-radius: 52px;      
    }
  }
`;

// Wrap the custom styled component with withStyles HOC
const CustomStyledButton = withStyles({
  root: {
  },
})(CustomButton);

export default function BasicMenu() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate=useNavigate();
  const classes=useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let profilePhoto='https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  const context=React.useContext(UserContext)
  let profileLink='';
  let {role,profile}=context
  console.log(context)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose=()=>{
    setAnchorEl(null);
  }
  const handleLogoutHandler = () => {
    setAnchorEl(null);
    removeCookie('userId');
    removeCookie('token');
    removeCookie('permission');
    removeCookie('role');
    navigate('/')
  };
  if(role=='hr'){
    role='ADMIN'
    profileLink='/setup/company-details'
  }else if(role=='employee'){
    const {employeeId}=context;
    role='EMPLOYEE'
    profilePhoto=url+profile
    profileLink=`/view-employee/${employeeId}`
  }else if(role=='manager'){
    role='MANAGER'
    profileLink='/setup/company-details'
  }
  return (
    <div>
      <CustomStyledButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar className={classes.avatar} alt="Remy Sharp" src={profilePhoto} />
        <span className={classes.label}>{role}</span>
        <img src={'./dropdown.svg'} className={classes.dropIcon} />
      </CustomStyledButton>
      <Menu
        PaperProps={{
            className:classes.menuContainer
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <NavLink to={profileLink}>
           <MenuItem onClick={handleClose}>Profile</MenuItem>
        </NavLink>
        <MenuItem onClick={handleLogoutHandler}>Logout</MenuItem>
        
      </Menu>
    </div>
  );
}
