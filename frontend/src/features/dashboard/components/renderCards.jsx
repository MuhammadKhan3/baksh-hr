import React from "react";
import EmployeeCard from "../ui/employeeCard";
import { Box, Grid } from "@mui/material";
import InformationCard from "../ui/infoCard";
import { makeStyles } from "@mui/styles";
import userIcon from "../../dashboard/icons/users-icon.png";
import employeeIcon from "../../dashboard/icons/employee-icon.png";
import InfoCard from "../ui/infoCard";

const useStyle = makeStyles({
  container: {
    width: "110% !important",
    // height: "277px !important",
    height: "230px !important",
    background: "#EEEFF3",
    borderRadius: "25px",
    // position: "relative",
  },
  employeeGrid: {
    width: "fit-content !important",
  },
  card: {
    "&.id-4": {
      color: "white",
    },
  },
});

const employeesData1 = [
  {
    id: 0,
    department: "BOD",
    maleCount: 1,
    femaleCount: 1,
    total: 3,
  },
  {
    id: 1,
    department: "Legal",
    maleCount: 1,
    femaleCount: 1,
    total: 2,
  },
  {
    id: 2,
    department: "Sales",
    maleCount: 1,
    femaleCount: 1,
    total: 27,
  },
  {
    id: 3,
    department: "Marketing",
    maleCount: 1,
    femaleCount: 1,
    total: 7,
  },
  {
    id: 4,
    department: "All Employees",
    maleCount: 3,
    femaleCount: 1,
    total: 62,
  },
];

const employeesData2 = [
  {
    id: 5,
    department: "BOD",
    maleCount: 1,
    femaleCount: 1,
    total: 3,
  },
  {
    id: 6,
    department: "Legal",
    maleCount: 1,
    femaleCount: 1,
    total: 2,
  },
  {
    id: 7,
    department: "Sales",
    maleCount: 1,
    femaleCount: 1,
    total: 27,
  },
  {
    id: 8,
    department: "Marketing",
    maleCount: 1,
    femaleCount: 1,
    total: 7,
  },
  {
    id: 9,
    department: "All Employees",
    maleCount: 3,
    femaleCount: 1,
    total: 54,
  },
];

const employeesData = employeesData1.concat(employeesData2);

const employeesInfo = [
  {
    id: 1,
    icon: userIcon,
    title: "Employees",
    subtitle: "Information",
    update: "6 April 2023",
  },
  {
    id: 2,
    icon: employeeIcon,
    title: "Daily Attendance",
    subtitle: "Information",
    update: "6 April 2023",
  },
];

export default function RenderCards() {
  const classes = useStyle();
  const employeeDataList1 = employeesData1.map((employee) => (
    <EmployeeCard
      key={employee.id}
      department={employee.department}
      maleCount={employee.maleCount}
      femaleCount={employee.femaleCount}
      total={employee.total}
      dynamicClass={employee.id}
      // className={`${classes.card} id-${employee.id}`}
    />
  ));
  const employeeInfoList1 = employeesInfo
    .filter((employee) => employee.id === 1)
    .map((employee) => (
      <InfoCard
        key={employee.id}
        icon={employee.icon}
        title={employee.title}
        subtitle={employee.subtitle}
        update={employee.update}
      />
    ));

  const employeeInfoList2 = employeesInfo
    .filter((employee) => employee.id === 2)
    .map((employee) => (
      <InfoCard
        key={employee.id}
        icon={employee.icon}
        title={employee.title}
        subtitle={employee.subtitle}
        update={employee.update}
      />
    ));

  const employeeDataList2 = employeesData2.map((employee) => (
    <EmployeeCard
      key={employee.id}
      department={employee.department}
      maleCount={employee.maleCount}
      femaleCount={employee.femaleCount}
      total={employee.total}
      // className={`id_${employee.id}`}
    />
  ));

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Grid
          container
          direction={"row"}
          // spacing={5}
          // gap={5}
          alignItems={"center"}
          className={classes.container}
        >
          <Grid item>{employeeInfoList1}</Grid>
          <Grid
            container
            item
            direction={"row"}
            // spacing={3}
            //  gap={3.125}
            gap={2.5}
            className={classes.employeeGrid}
          >
            {employeeDataList1}
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          direction={"row"}
          // spacing={5}
          // gap={5}
          alignItems={"center"}
          className={classes.container}
        >
          <Grid item>{employeeInfoList2}</Grid>
          <Grid
            container
            item
            direction={"row"}
            // spacing={3}
            // gap={3.125}
            gap={2.5}
            className={classes.employeeGrid}
          >
            {employeeDataList2}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
