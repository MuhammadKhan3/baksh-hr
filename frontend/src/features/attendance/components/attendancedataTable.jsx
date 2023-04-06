import React from "react";
import {
  Avatar,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { TimeField } from "@mui/x-date-pickers";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import { adminApi } from "../../../axios/axiosData";

const rows = [
  {
    id: 1,
    name: "ahmad",
    email: "ahmad327@gmail.com",
    department: "marketing",
    AttendanceBy: "manager",
    CheckIn: "checkin",
    CheckOut: "checkout",
    status: "active",
    Action: "action",
  },
  {
    id: 1,
    name: "ahmad",
    email: "ahmad327@gmail.com",
    department: "marketing",
    AttendanceBy: "manager",
    CheckIn: "checkin",
    CheckOut: "checkout",
    status: "active",
    Action: "action",
  },
  {
    id: 1,
    name: "ahmad",
    email: "ahmad327@gmail.com",
    department: "marketing",
    AttendanceBy: "manager",
    CheckIn: "checkin",
    CheckOut: "checkout",
    status: "active",
    Action: "action",
  },
  {
    id: 1,
    name: "ahmad",
    email: "ahmad327@gmail.com",
    department: "marketing",
    AttendanceBy: "manager",
    CheckIn: "checkin",
    CheckOut: "checkout",
    status: "active",
    Action: "action",
  },
  {
    id: 1,
    name: "ahmad",
    email: "ahmad327@gmail.com",
    department: "marketing",
    AttendanceBy: "manager",
    CheckIn: "checkin",
    CheckOut: "checkout",
    status: "active",
    Action: "action",
  },
  {
    id: 1,
    name: "ahmad",
    email: "ahmad327@gmail.com",
    department: "marketing",
    AttendanceBy: "manager",
    CheckIn: "checkin",
    CheckOut: "checkout",
    status: "active",
    Action: "action",
  },
  {
    id: 1,
    name: "ahmad",
    email: "ahmad327@gmail.com",
    department: "marketing",
    AttendanceBy: "manager",
    CheckIn: "checkin",
    CheckOut: "checkout",
    status: "active",
    Action: "action",
  },
];

const columns = [
  { id: "id", label: "ID" },
  { id: "employee", label: "Employees" },
  { id: "department", label: "Department" },
  { id: "attendanceBy", label: "AttendanceBy" },
  { id: "checkin", label: "CheckIn" },
  { id: "checkout", label: "CheckOut" },
  { id: "status", label: "status" },
  { id: "action", label: "Action" },
];

const useStyles = makeStyles({
  mainContainer: {},
  MuiCheckbox: {
    border: "1.5px solid #E1E1E1",
    borderRadius: "4px",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
  },
  emailType: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400 !important",
    fontSize: "12px !important",
    lineHeight: "18px",
    letterSpacing: "-0.02em",
    color: "#868B90",
  },
  nameContainer: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600 !important",
    fontSize: "12px !important",
    // linehHeight: '18px',
    letterSpacing: "-0.02em",
    color: "#2C2F32",
  },
  depdisContainer: {
    //styleName: 12 B;
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: "600",
    lineHeight: "18px",
    letterSpacing: "-0.02em",
    textAlign: "left",
    color: "#868B90",
  },
  inActiveContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "3px 8px",
    width: "65px",
    height: "20px",
    border: "1px solid #2C2F32",
    borderRadius: "32px",
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "3px 8px",
    width: "58px",
    height: "20px",

    border: "1px solid #2C2F32",
    borderRadius: "32px",
  },
  status: {
    //styleName: 10 B;

    fontFamily: "Poppins",
    fontSize: "10px !important",
    fontWeight: "600 !important",
    lineHeight: "15px",
    letterSpacing: "-0.02em",
    textAlign: "left",
    marginLeft: "4px !important",
  },
  tableContainer: {
    border: "1px solid #E1E1E1",
    borderRadius: "11px",
    width: "75%",
    marginTop: "1%",
    marginLeft: "22.5%",
  },
  tableHeader: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "10px",
    lineHeight: "15px",
    color: "#2C2F32",
    /* identical to box height */

    letterSpacing: "-0.02em",
  },
  headerText: {
    //styleName: 10 B;
    fontFamily: "Poppins",
    fontSize: "10px",
    fontWeight: "600 !important",
    lineHeight: "15px",
    letterSpacing: "-0.02em",
    textAlign: "left",
  },
  tableCell: {
    padding: "10px",
  },
  actionContainer: {
    display: "flex",
    gap: "10px",
    flexDirection: "row",
  },
  icons: {},
  iconDiv: {
    width: "38px",
    height: "38px",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 1px 7px -2px rgba(0, 0, 0, 0.15)",
    borderRadius: "7px",
    cursor: "pointer",
  },
  editIcon: {
    "&:hover": {
      background: "#ECF7FB",
    },
    "&:active": {
      color: "white",
      fill: "white",
      background: "#46B7DA",
      "& > img": {
        color: "white",
      },
    },
  },
  deleteIconc: {
    "&:hover": {
      background: "#FFEEEE",
    },
    "&:active": {
      background: "#FD5858",
    },
  },
  eyeIcon: {
    "&:hover": {
      background: "#F1ECFD",
    },
    "&:active": {
      background: "#7549EB",
    },
  },
  checked: {},
});

const AttendancedataTable = (/*{ attendance, setattendance }*/) => {
  const [page, setPage] = useState(3);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  //Remove attadance from Props and use it below .Causing error
  const [attendance, setattendance] = React.useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const classes = useStyles();
  const [cookies] = useCookies(["token"]);
  const [search, setsearch] = useState("");
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const fetchManager = async () => {
      const token = cookies.token;
      const response = await axios.get(adminApi + "/get-attendance", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setattendance(response?.data?.attendance);
      // console.log('hit',)
    };
    fetchManager();
  }, [search]);

  return (
    <div className={classes.tableContainer}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeader}>
              {columns.map((column) => (
                <TableCell
                  className={`${classes.tableCell} ${classes.headerText}`}
                  key={column.id}
                >
                  {column.label === "ID" ? (
                    <>
                      <Checkbox />
                      {column.label}
                    </>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell className={classes.tableCell}>
                    <Checkbox
                      color="primary"
                      classes={{
                        root: classes.root,
                        checked: classes.checked,
                      }}
                    />
                    {index + 1}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Box className={classes.avatarContainer}>
                      <Box sx={{ marginLeft: "8px" }}>
                        <Typography
                          variant="body1"
                          className={classes.nameContainer}
                        >
                          {row?.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.emailType}
                        >
                          {row?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    className={`${classes.tableCell} ${classes.depdisContainer}`}
                  >
                    {row?.department}
                  </TableCell>
                  <TableCell
                    className={`${classes.tableCell} ${classes.depdisContainer}`}
                  >
                    {row?.AttendanceBy}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row?.status?.trim() === "active" ? (
                      <Box component="div" className={classes.statusContainer}>
                        <Box className={classes.CheckIn}>{row.CheckIn}</Box>
                      </Box>
                    ) : (
                      <Box
                        component="div"
                        className={classes.inActiveContainer}
                      >
                        <Box className={classes.CheckOut}>{row.CheckOut}</Box>
                      </Box>
                    )}
                    <TimeField
                      label="Controlled field"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Box className={classes.actionContainer}>
                      <TableCell></TableCell>
                      <TableCell>
                        <Box className={classes.leave_box}>
                          <Box className={classes.leave_L}>{row.Six}</Box>
                        </Box>
                      </TableCell>
                      <Box className={classes.present_box}>
                        <Box className={classes.present_P}>{row.Seven}</Box>
                      </Box>
                      <TableCell>
                        <Box className={classes.absent_box}>
                          <Box className={classes.absent_A}>{row.Eight}</Box>
                        </Box>
                      </TableCell>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        style={{ display: "flex", flexDirection: "flex-start" }}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={({ from, to, count }) => {
          return `Showing ${from} to ${to} of ${count} entries`;
        }}
      />
    </div>
  );
};

export default AttendancedataTable;
