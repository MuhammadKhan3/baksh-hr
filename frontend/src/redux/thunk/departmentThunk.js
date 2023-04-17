
import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie';
import {employeeAction} from '../slice/employeeSlice';
const {publicApi,adminApi}=require('../../axios/axiosData')
const {departmentsAction,banksAction,salaryTypesAction,managersAction}=employeeAction;

const DepartmentThunk = (token) => {
  return async(dispatch)=>{
            const fetchDepartment=async ()=>{
                let respone=await  axios.get(adminApi+"/department",{
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                await dispatch(departmentsAction(respone.data.departments))
            }
            fetchDepartment();

    }

   
   
}

export default DepartmentThunk