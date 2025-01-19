import React from 'react';
import { Grid,Typography,useTheme,useMediaQuery } from '@mui/material';
import { Field } from "formik";

const LeftRightAngle = (name) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Grid item xs={6} sx={{
      paddingLeft: isSmallScreen ? 2 : 1,
      marginTop: "20px",
    }}>
      <Typography sx={{ 
        fontWeight: "bold",
        fontSize: "1.2em",
      }}>{name.type}:</Typography>
      
      <Field
        type="textarea"
        name={name.name}
        style={{
          maxWidth: isSmallScreen? "80px" : "40px",
          fontSize: "1.3em",
          margin: "10px 0",
          padding: "0.25vw",
          border: "3px solid #1D4D93",
          borderRadius: "10px",
          textAlign: "center",
        }}
      />
      <Typography fontSize="1.1em">Degrees</Typography>
    </Grid>
  
  )
}

export default LeftRightAngle