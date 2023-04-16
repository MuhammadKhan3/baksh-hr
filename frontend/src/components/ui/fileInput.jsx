import { Box, makeStyles } from "@material-ui/core";
import { Label } from "@mui/icons-material";
import { Input } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { url } from "../../axios/axiosData";
import file from "../../images/file.svg";

const useStyles = makeStyles({
  container: {
    display: "flex",
    cursor: "pointer",
    justifyContent: "start",
    alignItems: "center",
    gap: 10,
  },
  fonsize: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "18px",
    /* identical to box height */

    letterSpacing: "-0.02em",
  },
  file: {
    width: "133px",
    height: "133px",
    border: "1px dashed #868B90",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  fileLogo: {
    display: "flex",
  },
  filedescription: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "15px",
    textAlign: "center",
    letterSpacing: "-0.02em",
  },
  fileRightFont: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "18px",
    /* identical to box height */

    letterSpacing: "-0.02em",
  },

  span: {
    color: "#868B90",
  },
});
//add label to the props for dynamic label
const FileInput = ({ setState, state, value, label }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const HandleChange = (e) => {
    dispatch(setState(e.target.files[0]));
  };
  return (
    <Box component="div" className={classes.container}>
      <input
        type="file"
        hidden
        onChange={HandleChange}
        name="profile"
        id="profile"
      />
      <label htmlFor="profile">
        <Box component="div" className={classes.file}>
          {state || value ? (
            <Box
              component="img"
              src={value?.length > 0 ? url + value : URL.createObjectURL(state)}
              className={classes.fileLogo}
            />
          ) : (
            <>
              <Box component="img" src={file} className={classes.fileLogo} />
              <p className={classes.filedescription}>
                Drop a file or browse a file to upload
              </p>
            </>
          )}
        </Box>
      </label>
      <Box component="h1" className={classes.fileRightFont}>
        {/* Replace Static label with dynamic label */}
        {label ? label : "Upload Profile Picture"}
        <span className={classes.span}>(2 MB max Size)</span>
      </Box>
    </Box>
  );
};

export default FileInput;
