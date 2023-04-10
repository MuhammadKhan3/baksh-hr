import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

// Define the styles for the component using makeStyles hook
const useStyles = makeStyles({
  // card: {
  //   width: "134px !important",
  //   maxHeight: "160px !important",
  //   boxShadow: "0px 24px 30px -10px rgba(0, 0, 0, 0.15)",
  //   borderRadius: "25px !important",
  //   // "&.id-4": {
  //   //   boder: "2px solid black",
  //   // },
  //   borderTop: ({ department }) =>
  //     department === "All Employees" ? "0px !important" : "0px !important",
  // },
  card: ({ department }) => ({
    width: "134px !important",
    maxHeight: "160px !important",
    boxShadow: "0px 24px 30px -10px rgba(0, 0, 0, 0.15)",
    borderRadius: "25px !important",
    borderTop: "0px !important",
    border: "none",
    backgroundColor: "#FCFCFC",
    color: "#2C2F32 !important",

    ...(department === "All Employees" && {
      position: "absolute",

      marginLeft: "45%",
    }),
  }),

  department: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "14px !important",
    lineHeight: "21px !important",
    textAlign: "center !important",
    letterSpacing: "-0.02em !important",
    color: "#2C2F32 !important",
    color: ({ department }) =>
      department === "All Employees"
        ? "white !important"
        : "#2C2F32 !important",
  },

  maleAndFemaleText: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "400 !important",
    fontSize: "10px !important",
    lineHeight: "15px !important",
    textAlign: "center !important",
    letterSpacing: "-0.02em !important",
    color: "#868B90 !important",
    color: ({ department }) =>
      department === "All Employees"
        ? "white !important"
        : "#868B90 !important",
  },
  totalCount: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "36px !important",
    lineHeight: "54px !important",
    letterSpacing: "-0.02em !important",
    color: "#C49150 !important",
    textAlign: "center",
    marginTop: "1rem",
    color: ({ department }) =>
      department === "All Employees"
        ? "white !important"
        : "#C49150 !important",
  },

  cardContent: {
    backgroundColor: ({ department }) =>
      department === "All Employees" ? "#C49150" : "#FCFCFC",
  },
});

// Define the EmployeeCard component
export default function EmployeeCard({
  department,
  maleCount,
  femaleCount,
  total,
  dynamicClass,
}) {
  // Assign the styles to the classes constant
  const classes = useStyles({ department, dynamicClass });

  return (
    <Card className={`${classes.card} id-${dynamicClass}`}>
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          {/* Display the department text */}
          <Typography
            variant="h5"
            component="div"
            sx={{ marginBottom: "0.75rem" }}
            className={classes.department}
          >
            {department}
          </Typography>
          {/* Display the male and female text */}
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.maleAndFemaleText}
          >
            Male: {maleCount}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.maleAndFemaleText}
          >
            Female: {femaleCount}
          </Typography>

          {/* Display the total count text */}
          <Typography
            variant="h5"
            component="div"
            className={classes.totalCount}
            sx={{ marginTop: "1rem" }}
          >
            {total}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
