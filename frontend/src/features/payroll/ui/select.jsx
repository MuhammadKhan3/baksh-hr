import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, makeStyles } from '@material-ui/core';
import { FormHelperText, InputLabel, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import Dropdown from '../../../images/employee/drop.svg';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};





const useStyles=makeStyles({
  container:{
      display:'flex',
      flexDirection:'column',
      position:'relative',
      top:'1.5rem',
      paddingLeft:'0.8rem',
      width:'100%',
      gap:'20px'
  },
  personalLabel:{
      fontFamily: 'Poppins',
      fontSize: '18px',
      fontWeight: '400',
      lineHeight: '27px',
      letterSpacing: '-0.02em',
      textAlign: 'left',
      color:'#C49150',

  },
  root: {

      '&.Mui-focusVisible':{
        borderColor: '#C49A50',

      },
      '&.Mui-selected':{
        borderColor: '#C49A50',
      },
      '&:hover fieldset': {
        borderColor: '#C49A50',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#C49A50',
      },

     '& .css-10q54uo-MuiSelect-icon':{
      top:'0.3rem',
      },
      '& .css-3qbkez-MuiSelect-icon':{
        top:'0.3rem',
      },
      height:'42px',
      '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#E1E1E1',
          },
          '&:hover fieldset': {
            borderColor: '#868B90',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#C49A50',
          },
      },
      [`& fieldset`]: {
          border: '1px solid #E1E1E1',
        borderRadius: "10px !important",
      },
      width:'100%'
  },
  select:{
    width:'100%',
    '& .MuiSelect-icon': {
      // top: 'calc(50% - 12px)',
      // position: 'absolute',
      // background: 'blue',
      // borderRadius: '8px',
  
    },
  },
  flexRow:{
      display:'flex',
      width:'100%',
      flex:1,
  },
  label:{
    fontFamily: 'Poppins',
    fontSize: '10px',
    fontWeight: '600',
    lineHeight: '15px',
    letterSpacing: '-0.02em',
    textAlign: 'left',
    color:'#868B90'
  },
  dropIconContainer:{
    background: '#FCFCFC',
    borderRadius: '8px',
    width:'32px',
    height:'32px'
  }
})

function getStyles(name,personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectUi({id,title,data=[],handleChange,name,value,error,helperText,handleBlur,placeholder}) {
  const classes=useStyles();
  const dispatch=useDispatch();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  // const handleChange = (event,child) => {
  //   const {
  //     target: { value },
  //   } = event; 
  //     const id=child.props.id;
  //     console.log(id)


  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };
  console.log(id)
  const answer=''
  return (
      <FormControl sx={{ width: '100%'}} >
        <Typography component='h4' className={classes.label}>
            {title}
        </Typography>
        <Select
          className={`${classes.root} ${classes.select}`}
          displayEmpty
          name={name}
          value={value}
          renderValue={
            value !== "" ? undefined : () => <div>{placeholder}</div>
          }
          IconComponent={(props)=>(
            <Box {...props} component='div' style={{      
                  width: '32px',
                  height: '32px',
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  background: '#FCFCFC',
                  borderRadius: '8px',
            }}>
             <img    
             style={{
              pointerEvents: 'none',
              height:'6px',
              widht:'12px',
             }}
             src={Dropdown}
             />
            </Box>
          )}
          error={error}
          onBlur={handleBlur}
          onChange={handleChange}
          input={<OutlinedInput />}
          label={placeholder}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          placeholder={placeholder}
          id={id}
        >
          {data.map((list,id) => (
            <MenuItem
              key={id}
              id={id}
              value={list.id}
              style={{textTransform: 'capitalize'}}
              // style={getStyles(list.label, personName, theme)}
            >
              {list.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={Boolean(helperText)}>{helperText}</FormHelperText>
      </FormControl>
  );
}