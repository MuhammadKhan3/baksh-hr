import { configureStore } from '@reduxjs/toolkit';
import AppSlice from './slice/appSlice';
import EmployeeSlice from './slice/employeeSlice';
import UserSlice from './slice/userSlice';
import CompanySlice from './slice/companySlice';

const store = configureStore({
  reducer: {
    emp:EmployeeSlice.reducer,user:UserSlice.reducer,app:AppSlice.reducer,company:CompanySlice.reducer
  }
});

export default store;