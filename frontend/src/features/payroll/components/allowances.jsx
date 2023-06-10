import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import InputText from '../ui/inputText';
import plus from '../plus.svg'
import deleteIcon from '../delete.svg'
import { useCookies } from 'react-cookie';
import axios from 'axios';

// import plus from '../plus.svg'


const useStyles=makeStyles({
    label:{
        fontFamily: 'Poppins',
        fontSize: '14px',
        fontWeight: '600',
        lineHeight: '21px',
        letterSpacing: '-0.02em',
        textAlign: 'left'
    },
    plusContainer:{
        cursor:'pointer',
        backgroundColor:'#C49150',
        width:'2rem',
        marginLeft:'1%',
        height:'2rem',
        borderRadius:'10px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        '&:hover':{
            opacity:'0.8'
        }
    },
    plusIcon:{
        width:'0.9rem'
    },
    allowanceContainer:{
        display:'flex',

    },
    mainContainer:{
        width:"100%",
    },
    container:{
        display:'flex',
        justifyContent:'space-between',
        marginTop:'0.4rem'
    },
    allowance:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'5px'
    },
    btnContainer:{
        display:'flex',
        justifyContent:'center'
    }

})
const Allowances = ({setDeleteAllowance,allowances,setAllowances}) => {
    const classes=useStyles();
    const [cookies]=useCookies(['token'])
    const addFieldHandler=()=>{
        setAllowances(prev=> [...prev,{
            id:allowances.length+1,
            allowance:'',
            deduction:''
        }])
    }

    const deleteFieldHandler=(id)=>{
        setDeleteAllowance(state=>[...state,id])
        const data=allowances.filter(data=>data?.id!==id)
        console.log(data)
        setAllowances(data)
    }

    const allowanceHandler=(e,id)=>{
        console.log(id)
        id=id-1;
        const {value,name}=e.target;
        const updatedItems = [...allowances];
        console.log(updatedItems)
        updatedItems[id][name] = value;
        setAllowances(updatedItems);
    }



  return (<>
        <Box className={classes.mainContainer} component='div'>
            <Box component='div' className={classes.innerContainer}>
                <Box className={classes.container}  component='div'>
                    <Box className={classes.allowance}>
                        <Box className={classes.allowanceContainer}>
                                <InputText placeholder={'Add Allowance'} />
                                <Box onClick={addFieldHandler} className={classes.plusContainer} component='div'>
                                <img src={plus} className={classes.plusIcon}/>
                                </Box>
                        </Box>
                    </Box>

                    <Box className={classes.allowance}>
                        <Box className={classes.allowanceContainer}>
                                <InputText placeholder={'Add Deduction'} />
                                <Box onClick={addFieldHandler} className={classes.plusContainer} component='div'>
                                <img src={plus} className={classes.plusIcon}/>
                                </Box>
                        </Box>
                    </Box>
                </Box>
                
                {allowances?.length>0 && allowances.map((data,i)=>{
                    return <>
                        <Box className={classes.container} key={i}  component='div'>
                            <Box className={classes.allowance}>
                                <Box className={classes.allowanceContainer}>
                                        <InputText placeholder={'Add Allowance'} value={data?.allowance} name={'allowance'} changeHandler={(e)=>{allowanceHandler(e,data?.id)}} />
                                        <Box className={classes.plusContainer} onClick={()=>{deleteFieldHandler(data?.id)}} component='div'>
                                        <img src={deleteIcon} className={classes.plusIcon}/>
                                        </Box>
                                </Box>
                            </Box>

                            <Box className={classes.allowance}>
                                <Box className={classes.allowanceContainer}>
                                        <InputText placeholder={'Add Deduction'} value={data?.deduction} name={'deduction'} changeHandler={(e)=>{allowanceHandler(e,data?.id)}}/>
                                        <Box className={classes.plusContainer} onClick={()=>{deleteFieldHandler(data?.id)}} component='div'>
                                            <img src={deleteIcon}  className={classes.plusIcon}/>
                                        </Box>
                                </Box>
                            </Box>
                        </Box>
                    </>
                })}
                

            </Box>
            
        </Box>
  </>)
}

export default Allowances