import React from 'react'
import { Grid,Typography,useTheme,useMediaQuery,Box } from '@mui/material'
import { Field } from "formik";
// import items from "../SupportData/supine.json";
import items from "../SupportData/posture.json";

const ThreeItemCheckBox2 = (item) => {
    const list=items.filter((i)=>i.name==item.item)[0];
    const name=item.page
    const theme = useTheme()


  const isSmallScreen = useMediaQuery( theme.breakpoints.up('md'));

  return (
 
    <Grid container>
    {list.text.map((text, index) => (
      <Grid 
        item
        key={index}
        //Splits grid columns between items evenly, max 3 items per row
        xs={
          index <= list.text.length - 1 - (list.text.length % 3)
            ? 4
            : 12 / (list.text.length % 3)
        }   
        sx={{
          padding: '5%',
          textAlign: "center",
        }}
      >
        <Box>
          <Field
            type="radio"
            name={name}
            value={text}
            style={{
              width: "20px",
              height: "20px",
              marginRight: "0.4vw",
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: isSmallScreen ? "1.1em" : "0.6em",
          }}
        >
          {text}
        </Typography>
      </Grid>
    ))}
  </Grid>
  


  )
}

export default ThreeItemCheckBox2