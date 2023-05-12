import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import datePicker from "../../../images/employee/datepicker.svg";
import UpdateIcon from "@mui/icons-material/Update";
import AccessibleIcon from "@mui/icons-material/Accessible";
import DateIcon from "../../../images/employee/drop";

const useStyles = makeStyles({
  label: {
    fontFamily: 'Poppins',
    fontSize: '10px',
    fontWeight: '600',
    lineHeight: '15px',
    letterSpacing: '-0.02em',
    textAlign: 'left',
    color:'#868B90'
  },
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  root: {
    [`& fieldset`]: {
      border: "1px solid #E1E1E1",
      borderRadius: "10px !important",
    },
    "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
      height: "42px",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focusVisible": {
        borderColor: "#C49A50",
      },
      "&.Mui-selected": {
        borderColor: "#C49A50",
      },
      "&:hover fieldset": {
        borderColor: "#C49A50",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#C49A50",
      },
    },
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E1E1E1",
      },
      "&:hover fieldset": {
        borderColor: "#868B90",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#C49A50",
      },
    },
  },
});
const DatePickterUi = ({
  classes,
  title,
  value,
  disabled,
  onChange,
  name,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  const dispatch = useDispatch();
  const classStyle = useStyles();
  //  const handleChange=(date)=>{
  //     dispatch(setState(date.toISOString()));
  //  }
  return (
    <>
      <Box component="div" className={classStyle.container}>
        <Typography component="h4" className={classStyle.label}>
          {title}
        </Typography>
        <DatePicker
          format="DD/MM/YYYY"
          components={{
            OpenPickerIcon: DateIcon,
          }}
          onChange={onChange}
          name={name}
          // label={name}
          className={classStyle.root}
          placeholder="hi"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <UpdateIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default DatePickterUi;
