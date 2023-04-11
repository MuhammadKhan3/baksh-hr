import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  superAdmin: {
    fontFamily: "Poppins",
    fontSize: "12px !important",
    fontWeight: 600,
    lineHeight: "18px !important",
    letterSpacing: "-0.02em",
    color: "#868B90 !important",
    textTransform: "capitalize !important",
    display: "flex",
    border: "4px solid gold",
  },
});

function AdminPanel() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color={"inherit"}
        className={classes.superAdmin} // apply style class here
      >
        Super Admin <ExpandMoreIcon fontSize="large" />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Admin 1</MenuItem>
        <MenuItem onClick={handleClose}>Admin 2</MenuItem>
      </Menu>
    </>
  );
}

export default AdminPanel;
