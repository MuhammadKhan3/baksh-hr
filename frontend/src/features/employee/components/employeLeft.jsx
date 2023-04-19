import { Input, makeStyles } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React from "react";
import FileInput from "../../../components/ui/fileInput";
import InputText from "../ui/input";
import DatePickterUi from "../../../components/ui/datePickter";
import SelectUi from "../../../components/ui/select";
import MultiLineText from "../../../components/ui/multiline";
import InputNumber from "../../../components/ui/inputNumber";
import EmployeeBank from "./employeeBank";
import { useDispatch, useSelector } from "react-redux";
import { employeeAction } from "../../../redux/slice/employeeSlice";
import SelectLocalUi from "../../../components/ui/selectLocal";
const { country } = require("./country");

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: "0.8rem",
    width: "auto",
    gap: "20px",
    height: "auto",
    // border:'1px solid black'

    // #
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: "0.8rem",
    width: "30vw",
    gap: "20px",
    height: "100%",
  },
  personalLabel: {
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "27px",
    letterSpacing: "-0.02em",
    textAlign: "left",
    color: "#C49150",
  },
  root: {
    [`& fieldset`]: {
      border: "1px solid #E1E1E1",
      borderRadius: "10px !important",
    },
    width: "100%",
  },
  flexRow: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    // alignItems:'center',
    gap: 20,
  },
  border: {
    borderTop: "1px solid #E1E1E1",
    position: "relative",
    marginTop: "1rem",
    width: "auto",
    transform: "rotate(180)",
  },
});
const EmployeLeft = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
  isSubmitting,
  isValid,
  nameref,
  touched,
  values,
}) => {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.emp.employeeData);
  const name = useSelector((state) => state.emp.name);
  const fatherName = useSelector((state) => state.emp.fatherName);
  const profilePic = useSelector((state) => state.emp.profilePic);

  const classes = useStyles();
  const Country = ["pakistan", "india"];

  const martialStatus = ["single", "married", "other"];
  const Gender = ["male", "female"];
  return (
    <Box className={classes.container} component="div">
      <Box component="div">
        <Typography component="h1" className={classes.personalLabel}>
          Personal Details
        </Typography>
      </Box>
      <Box className={classes.innerContainer} component="div">
        <FileInput
          state={profilePic}
          value={values?.profile}
          setState={employeeAction.profileAction}
        />
        <InputText
          placeholder={"Add Full name"}
          title={"Name"}
          value={values.name}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
          name="name"
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          ref={nameref}
        />
        <InputText
          placeholder={"Add Father Name"}
          title={"Father Name"}
          value={values.fatherName}
          error={Boolean(touched.fatherName && errors.fatherName)}
          helperText={touched.fatherName && errors.fatherName}
          name="fatherName"
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <Box className={classes.flexRow}>
          <DatePickterUi
            title={"Date of Birth"}
            classes={classes}
            value={values.dob}
            error={Boolean(touched.dob && errors.dob)}
            helperText={touched.dob && errors.dob}
            name="dob"
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
          />
          <SelectLocalUi
            title={"Gender"}
            data={Gender}
            value={values.gender}
            error={Boolean(touched.gender && errors.gender)}
            helperText={touched.gender && errors.gender}
            name="gender"
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder={"Select Gender"}
            classes={classes}
          />
        </Box>
        <Box className={classes.flexRow}>
          <InputNumber
            label={"Phone 1"}
            error={Boolean(touched.contactOne && errors.contactOne)}
            helperText={touched.contactOne && errors.contactOne}
            name="contactOne"
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Add Contact No"
            classes={classes}
          />

          <InputNumber
            label={"Phone 2"}
            error={Boolean(touched.contactTwo && errors.contactTwo)}
            helperText={touched.contactTwo && errors.contactTwo}
            name="contactTwo"
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Add Contact No"
            classes={classes}
          />
        </Box>
        <MultiLineText
          label={"Local Address"}
          error={Boolean(touched.localAddress && errors.localAddress)}
          helperText={touched.localAddress && errors.localAddress}
          name="localAddress"
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          placeholder={"Add Local Address"}
        />
        <InputText
          placeholder={"Add Permanent Address"}
          title={"Permanent Address"}
          value={values.permanentAddress}
          error={Boolean(touched.permanentAddress && errors.permanentAddress)}
          helperText={touched.permanentAddress && errors.permanentAddress}
          name="permanentAddress"
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <Box className={classes.flexRow}>
          <SelectLocalUi
            title={"Nationality"}
            value={values.nationality}
            error={Boolean(touched.nationality && errors.nationality)}
            helperText={touched.nationality && errors.nationality}
            name="nationality"
            placeholder={"Select Nationality"}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            data={country}
            classes={classes}
          />
          <SelectLocalUi
            title={"Marital Status"}
            data={martialStatus}
            classes={classes}
            value={values.martialStatus}
            error={Boolean(touched.martialStatus && errors.martialStatus)}
            helperText={touched.martialStatus && errors.martialStatus}
            name="martialStatus"
            touched={touched}
            placeholder={"Select Marital Status"}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </Box>
        <Box component="hr" className={classes.border}></Box>
        <EmployeeBank
          parentClass={classes}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isValid={isValid}
          values={values}
          touched={touched}
        />
      </Box>
    </Box>
  );
};

export default EmployeLeft;
