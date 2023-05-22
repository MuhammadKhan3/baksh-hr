
import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie';
import {employeeAction} from '../slice/employeeSlice';
import { setOffices } from '../slice/companySlice';
const {publicApi,adminApi}=require('../../axios/axiosData')

const FetchOfficeThunk = (token,employeeId,setdata,data) => {
  return async(dispatch)=>{
    const FetchOffices=async ()=>{
        const response=await axios.get(adminApi+'/get-offices');
        dispatch(setOffices(response?.data?.offices))
    }
    FetchOffices();
  }
}

export default FetchOfficeThunk