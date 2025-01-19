import React, { useEffect } from "react";
import { Tabs, Tab, Box, Typography, Button, createTheme } from "@mui/material";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor:"#1C4D91",
          marginRight: '10px',
          borderRadius: 20,
          color: 'white',
          "&.Mui-selected": {
            //backgroundColor:"#A8D9F5",
            color: 'black',
          }
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': { display: 'none' },
          marginLeft: "20px",
          marginRight: "10px",
          marginBottom: '1%',
        }
      }
    }
  },
});

export default function MatTabs({ tabs, values, errors }) {
  // console.log("receveied ", values.lowerExtremities)
  // console.log("received errors", errors);

  const [value, setValue] = useState(0);
  const [tabStates, setTabStates] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const findEmptyValues = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (findEmptyValues(obj[key])) {
          return true; // If any nested field has an empty value, return true
        }
      } else if (obj[key] === '') {
        return true; // If any field has an empty value, return true
      }
    }
    return false; // No empty values found
  };

  const findInvalidValues = (obj) => {
    console.log("error object",obj)
    for (const key in obj) {
      console.log("errror object key",key)



      if (typeof obj[key] === 'object') {
        if (findInvalidValues(obj[key])) {
          return true; // If any nested field has an invalid value, return true
        }
      } else if (obj[key] !== '') {
        return true; // If any field has an invalid value, return true
      }
    }
    return false; // No empty values found
  }

  useEffect(() => {
    const tabNameToValueKey = {
      "Pelvis": "pelvis",
      "Trunk": 'trunk',
      "Hips": 'hips',
      "Knees and Feet": "kneesFeet",
      "Head and Neck": "headNeck",
      "Upper Limbs": "upperLimbs",
      "Lower Extremities": "lowerExtremities"
    };

    const newTabStates = tabs.map(({label}) => {
      // console.log("label",label)
      const valueKey = tabNameToValueKey[label];
      const tabValues = values[valueKey];
      // const errorValues = errors && errors[valueKey];
      console.log("tabvalues", tabValues)
      // console.log("daevea",Object.keys(values))
      const hasEmptyValues = tabValues && findEmptyValues(tabValues);
      const hasInvalidValues = errors && findInvalidValues(errors[valueKey]);

      console.log("hasempty", hasEmptyValues)
      console.log("hasinvalidvaleus", hasInvalidValues)
      
      //console.log(tabValues);

      return {
        label,
        isGreen: !hasEmptyValues,
        isRed: hasInvalidValues
      };
    });
    setTabStates(newTabStates) 
  }, [values, tabs]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          variant="fullWidth"
          onChange={handleChange}
          aria-label="basic tabs example"
          theme={theme}
        >
          {tabs.map(({ label }, i) => (
            <Tab
              label={label} 
              key={i}
              theme={theme}
              sx={{
                fontWeight: "bold",
                backgroundColor: tabStates[i]?.isRed
                  ? "#FF1800"
                  : tabStates[i]?.isGreen 
                    ? "#A6C933" 
                    : "#38A6DE", // Change the background color conditionally
              }}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ Component }, i) => (
        <TabPanel value={value} index={i} key={i}>
          {Component}
        </TabPanel>
      ))}
    </Box>
  );
}
