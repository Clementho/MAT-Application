import * as React from "react";
import { Grid, Typography } from "@mui/material";
import { Field } from "formik";

const DescriptionField = ({ title, page }) => {
    return (
        <Grid item xs={12}>
            <Typography
                variant="body"
                align="start"
                sx={{ 
                    fontSize:"1.2em",
                    fontWeight: "500",
                    padding: '2%'
                }}
            >
            {title}
            </Typography>

            <Grid 
                item xs={12}
                sx={{ 
                    padding: '2%',
            }}>
            <Field
                type="text"
                name={page}
                placeholder="Enter description"
                style={{ 
                    width: "90%", 
                    border: "3px solid #1D4D93",
                    borderRadius: "10px",
                    padding: '2%',
                    fontSize: "1.1em",
                }}
            />
            </Grid>

        </Grid>
    )
}

export default DescriptionField