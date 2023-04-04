import { setError,setMsg } from "../slice/appSlice";
import axios from 'axios'

const {publicApi,adminApi}=require('../../axios/axiosData')

const LoginThunk=(data,navigate,setCookie)=>{

    return async (dispatch)=>{
        const Login=async ()=>{
            try {
                const response= await axios.post(publicApi+'/login',data,{
                    headers: {"Content-Type": "application/json"},
                });
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate()+1);
                setCookie('userId',response?.data?.response?.data.userId,{
                    expires: tomorrow 
                })
                console.log(response?.data?.response?.token)
                setCookie('role',response?.data?.response?.data?.role,{
                    expires: tomorrow 
                })
                setCookie('permission',response?.data?.response?.data?.permission?.module,{
                    expires: tomorrow 
                })
                setCookie("token",response?.data?.response?.token,{
                    expires: tomorrow 
                })
                navigate('/dashboard')

                // cson
                // const data=respone.json();
            } catch (error) {
                // console.log(error?.response?.data?.errors[0]?.msg)             
                dispatch(setError(true))
                dispatch(setMsg(error?.response?.data?.errors[0]?.msg))
            }
        }
        Login();
    }
}

export default LoginThunk;