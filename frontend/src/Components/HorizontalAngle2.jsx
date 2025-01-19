import React from 'react';
import { Box, useMediaQuery, useTheme} from '@mui/material';
import { Field } from "formik";



const HorizontalAngle2 = (name) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("xl"));
  
  return (
    <Box sx={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 2fr',
        marginTop: '10px', 
        fontSize: isSmallScreen ? "1em" : "0.7em",
    }}>
      <Box marginTop="10px">
        <Box style={{
          fontWeight: "bold",
          fontStyle: "italic",
          fontSize: "1.2em",
        }}>{name.type2}
        </Box>
        <Box sx={{ marginTop: "6px", width: "90%" }}>
          {name.desc}
        </Box>
      </Box>

      <Box sx={{ 
        display: 'inline', 
        marginRight: '10px',
      }}>
          <Field 
            type="number"
            name={name.name1}
            min="0"
            max ="90"
            style={{
              width: "60%",
              fontSize: "1.1em",
              padding: "2% 0",
              border: "3px solid #1D4D93",
              borderRadius: "10px",
              textAlign: "center",
            }}
          />
          <span style={{ fontSize: "1.4em" }}> &#176;</span>
      </Box>

      <Box sx={{ 
        display: 'inline', 
        marginRight: '10px' 
      }}>
          <Field 
            type="number"
            name={name.name2}
            min="0"
            max="90"
            style={{
              width: "60%",
              fontSize: "1.1em",
              padding: "2% 0",
              border: "3px solid #1D4D93",
              borderRadius: "10px",
              textAlign: "center",
            }}
          />
          <span style={{ fontSize: "1.4em" }}> &#176;</span>
      </Box>
      
      <Box sx={{
        fontSize: "1.1em",
        fontStyle: "italic",
      }}>
        {name.type3}
        <span style={{ fontSize: "1.4em" }}> &#176;</span>
      </Box>

      <Box sx={{ 
        display: 'inline', 
        marginRight: '10px' 
      }}>
          <Field 
            type="text"
            name={name.name3}
            style={{
              width: "90%",
              fontSize: "1.1em",
              padding: "2%",
              border: "3px solid #1D4D93",
              borderRadius: "10px",
            }}/>
      </Box>
    </Box>
  )
}

export default HorizontalAngle2