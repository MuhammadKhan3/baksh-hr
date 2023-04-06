import { makeStyles } from "@material-ui/core";
import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import msg from "../../../images/msg.svg";
import notification from "../../../images/notification.svg";
import Avatar from "@mui/material/Avatar";
import AdminPanel from "./adminPanel";
const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: "1rem",
    paddingLeft: "0rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "75%",
    marginLeft: "22%",
  },
  pageName: {
    fontFamily: "Poppins",
    fontSize: "28px",
    fontWeight: "600",
    lineHeight: "42px",
    letterSpacing: "-0.02em",
    textAlign: "left",
  },
  msgIcon: {
    cursor: "pointer",
    color: "#868B90",
    stroke: "#868B90",
    width: "18px",
    height: "18.46px",
  },
  notificationIcon: {
    cursor: "pointer",
    color: "#868B90",
    stroke: "#868B90",
    width: "18px",
    height: "18.46px",
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    // border: "2px solid gold",
  },
  avatar: {
    // marginBottom: "12px",
    // marginTop: "3px",
    width: "36px",
    height: "36px",
  },
  navRight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default function AttendanceHeader({ heading }) {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.mainContainer}>
      <Box component="div" className={classes.pageName}>
        {heading}
      </Box>
      <Box
        component="div"
        className={`${classes.pageName} ${classes.navRight}`}
      >
        {/* <Button> */}
        <IconButton size="large">
          <Box component="img" src={msg} className={classes.msgIcon} />
        </IconButton>

        <IconButton size="large">
          <Box
            component="img"
            src={notification}
            className={classes.notificationIcon}
          />
        </IconButton>
        {/* </Button> */}

        <Box className={classes.avatarContainer}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className={classes.avatar}
          >
            AB
          </Avatar>

          <AdminPanel />
        </Box>
      </Box>
    </Box>
  );
}
