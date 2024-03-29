import React, { useState } from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/material";
import { useCookies } from "react-cookie";
import axios from "axios";
import { adminApi } from "../../../axios/axiosData";
import DeleteModal from "../../../components/ui/modals";
import SearchBar from "../../employee/ui/seachBar";
import EmployeeTable from "../../employee/components/employeeTable";
import AttendanceHeader from "../../attendance/ui/attendanceHeader";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  sidebar: {
    width: "25%",
  },
  employee: {
    display: "flex",
    flexDirection: "row",
    padding: "2rem",
    width: "100%",
  },

  sideBorder: {
    borderRight: "1px solid #E1E1E1;",
    width: "0px",
    height: "auto",
    margin: "0 5vw",
  },
  formikDiv: {
    width: "100%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    gap: "1.5rem",
  },

  searchContainer: {
    width: "22%",
  },
});

const ManageManager = () => {
  const classes = useStyles();
  const [employees, setemployees] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);
  const [cookies] = useCookies(["token"]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteHandler = () => {
    const token = cookies.token;

    axios
      .post(
        adminApi + "/delete-employee",
        {
          deleteId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response?.data?.flag) {
          window.location.reload();
        }
      });
  };
  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box component="div" className={classes.column}>
        <DeleteModal
          handleClose={handleClose}
          submitHandler={deleteHandler}
          handleOpen={handleOpen}
          open={open}
        />
        <AttendanceHeader
          heading={"Manage Manager"}
          width={"105%"}
          marginLeft={"0%"}
        />

        <Box component="div" className={classes.searchContainer}>
          <SearchBar setemployees={setemployees} />
        </Box>
        <EmployeeTable
          employees={employees}
          setDelete={setDeleteId}
          handleOpen={handleOpen}
          setemployees={setemployees}
        />
      </Box>
    </Box>
  );
};

export default ManageManager;
