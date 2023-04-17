
import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie';
import {employeeAction} from '../slice/employeeSlice';
const {publicApi,adminApi}=require('../../axios/axiosData')
const {departmentsAction,banksAction,salaryTypesAction,managersAction}=employeeAction;

const EmployeeThunk = (token) => {
  return async(dispatch)=>{
            const fetchDepartment=async ()=>{
                let respone=await  axios.get(adminApi+"/department",{
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                await dispatch(departmentsAction(respone.data.departments))
            
            }

            const fetchBanks= async ()=>{
                let response=await  axios.get(publicApi+"/banks",{
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                await console.log(response?.data?.banks)
                await dispatch(banksAction(response.data.banks))
            }

            const fetchSalaryTypes= async ()=>{
                let response=await  axios.get(adminApi+"/salaryTypes",{
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                await console.log(response?.data?.salaryTypes)
                await dispatch(salaryTypesAction(response?.data?.salaryTypes))
            }

            const fetchManagerList=async ()=>{
                let response=await  axios.get(adminApi+"/get-managersList",{
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                await console.log(response?.data?.managers)
                await dispatch(managersAction(response?.data?.managers))
            }
            fetchManagerList();
            fetchSalaryTypes();
            fetchDepartment();
            fetchBanks();
    }

   
   
}

export default EmployeeThunk