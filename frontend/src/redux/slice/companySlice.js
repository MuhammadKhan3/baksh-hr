import { createSlice } from '@reduxjs/toolkit';


const data={
    picture:''
}

const CompanySlice = createSlice({
  name: 'CompanySlice',
  initialState:data,
  reducers: {
    setPicture:(state,action)=>{
      state.picture=action.payload;
    },
  }
});
export const {setPicture}=CompanySlice.actions;


export default CompanySlice;