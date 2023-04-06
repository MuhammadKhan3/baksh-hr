import React from "react";
import { Route, Routes } from "react-router-dom";
import EditEmployee from "./features/employee/pages/editemployee";
import Managemployee from "./features/employee/pages/managemployee";
import ViewEmployee from "./features/employee/pages/viewemployee";
//Add Leave Component
import AddLeave from "./features/Leave/pages/AddLeave";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import Attendance from "./features/attendance/pages/attendance";
import ManageAttandance from "./features/attendance/pages/ManageAttandance";

const Dashboard = React.lazy(() => import("./features/dashboard"));
const Employee = React.lazy(() => import("./features/employee"));
const Login = React.lazy(() => import("./features/login"));

const theme = createMuiTheme({
  typography: {
    // fontFamily:'Poppins'
  },
});
const RouterLink = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <React.Suspense fallback={<>...</>}>
                <Dashboard />
              </React.Suspense>
            }
          />
          <Route
            path="/add-employee"
            element={
              <React.Suspense fallback={<>...</>}>
                <Employee />
              </React.Suspense>
            }
          />

          <Route
            path="/edit-employee/:employeeId"
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <EditEmployee />
              </React.Suspense>
            }
          />
          <Route
            path="/view-employee/:employeeId"
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <ViewEmployee />
              </React.Suspense>
            }
          />
          <Route
            path="/manage-employees"
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <Managemployee />
              </React.Suspense>
            }
          />

          <Route
            path="/"
            element={
              <React.Suspense fallback={<>...</>}>
                <Login />
              </React.Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <React.Suspense fallback={<>...</>}>
                <Dashboard />
              </React.Suspense>
            }
          />
          <Route
            path="/daily-attendance"
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <Managemployee />
              </React.Suspense>
            }
          />
          <Route
            path="/"
            element={
              <React.Suspense fallback={<>...</>}>
                <Login />
              </React.Suspense>
            }
          />

          <Route
            path="/AddAttendance"
            element={
              <React.Suspense fallback={<>...</>}>
                <Login />
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
            path="/attendance-report"
            element={
              <React.Suspense fallback={<>...</>}>
                <Attendance />
              </React.Suspense>
            }
          />
          <Route
            path="/manage-attendance"
            element={
              <React.Suspense fallback={<>...</>}>
                <ManageAttandance />
              </React.Suspense>
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default RouterLink;
