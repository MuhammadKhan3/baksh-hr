import React from "react";
import { Route, Routes } from "react-router-dom";
import EditEmployee from "./features/employee/pages/editemployee";
import Managemployee from "./features/employee/pages/managemployee";
import ViewEmployee from "./features/employee/pages/viewemployee";
import DailyAttendance from "./features/attendance/pages/DailyAttendance";
//Add Leave Component
import AddLeave from "./features/Leave/pages/AddLeave";
import LeaveType from "./features/setup/leave/pages/AddLeaveType";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import ManageLeave from "./features/Leave/pages/manageLeave";

const Dashboard = React.lazy(() => import("./features/dashboard"));
const Employee = React.lazy(() => import("./features/employee"));
const Login = React.lazy(() => import("./features/login"));

const theme=createMuiTheme({
typography:{
  // fontFamily:'Poppins'
}
})
const RouterLink = () => {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Routes>
          <Route path="/dashboard" 
              element={  
              <React.Suspense fallback={<>...</>}>
                <Dashboard/>
              </React.Suspense>
              } 
          />
          <Route path="/add-employee"  
              element={  
              <React.Suspense fallback={<>...</>}>
                <Employee/>
              </React.Suspense>
              } 
          />

          <Route path="/edit-employee/:employeeId" 
              element={  
              <React.Suspense fallback={<>Loading...</>}>
                <EditEmployee/>
              </React.Suspense>
              } 
          />
          <Route path="/view-employee/:employeeId" 
              element={  
              <React.Suspense fallback={<>Loading...</>}>
                <ViewEmployee/>
              </React.Suspense>
              } 
          />
          <Route path="/manage-employees" 
              element={  
              <React.Suspense fallback={<>Loading...</>}>
                <Managemployee/>
              </React.Suspense>}
          />

          <Route path="/" 
              element={  
              <React.Suspense fallback={<>...</>}>
                <Login/>
              </React.Suspense>
              } 
          />
          <Route path="/daily-attendance" 
              element={  
             <React.Suspense fallback={<>Loading...</>}>
                {/* <Attendance/> */}
                {/* <Dashboard/> */}
                <DailyAttendance/>
              </React.Suspense>
              } 
          />
          <Route path="/" 
              element={  
              <React.Suspense fallback={<>...</>}>
                <Login/>
              </React.Suspense>
              } 
          />

          <Route path="/AddAttendance" 
              element={  
              <React.Suspense fallback={<>...</>}>
                <Login/>
              </React.Suspense>
              } 
          />
        <Route
          path="/add-leave"
          element={
            <React.Suspense fallback={<>...</>}>
              <AddLeave />
            </React.Suspense>
          }
        />
        <Route
          path="/manage-leave"
          element={
            <React.Suspense fallback={<>...</>}>
              <ManageLeave/>
            </React.Suspense>
          }
        />
       {/* Setup */}

        <Route
          path="/setup/add-leaveType"
          element={
            <React.Suspense fallback={<>...</>}>
              <LeaveType/>
            </React.Suspense>
          }
        />
      </Routes>
    </ThemeProvider>
    </>
  );
};

export default RouterLink;
