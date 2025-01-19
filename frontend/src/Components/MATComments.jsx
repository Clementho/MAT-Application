import React from "react";
import { Grid, Typography } from "@mui/material";
import { Field } from "formik";

const MATComments = ({title, commentName}) => {
    return(
    <>
        <Grid item xs={12} margin="20px 0 5px 0">
          <Typography
            variant="body"
            align="start"
            sx={{
                fontWeight: "bold",
                fontSize: "1.4em",
            }}
          >
            {title}:
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Field
            as="textarea"
            name={commentName}
            placeholder={`Enter ${title}...`}
            style={{
                height:"100px",
                width: "98%",
                border: "3px solid #1D4D93",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "1.2em",
            }}
          />
        </Grid>
    </>
    )
}

export default MATComments