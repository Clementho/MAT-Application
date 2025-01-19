import * as React from "react";
import { useEffect } from "react";
import { styled, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useFormikContext } from "formik";

import ResponsiveText from "./ResponsiveText";
import items from "../SupportData/posture.json";

const StyledLabel = styled("label")({
  display: "flex",
  alignItems: "center",
  width: "90%",
  margin: "auto",
  marginTop: "20px",
});

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

const LRBlockRadio = ({ item, page }) => {
  const formik = useFormikContext();
  const { setFieldValue } = useFormikContext();
  const currentValue = getObjectProperty(formik.values, page).split("-");
  const list = items.find((i) => i.name === item);

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
      {list.text.map((rotationValue) => (
        <StyledLabel key={rotationValue}>
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
          <ResponsiveText label={rotationValue} />
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
        </StyledLabel>
      ))}
    </>
  );
};

export default LRBlockRadio;
