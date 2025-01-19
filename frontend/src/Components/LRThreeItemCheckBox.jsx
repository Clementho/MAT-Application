import React from "react";
import { useEffect } from "react";
import {
  ImageList,
  ImageListItem,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import { Field, useFormikContext } from "formik";
import items from "../SupportData/posture.json";
import ResponsiveText from "./ResponsiveText";

// Function to access nested object properties
const getObjectProperty = (obj, path) => {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
      result = result[key];
      if (result === undefined) {
      break;
      }
  }

  return result;
};

const LRThreeItemCheckBox = ({ imgItem, item, page }) => {
  const formik = useFormikContext();
  const { setFieldValue } = useFormikContext();
  const currentValue = getObjectProperty(formik.values, page).split("-");

  const imgList = items.find((i) => i.name === imgItem);
  const list = items.find((i) => i.name === item);
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const med = useMediaQuery(theme.breakpoints.only("lg"));

  const handleChangeParent = (e) => {
    setFieldValue(page, `${e.target.value}-L`);
  };

  const handleChangeChild = (e, rotationValue) => {
    setFieldValue(page, `${rotationValue}-${e.target.value}`);
  };

  const rotationMatch = (rotationValue) => {
    return (currentValue[0] === rotationValue);
  };

  const childSelectedValue = (rotationValue) => {
    if(rotationMatch(rotationValue)) return currentValue[1];
    
    return "";
  }

  useEffect(() => {
    const parentRadio = document.getElementById(`radio-${currentValue[0]}`)
    if(currentValue[1]) parentRadio.checked = true;
  }, [currentValue])

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
          {imgList.img.map((image, index) => (
            <ImageListItem key={index}>
              <img src={image} alt="img" />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
      <Grid container>
        <Grid item xs={4} textAlign="center">
          <label>
            <Field 
                type="radio"
                name={page}
                value="Neutral" 
                style={{ 
                    width: "15px", 
                    height: "15px",
                    marginBottom: "0",
                    marginRight: "2%",
                }}
            />
            <Typography 
                display="block"
                sx={{
                  fontSize: isSmallScreen ? "1.2em" : "0.6em",
                }}
              > 
                  Neutral
            </Typography>
          </label>
        </Grid>

      {list.text.map((rotationValue) => (
        <Grid item xs={4} textAlign="center">
        <label key={rotationValue}>
          <input
            id={`radio-${rotationValue}`}
            type="radio"
            name={page}
            value={rotationValue}
            onChange={(e) => handleChangeParent(e)}
            style={{
              width: "15px",
              height: "15px",
              marginRight: "2%",
            }}
          />
          <Typography 
            display="block"
            sx={{
              fontSize: isSmallScreen ? "1.2em" : "0.6em",
            }}
          > 
              {rotationValue}
          </Typography>
          <ToggleButtonGroup
            exclusive
            id={`radio-${rotationValue}-toggle-group`}
            value={childSelectedValue(rotationValue)}
            onChange={(e) => handleChangeChild(e, rotationValue)}
            disabled={!rotationMatch(rotationValue)}
            aria-label="Toggle direction"
            sx={{
                marginLeft: "auto",
            }}
          >
            <ToggleButton
              value="L"
              sx={{
                width: "30px",
                height: "30px",
                marginBottom: "0",
                marginLeft: "2%",
                fontSize: "1.3em",
                fontWeight: "bold",
                "&.Mui-selected, &.Mui-selected:hover":{
                    bgcolor: "#0075FF",
                    color: "#FFFFFF",
                },
              }}
            >
              L
            </ToggleButton>
            <ToggleButton
              value="R"
              sx={{
                width: "30px",
                height: "30px",
                marginBottom: "0",
                fontSize: "1.3em",
                fontWeight: "bold",
                "&.Mui-selected, &.Mui-selected:hover":{
                    bgcolor: "#0075FF",
                    color: "#FFFFFF",
                },
              }}
            >
              R
            </ToggleButton>
          </ToggleButtonGroup>
        </label>
        </Grid>
      ))}
      </Grid>
    </>
  );
};

export default LRThreeItemCheckBox;
