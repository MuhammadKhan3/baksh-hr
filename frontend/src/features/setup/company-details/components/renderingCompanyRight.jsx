import React from "react";
import CompanyRight from "../ui/companyRight";
import { Button, makeStyles } from "@material-ui/core";
import BlackButton from "../ui/button";
import { Theme } from "@mui/material";

const useStyles = makeStyles((Theme) => ({
  buttonStyling: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3.18rem",
    [Theme.breakpoints.down("md")]: {
      marginTop: "1rem",
      justifyContent: "end",
      marginLeft: "1rem",
    },
  },
}));
export default function RenderingComponentRight({offices,setOffices}) {
  const classes = useStyles();
  const AddofficeHandler=()=>{
    setOffices((state)=>{
      return [...state,{
        id:offices.length+1,
        address:'',
        country:'',
        city:'',
        userId:'',
        officeCode:''

      }]
    })
  }
  return (
    <div>
      {offices.map((data,i)=>{
        return <CompanyRight data={data} id={data?.id} offices={offices} setOffices={setOffices} office="Office #1" />
      })}
      {/* <CompanyRight office="Office #2" /> */}
      <div className={classes.buttonStyling}>
        <BlackButton label="Add More" onClick={AddofficeHandler}/>
      </div>
    </div>
  );
}
