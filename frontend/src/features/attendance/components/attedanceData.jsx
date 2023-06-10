import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Box, Container } from "@mui/system";
import { TablePagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import axios from "axios";
import { adminApi } from "../../../axios/axiosData";
import { useDispatch, useSelector } from "react-redux";
import DepartmentThunk from "../../../redux/thunk/departmentThunk";
import { useCookies } from "react-cookie";
import { UserContext } from "../../../App";

const useStyles = makeStyles({
  id_box: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "-0.02em",
    color: "#2C2F32",
  },
  id_text: {
    position: "absolute",
    width: "20px",
    height: "18px",
    left: "409px",
    top: "257px",
  },
  username: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "66px",
    height: "18px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "-0.02em",
    color: "#2C2F32",
  },
  present_box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "6px 10px",
    gap: "10px !important",
    width: "30px",
    // width: "25px",
    height: "30px",
    background: "#EAF9F0",
    borderRadius: "7px",
  },
  present_P: {
    width: 7,
    height: 18,
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "18px",
    textAlign: "center",
    letterSpacing: "-0.02em",
    color: "#38C671",
  },
  absent_box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "6px 10px",
    gap: "10px",
    width: "30px",
    // width: "25px",
    height: "30px",
    background: "#FFEEEE",
    borderRadius: "7px",
  },

  absent_A: {
    width: "9px",
    height: "18px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    textAlign: "center",
    letterSpacing: "-0.02em",
    color: "#FD5858",
  },
  leave_box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "6px 10px",
    gap: "10px",
    width: "30px",
    // width: "25px",
    height: "30px",
    background: "#F1ECFD",
    borderRadius: "7px",

    paddingX: "10px",
  },
  leave_L: {
    width: "6px",
    height: "18px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    textAlign: "center",
    letterSpacing: "-0.02em",
    color: "#7549EB",
  },
  total_Present: {
    width: "9px",
    height: "21px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "21px",
    letterSpacing: "-0.02em",
    color: "#38C671",
  },
  total_Absent: {
    width: "9px",
    height: "21px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "21px",
    letterSpacing: "-0.02em",
    color: "#FD5858",
  },
  AttendanceManager: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text_Present: {
    width: "43px",
    height: "15px",
    left: "1195px",
    top: "214px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "10px",
    lineHeight: "15px",
    letterSpacing: "-0.02em",
    color: "#38C671",
  },
  text_Absent: {
    width: "43px",
    height: "15px",
    left: "1195px",
    top: "214px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "10px",
    lineHeight: "15px",
    letterSpacing: "-0.02em",
    color: "#FD5858",
  },
  text_Leave: {
    width: "43px",
    height: "15px",
    left: "1195px",
    top: "214px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "10px",
    lineHeight: "15px",
    letterSpacing: "-0.02em",
    color: "#7549EB",
  },
  total_Leaves: {
    width: "9px",
    height: "21px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "21px",
    letterSpacing: "-0.02em",
    color: "#7549EB;",
  },
  font_style: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "10px",
    lineHeight: "15px",
    letterSpacing: "-0.02em",
    color: "#2C2F32",
    textAlign: "center !important",
  },
  decreaseGap: {
    width: "24px !important",
  },
  sunday_style: {
    // width: "8px ",
    height: "15px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "10px",
    lineHeight: "15px",
    letterSpacing: "-0.02em",
    color: "#FD5858 !important",
  },
  leave_style: {
    // width: "8px ",
    height: "15px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "10px",
    lineHeight: "15px",
    letterSpacing: "-0.02em",
    color: "#46B7DA; !important",
  },
  tableContainer: {
    border: "1px solid #E1E1E1",
    borderRadius: "11px",
    // width: "175%",
    marginTop: "1%",
    marginLeft: "22.5%",
  },
  tableCell: {
    padding: "0px !important",
    paddingTop: "0.5rem !important",
    paddingBottom: "0.5rem !important",
    textAlign: "center !important",
  },
});

function createData(
  id,
  name,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Eleven,
  Twelve,
  Thirteen,
  Fourteen,
  Fifteen,
  Sixteen,
  Seventeen,
  Eighteen,
  present,
  absent,
  leave
) {
  return {
    id,
    name,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Eleven,
    Twelve,
    Thirteen,
    Fourteen,
    Fifteen,
    Sixteen,
    Seventeen,
    Eighteen,
    present,
    absent,
    leave,
  };
}

const rows = [
  createData(
    "001",
    "Robert Flyn",
    "P",
    "P",
    "A",
    "P",
    "P",
    "L",
    "P",
    "A",
    "P",
    "P",
    "P",
    "L",
    "P",
    "P",
    8,
    2,
    3
  ),
  createData(
    "001",
    "Rabert Flyn",
    "P",
    "P",
    "A",
    "P",
    "P",
    "L",
    "P",
    "A",
    "P",
    "P",
    "P",
    "L",
    "P",
    "P",
    8,
    2,
    3
  ),
];


const attendanceSplit=(status,classes)=>{
  const statusSub=status.substring(0, 1)
  return <TableCell className={classes.tableCell}>
               <Box className={classes.username}>{statusSub}</Box>
          </TableCell>
}

const AttendanceCount=(status,data)=>{
  let count=0;
  data.forEach((element) => {
    if(element?.status==status){
      count++;
    }
  });
  return count;

}




export default function AttendanceData() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const classes = useStyles();
  const [page, setPage] = React.useState(3);
  const [days,setdays]=React.useState(0);
  const [cookies] = useCookies(['token']);
  const [attendance,setAttendance]=React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const departments=useSelector(state=>state.emp.departments);
  const department=useSelector(state=>state.user.department);
  const startDate=useSelector(state=>state.user.startDate);
  const endDate=useSelector(state=>state.user.endDate);
  const dateSearch=useSelector(state=>state.user.date);

  const search=useSelector(state=>state.user.search);
  const dispatch=useDispatch();
  const date=new Date()

  React.useEffect(()=>{
    const {token}=cookies
    dispatch(DepartmentThunk(token))
    const attendanceHandler=async ()=>{
      const response=await axios.get(adminApi+`/attendance-report?department=${department}&search=${search}&startDate=${startDate}&endDate=${endDate}`)
      console.log(response)

      setAttendance(response?.data?.attendance?.Attendace)
      setdays(response?.data?.attendance?.days)
    }
    attendanceHandler();
  },[department,search,dateSearch])

  const getDayName = (dayNum) => {
    const dayName = moment().day(dayNum).format('dddd');
    return dayName;
  };



  console.log(moment().format('d'))

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          // border: "2px solid red",
          marginLeft: "22.5%",
          marginRight: "3%",
          width: "75%",
        }}
      >
        <Table
          sx={{
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>
                <Checkbox label="ID" />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.id_box}>ID</Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>Employee</Box>
              </TableCell>
              <TableCell className={classes.tableCell}></TableCell>
              {console.log(days)}
              {days>0 && Array(parseInt(days)).fill([1]).map((data,i)=>{
                  {console.log('10')}
                  return(
                    <>
                     {getDayName(i+1)==='Sunday' ?
                      <TableCell
                           className={`${classes.decreaseGap} ${classes.tableCell}`}
                      >
                        <Box
                          className={`${classes.font_style} ${classes.sunday_style}`}
                        >
                          {i+1}
                        </Box>
                      </TableCell>
                      :
                      <TableCell className={classes.tableCell}>
                        <Box className={classes.font_style}>{i+1}</Box>
                      </TableCell>              
                      }
                    </>
                  )
                })
              }
              {/* <TableCell className={classes.tableCell}>
                    <Box className={classes.font_style}>01</Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>02</Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>03</Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>04</Box>
              </TableCell>
              <TableCell
                className={`${classes.decreaseGap} ${classes.tableCell}`}
              >
                <Box
                  className={`${classes.font_style} ${classes.sunday_style}`}
                >
                  05
                </Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>06</Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>07</Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>08</Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>09</Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>10</Box>
              </TableCell>
              <TableCell
                className={`${classes.decreaseGap} ${classes.tableCell}`}
              >
                <Box
                  className={`${classes.font_style} ${classes.sunday_style}`}
                >
                  11
                </Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>12</Box>
              </TableCell>
              <TableCell
                className={`${classes.decreaseGap} ${classes.tableCell}`}
              >
                <Box className={`${classes.font_style} ${classes.leave_style}`}>
                  13
                </Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>14</Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>15</Box>
              </TableCell>

              <TableCell
                className={`${classes.decreaseGap} ${classes.tableCell}`}
              >
                <Box
                  className={`${classes.font_style} ${classes.sunday_style}`}
                >
                  16
                </Box>
              </TableCell>

              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>17</Box>
              </TableCell>
              <TableCell
                className={`${classes.decreaseGap} ${classes.tableCell}`}
              >
                <Box className={classes.font_style}>18</Box>
              </TableCell> */}

              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>
                  <Box className={classes.text_Present}>Present</Box>
                </Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>
                  <Box className={classes.text_Absent}>Absent</Box>
                </Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>
                  <Box className={classes.text_Leave}>Leaves</Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {console.log(attendance)}
            {attendance?.length>0 && attendance.map((row) => (
              ///Row One Start
              <TableRow key={row.id}>
                <TableCell className={classes.tableCell}>
                  <Checkbox label="ID" />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.id_box}>{row.id}</Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.username}>{row.name}</Box>
                </TableCell>

                <TableCell></TableCell>

                {console.log(row?.attendances?.length)}

                {days>0 && row?.attendances?.length>0 && row?.attendances?.map(({status})=>{
                  return  attendanceSplit(status,classes)
                })} 
                {console.log(days>0 && row?.attendances?.length &&  parseInt(days-row?.attendances?.length))}
                {days>0 && Array(days-row?.attendances?.length).fill([1]).map((i)=>{
                    return<TableCell className={classes.tableCell} key={i}>
                      <Box className={classes.present_box}>
                        <Box className={classes.present_P}>NA</Box>
                      </Box>
                    </TableCell>
                })}
                
                {/*<TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.One}</Box>
                  </Box>
                </TableCell>

                <TableCell className={classes.tableCell}>
                  <Box className={classes.absent_box}>
                    <Box className={classes.absent_A}>{row.Three}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Four}</Box>
                  </Box>
                </TableCell>

                <TableCell></TableCell>

                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Five}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.leave_box}>
                    <Box className={classes.leave_L}>{row.Six}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Seven}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.absent_box}>
                    <Box className={classes.absent_A}>{row.Eight}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Nine}</Box>
                  </Box>
                </TableCell>

                <TableCell></TableCell>

                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Ten}</Box>
                  </Box>
                </TableCell>

                <TableCell></TableCell>

                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Eleven}</Box>
                  </Box>
                </TableCell>

                <TableCell className={classes.tableCell}>
                  <Box className={classes.leave_box}>
                    <Box className={classes.leave_L}>{row.Twelve}</Box>
                  </Box>
                </TableCell>

                <TableCell
                  className={`${classes.tableCell} ${classes.decreaseGap}`}
                ></TableCell>

                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Fourteen}</Box>
                  </Box>
                </TableCell>

                <TableCell></TableCell>*/}

                <TableCell className={classes.tableCell}>
                  <Box className={classes.AttendanceManager}>
                    <Box className={classes.total_Present}>{AttendanceCount('present',row?.attendances)}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.AttendanceManager}>
                    <Box className={classes.total_Absent}>{AttendanceCount('absent',row?.attendances)}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.AttendanceManager}>
                    <Box className={classes.total_Leaves}>{AttendanceCount('leave',row?.attendances)}</Box>
                  </Box>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          style={{ display: "flex", flexDirection: "flex-start" }}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelDisplayedRows={({ from, to, count }) => {
            return `Showing ${1} to ${to} of ${5} entries`;
          }}
        />
      </TableContainer>
    </Box>
  );
}






export  function AttendanceDataEmployee() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const classes = useStyles();
  const [page, setPage] = React.useState(3);
  const [days,setdays]=React.useState(0);
  const [cookies] = useCookies(['token']);
  const [attendance,setAttendance]=React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const departments=useSelector(state=>state.emp.departments);
  const department=useSelector(state=>state.user.department);
  const startDate=useSelector(state=>state.user.startDate);
  const endDate=useSelector(state=>state.user.endDate);
  const dateSearch=useSelector(state=>state.user.date);
  const context=React.useContext(UserContext);
      //  console.log('secret',secret,token)
  const {userId}=context

  const search=useSelector(state=>state.user.search);
  const dispatch=useDispatch();
  const date=new Date()

  React.useEffect(()=>{
    const {token}=cookies
    dispatch(DepartmentThunk(token))
    const attendanceHandler=async ()=>{
      const response=await axios.get(adminApi+`/view-attendance-employee/${userId}?department=${department}&search=${search}&startDate=${startDate}&endDate=${endDate}`,{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
      console.log(response)

      setAttendance(response?.data?.attendance?.Attendace)
      setdays(response?.data?.attendance?.days)
    }
    attendanceHandler();
  },[department,search,dateSearch])

  const getDayName = (dayNum) => {
    const dayName = moment().day(dayNum).format('dddd');
    return dayName;
  };



  console.log(moment().format('d'))

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          // border: "2px solid red",
          marginLeft: "22.5%",
          marginRight: "3%",
          width: "75%",
          overflow: 'auto' // Enable scrolling for overflow

        }}
      >
        <Table
          sx={{
            overflow: 'auto',
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>
                <Checkbox label="ID" />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.id_box}>ID</Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>Employee</Box>
              </TableCell>
              <TableCell className={classes.tableCell}></TableCell>
              {console.log(days)}
              {days>0 && Array(parseInt(days)).fill([1]).map((data,i)=>{
                  {console.log('10')}
                  return(
                    <>
                     {getDayName(i+1)==='Sunday' ?
                      <TableCell
                           className={`${classes.decreaseGap} ${classes.tableCell}`}
                      >
                        <Box
                          className={`${classes.font_style} ${classes.sunday_style}`}
                        >
                          {i+1}
                        </Box>
                      </TableCell>
                      :
                      <TableCell className={classes.tableCell}>
                        <Box className={classes.font_style}>{i+1}</Box>
                      </TableCell>              
                      }
                    </>
                  )
                })
              }

              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>
                  <Box className={classes.text_Present}>Present</Box>
                </Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>
                  <Box className={classes.text_Absent}>Absent</Box>
                </Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box className={classes.font_style}>
                  <Box className={classes.text_Leave}>Leaves</Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {console.log(attendance)}
            {attendance?.length>0 && attendance.map((row) => (
              ///Row One Start
              <TableRow key={row.id} sx={{overflow:'auto',width:'auto'}}>
                <TableCell className={classes.tableCell}>
                  <Checkbox label="ID" />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.id_box}>{row.id}</Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.username}>{row.name}</Box>
                </TableCell>

                <TableCell></TableCell>

                {console.log(row?.attendances?.length)}

                {days>0 && row?.attendances?.length>0 && row?.attendances?.map(({status})=>{
                  return  attendanceSplit(status,classes)
                })} 
                {console.log(days>0 && row?.attendances?.length &&  parseInt(days-row?.attendances?.length))}
                {days>0 && Array(days-row?.attendances?.length).fill([1]).map((i)=>{
                    return<TableCell className={classes.tableCell} key={i}>
                      <Box className={classes.present_box}>
                        <Box className={classes.present_P}>NA</Box>
                      </Box>
                    </TableCell>
                })}
                
                {/*<TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.One}</Box>
                  </Box>
                </TableCell>

                <TableCell className={classes.tableCell}>
                  <Box className={classes.absent_box}>
                    <Box className={classes.absent_A}>{row.Three}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Four}</Box>
                  </Box>
                </TableCell>

                <TableCell></TableCell>

                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Five}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.leave_box}>
                    <Box className={classes.leave_L}>{row.Six}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Seven}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.absent_box}>
                    <Box className={classes.absent_A}>{row.Eight}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Nine}</Box>
                  </Box>
                </TableCell>

                <TableCell></TableCell>

                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Ten}</Box>
                  </Box>
                </TableCell>

                <TableCell></TableCell>

                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Eleven}</Box>
                  </Box>
                </TableCell>

                <TableCell className={classes.tableCell}>
                  <Box className={classes.leave_box}>
                    <Box className={classes.leave_L}>{row.Twelve}</Box>
                  </Box>
                </TableCell>

                <TableCell
                  className={`${classes.tableCell} ${classes.decreaseGap}`}
                ></TableCell>

                <TableCell className={classes.tableCell}>
                  <Box className={classes.present_box}>
                    <Box className={classes.present_P}>{row.Fourteen}</Box>
                  </Box>
                </TableCell>

                <TableCell></TableCell>*/}

                <TableCell className={classes.tableCell}>
                  <Box className={classes.AttendanceManager}>
                    <Box className={classes.total_Present}>{AttendanceCount('present',row?.attendances)}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.AttendanceManager}>
                    <Box className={classes.total_Absent}>{AttendanceCount('absent',row?.attendances)}</Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Box className={classes.AttendanceManager}>
                    <Box className={classes.total_Leaves}>{AttendanceCount('leave',row?.attendances)}</Box>
                  </Box>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          style={{ display: "flex", flexDirection: "flex-start" }}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelDisplayedRows={({ from, to, count }) => {
            return `Showing ${from} to ${to} of ${count} entries`;
          }}
        /> */}
      </TableContainer>
    </Box>
  );
}
