import React from "react";
import {
  ImageList,
  ImageListItem,
  Grid,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Field } from "formik";
import items from "../SupportData/posture.json";

const ThreeItemCheckBox = (item) => {
  const list = items.filter((i) => i.name === item.item)[0];
  const name = item.page;
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const med = useMediaQuery(theme.breakpoints.only("lg"));

  return (
    <>
      <Grid
        item
        xs={12}
        sx={{
          height: med ? "150px" : isSmallScreen ? "300px" : "100px",
        }}
      >
        <ImageList cols={1}>
          {list.img.map((image, index) => (
            <ImageListItem key={index}>
              <img src={image} alt="img" />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
      <Grid container>
        {list.text.map((text, index) => (
          <Grid
            item
            //Splits grid columns between items evenly, max 3 items per row
            xs={
              index <= list.text.length - 1 - (list.text.length % 3)
                ? 4
                : 12 / (list.text.length % 3)
            }            
            key={index}
            sx={{
              padding: '5%',
              textAlign: index <= list.text.length - 1 - (list.text.length % 3)
                ? "center"
                : "left",
            }}
          >
            <Box
              sx={{
                display: index <= list.text.length - 1 - (list.text.length % 3)
                  ? "block"
                  : "inline-block",
              }}
            >
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
                display: isSmallScreen ? "inline" : "block",
                fontSize: isSmallScreen ? "1.1em" : "0.6em",
              }}
            >
              {text}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ThreeItemCheckBox;
