import logo from './logo.svg';
import './App.css';
import Login from './features/login/components/login';
import { Box} from '@mui/material';
import { createMuiTheme, makeStyles } from '@material-ui/core';

import RouterLink from './routerLink';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { publicApi } from './axios/axiosData';
import { useCookies } from 'react-cookie';

const useStyles=makeStyles({
  mainContainer:{
    display:'flex',
    flexDirection:'column'
  }
})
export const UserContext=createContext();

function App() {
  const classes=useStyles();
  const [cookies]=useCookies(['token']);
  const [user,setuser]=useState({});


  return (
    <>
    <UserContext.Provider value={user}>
    {/* <UserContext.Provider > */}
      <div className='w-full h-full flex'>
        {/* <Login/>  */}
          <RouterLink/>
      </div>
    </UserContext.Provider>
    </>);
}

export default App;
