import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "./Icon.svg";
import { Box } from "@material-ui/core";
import axios from "axios";
import { adminApi } from "../../../axios/axiosData";
import { useCookies } from "react-cookie";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  input: {
    "&::placeholder": {
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "21px",
      letterSpacing: "-0.02em",
      textAlign: "left",
      color: "black",
      opacity: "1",
    },
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = styled("div")(({ theme, width }) => ({
  // added `width` prop to accept width value
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginTop: "2%",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  border: "1px solid #E1E1E1",
  width: width || "22%", // set width to prop value or default to "22%"
  height: "40px",
  borderRadius: "10px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
  },
}));

const SearchBar = ({ setemployees, width }) => {
  // accept `width` prop to pass down to Search component
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  const searchHandler = async (e) => {
    const value = e.target.value;
    const response = await axios.post(
      adminApi + "/search-employees",
      { search: e.target.value },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    setemployees(response?.data?.employees);
  };
  return (
    <Search width={width}>
      {" "}
      {/* pass down `width` prop to Search component */}
      <SearchIconWrapper>
        <Box component="img" src={SearchIcon} />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={searchHandler}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default SearchBar;
