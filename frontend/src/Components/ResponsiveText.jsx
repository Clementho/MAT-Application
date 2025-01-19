import { useTheme,useMediaQuery,Typography } from '@mui/material'
import React from 'react'

const ResponsiveText = (label) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Typography 
      display={'inline'}
      sx={{
        fontSize: isSmallScreen ? "1.2em" : "0.6em",
      }}
    > 
        {label.label}
    </Typography>
  )
}

export default ResponsiveText