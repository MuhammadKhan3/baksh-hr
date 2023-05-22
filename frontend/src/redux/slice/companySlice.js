import { createSlice } from '@reduxjs/toolkit';


const data={
    picture:'',offices:[]
}

const CompanySlice = createSlice({
  name: 'CompanySlice',
  initialState:data,
  reducers: {
    setPicture:(state,action)=>{
      state.picture=action.payload;
    },
    setOffices:(state,action)=>{
      state.offices=action.payload;
    }
  }
});
export const {setPicture,setOffices}=CompanySlice.actions;


export default CompanySlice;