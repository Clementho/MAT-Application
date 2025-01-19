import React from "react";
import { Typography, useTheme, useMediaQuery, Grid } from "@mui/material";
const MatPageHeaders = (title) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Grid container justifyContent="center"
    alignItems="center" >
      <Grid item={12} align="center" sx={{ height: "50px" }}>
        <Typography
          variant={isSmallScreen ? "body1" : "h5"}
          sx={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          {title.title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MatPageHeaders;
