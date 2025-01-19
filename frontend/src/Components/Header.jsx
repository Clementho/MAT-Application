import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Typography, Grid } from '@mui/material';

import logo from "../Images/scopeLogo.png"
import pattern from '../Images/decorativePattern.png';

import { useAuthContext } from '../Hooks/useAuthContext'


const Header = () => {
    const { user } = useAuthContext();


  return (
    <Grid item xs={12}>
    <AppBar position="static" sx={{bgcolor: "#1D4D93"}}>
      <Container maxWidth="xl" >
        <Toolbar 
            disableGutters
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 0",
                columnGap: "10vw"
            }}
        >

        <img src={logo} alt="Scope Logo" width="8%" height="8%"/>
        <Typography fontSize="2.1vw" fontWeight="bold" letterSpacing="0.2rem" flexGrow="1">MAT Assessment Tool</Typography>
        <Box display="flex" alignItems="center" columnGap="10px">
            <AccountCircle sx={{fontSize: "2.2vw"}}/>
            <Typography fontSize="1.5vw">{user.username}</Typography>
        </Box>
        
        </Toolbar>
      </Container>
      <img src={pattern} alt="decorative pattern" style={{ width:"100%", maxHeight: "10px"}}/>
    </AppBar>
    </Grid>
  );
}
export default Header;
