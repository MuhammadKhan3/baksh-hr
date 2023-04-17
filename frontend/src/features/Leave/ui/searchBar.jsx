import React from 'react'
import { styled,alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
import SearchIcon from './Icon.svg'
import { Box } from '@material-ui/core';
import axios from 'axios';
import { adminApi } from '../../../axios/axiosData';
import { useCookies } from 'react-cookie';



const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    'input': {
        '&::placeholder': {
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '21px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            color: 'black',
            opacity:'1'
        }
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },

    
  }));


  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginTop:'0%',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    border:'1px solid #E1E1E1',
    width: '100%',
    height:'40px',
    borderRadius: '10px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
    },
  }));

const SearchBar = ({setSearch}) => {
  const [cookies] = useCookies(['token']);
  const token=cookies.token;

  return (
    <Search>
        <SearchIconWrapper>
        {/* <SearchIcon /> */}
        <Box component='img' src={SearchIcon} />
        </SearchIconWrapper>
        <StyledInputBase
        onChange={(e)=>{setSearch(e?.target?.value)}}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        />
  </Search>
  )
}

export default SearchBar