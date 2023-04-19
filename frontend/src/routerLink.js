import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import EditEmployee from "./features/employee/pages/editemployee";
import Managemployee from "./features/employee/pages/managemployee";
import ViewEmployee from "./features/employee/pages/viewemployee";
import DailyAttendance from "./features/attendance/pages/DailyAttendance";
//Add Leave Component
import AddLeaveHr from "./features/Leave/pages/hr/AddLeave"
import ManageLeaveHr from "./features/Leave/pages/hr/manageLeave";
import LeaveType from "./features/setup/leave/pages/AddLeaveType";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import Attendance from "./features/attendance/pages/attendance";
import ManageAttandance from "./features/attendance/pages/ManageAttandance";
import Dashboardd from "./features/dashboard/Pages/Dashboardd";
import { UserContext } from "./App";
import AddLeaveEmployee from "./features/Leave/pages/employee/AddLeave";
import ManageLeaveEmployee from "./features/Leave/pages/employee/manageEmployeeLeave";
import ManageLeaveManagerEmployee from "./features/Leave/pages/manager/manageManagerEmployees";
import ManagemployeeManager from "./features/employee/pages/manager/manageEmployee";
import DailyAttendanceTable from "./features/attendance/pages/DailyAttendance";
import EditLeaveHr from "./features/Leave/pages/hr/editLeave";
import CompanyDetails from "./features/setup/company-details/Pages/CompanyDetails";

const Dashboard = React.lazy(() => import("./features/dashboard"));
const Employee = React.lazy(() => import("./features/employee"));
const Login = React.lazy(() => import("./features/login"));

const theme = createMuiTheme({
  typography: {
    // fontFamily:'Poppins'
  },
});
const RouterLink = () => {
  const context = useContext(UserContext);
  let {role=''} = context;
  console.log(role)
  if(role==='admin'){
    return (
      <>
        <ThemeProvider theme={theme}>
          <Routes>
            {/* <Route
              path="/dashboard"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Dashboard />
                </React.Suspense>
              }
            /> */}
            {/* <Route
              path="/dashboard"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Dashboardd />
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
            /> */}
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
                  <AddLeaveEmployee />
                </React.Suspense>
              }
            />
            <Route
              path="/manage-leave"
              element={
              <React.Suspense fallback={<>...</>}>
                <ManageLeaveHr/>
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
  }
  else if(role==='hr'){
    return (
      <>
        <ThemeProvider theme={theme}>
          <Routes>
            {/* <Route
              path="/dashboard"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Dashboard />
                </React.Suspense>
              }
            /> */}
            <Route
              path="/dashboard"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Dashboardd />
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
                  <DailyAttendanceTable/>
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
                  <AddLeaveHr />
                </React.Suspense>
              }
            />
            <Route
              path="/manage-leave"
              element={
                <React.Suspense fallback={<>...</>}>
                  <ManageLeaveHr/>
                </React.Suspense>
               }
            />
            <Route
              path="/edit-leave/:leaveId"
              element={
                <React.Suspense fallback={<>...</>}>
                  <EditLeaveHr/>
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
            <Route
              path="/setup/add-leaveType"
              element={
                <React.Suspense fallback={<>...</>}>
                  <LeaveType/>
                </React.Suspense>
              }
          />
          <Route
              path="/setup/company-details"
              element={
                <React.Suspense fallback={<>...</>}>
                  <CompanyDetails/>
                </React.Suspense>
              }
          />
          </Routes>
        </ThemeProvider>
      </>
    );
  }
  else if(role==='employee'){
    
      return (
        <>
          <ThemeProvider theme={theme}>
            <Routes>
              {/* <Route
                path="/dashboard"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <Dashboard />
                  </React.Suspense>
                }
              /> */}
              <Route
                path="/dashboard"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <Dashboardd />
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
                    <AddLeaveEmployee/>
                  </React.Suspense>
                }
              />
              <Route
                path="/manage-leave"
                element={
                <React.Suspense fallback={<>...</>}>
                  <ManageLeaveEmployee/>
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
  }else if(role==='manager'){
        return (
          <>
            <ThemeProvider theme={theme}>
              <Routes>
                {/* <Route
                  path="/dashboard"
                  element={
                    <React.Suspense fallback={<>...</>}>
                      <Dashboard />
                    </React.Suspense>
                  }
                /> */}
                <Route
                  path="/dashboard"
                  element={
                    <React.Suspense fallback={<>...</>}>
                      <Dashboardd />
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
                      <ManagemployeeManager/>
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
                      <AddLeaveEmployee/>
                    </React.Suspense>
                  }
                />
                <Route
                  path="/manage-leave"
                  element={
                  <React.Suspense fallback={<>...</>}>
                    <ManageLeaveEmployee/>
                  </React.Suspense>
                  }
                />
                <Route
                  path="/employees-leave"
                  element={
                    <React.Suspense fallback={<>...</>}>
                      <ManageLeaveManagerEmployee/>
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
      
  }else {
      return <>
          <ThemeProvider>
            <Routes>
            <Route
              path="/"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Login />
                </React.Suspense>
              }
            />
                  </Routes>
            </ThemeProvider>
      </>
  }

};

export default RouterLink;
