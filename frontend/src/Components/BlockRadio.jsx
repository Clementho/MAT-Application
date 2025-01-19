import * as React from "react";
import { styled } from "@mui/material";
import { Field } from "formik";

import ResponsiveText from "./ResponsiveText";
import items from "../SupportData/posture.json"

const StyledLabel = styled("label")({
    display: "block",
    alignItems: "center",
})

const BlockRadio = ({item, page}) => {
    const list = items.filter((i) => i.name === item)[0];

    return (
        <>
            {list.text.map((value) => (
                <StyledLabel>
                    <Field 
                        type="radio"
                        name={page}
                        value={value} 
                        style={{ 
                            width: "15px", 
                            height: "15px",
                            marginBottom: "0",
                            marginRight: "2%",
                        }}
                    />
                    <ResponsiveText label={value}/>
                </StyledLabel>
            ))}
        </>
    );
};

export default BlockRadio;