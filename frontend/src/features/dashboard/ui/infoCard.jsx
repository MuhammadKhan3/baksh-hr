import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    width: 230,
    maxHeight: 170,
    backgroundColor: "#EEEFF3 !important",
    border: "none !important",
  },
  cardHeading: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "22px !important",
    lineHeight: "33p !importantx",
    letterSpacing: "-0.02em",
    color: "#2C2F32 !important",
  },
  updateInfo: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "12px !important",
    lineHeight: "18px !important",
    letterSpacing: "-0.02em !important",
    color: "#868B90 !important",
  },
});

export default function InfoCard({ icon, title, subtitle, update }) {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined" sx={{}}>
      <CardContent>
        <IconButton>
          <img src={icon} alt="Icon" />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          className={classes.cardHeading}
        >
          {title} <br /> {subtitle}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography variant="body2" className={classes.updateInfo}>
          Last Update by <br />
          {update}
        </Typography>
      </CardContent>
    </Card>
  );
}
