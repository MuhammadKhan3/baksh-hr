import { createSlice } from '@reduxjs/toolkit';


const data={

    email:'',password:'',department:'',startDate:null,endDate:null,search:'',date:false
}
const UserSlice = createSlice({
  name: 'user',
  initialState:data,
  reducers: {
    emailAction:(state,action)=>{
      state.email=action.payload;
    },
    passwordAction:(state,action)=>{
        state.password=action.payload;
    },
    departmentAction:(state,action)=>{
      state.department=action.payload;
    },
    startDate:(state,action)=>{
      state.startDate=action.payload;
    },
    endDate:(state,action)=>{
      state.endDate=action.payload;
    },
    setSearch:(state,action)=>{
      state.search=action.payload;
    },
    setDateSearch:(state,action)=>{
      state.date=action.payload;
    }


  }
});
export const userActions=UserSlice.actions;


export default UserSlice;