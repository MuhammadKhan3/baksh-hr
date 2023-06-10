import * as React from "react";
import { Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Define the ForwardArrow component with a destructured arrow prop
export default function ForwardArrow({ arrow }) {
  return (
    // Use the MUI Box component to create a container for the arrow icon
    <Box
      // Add a class name for styling
      className="classes.arrowStyling"
      sx={{
        // Set the width and height of the box
        width: "40px",
        height: "40px",
        // Add a border radius to create rounded corners
        borderRadius: "10px",
        // Set the background color of the box
        backgroundColor: "#C49150",
        // Use flexbox to center the arrow icon inside the box
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Render the arrow icon using the MUI ArrowForwardIosIcon component */}
      <ArrowForwardIosIcon />
    </Box>
  );
}
