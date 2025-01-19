import React from 'react';
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { useLogout } from '../Hooks/useLogout'
import { useAuthContext } from '../Hooks/useAuthContext'

import { Box, Button, Grid, ListItem, List, Typography, Modal } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

const menuItems = [
  { icon: <HomeIcon />, text: 'Home', to: '/' },
  { icon: <PersonIcon />, text: 'Profile', to: '/profile' },
  { icon: <ContentPasteIcon />, text: 'MAT', to: '/mat' }
];

function Navbar() {

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
  }

  return (
    <Grid item xs={2} >

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              textAlign: 'center',
              bgcolor: 'background.paper',
              border: '2px solid #1D4D93',
              borderRadius: "15px",
              boxShadow: 24,
              padding: "50px 40px",
              }}>
              <Typography sx={{
                fontSize: "1.8em",
                fontWeight: "bold"
              }}>Log out of MAT Assessment Tool?</Typography>

              <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "30px",
              }}>
                <Button 
                  onClick={handleClose}
                  variant='outlined'
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.1em",
                    borderRadius: "15px",
                    padding: "10px 50px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleLogout}
                  variant='contained'
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.1em",
                    bgcolor: "#1C4D91",
                    color: "#FFFFFF",
                    borderRadius: "15px",
                    padding: "10px 50px",
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          </Modal>
      
      <Grid 
        item xs={2}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "20%",
          backgroundColor:"#39A9E0",
          zIndex: -1,
        }}
      />

      <Grid 
        item xs={2}
        sx={{
          display: "flex",
          position: "fixed",
          top: "10%",
          left: 0,
          height: "100vh",
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      <List disablePadding style={{ width: "100%" }}>
        <Grid container xs={12} 
          sx={{ 
            display:"flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              activeClassName="active"
              component={NavLink}
              to={item.to}
              sx={{
                padding: "7% 0% 7% 6%",
                color: '#FFFFFF',
                "&:hover": {
                  bgcolor: "#007DBB",
                },
                "&.active": {
                  bgcolor: "#1D4D93",
                }
              }}
            >
              <Grid item textAlign="center" xs={3}><Typography sx={{ marginBottom: "-3px", "& svg": {fontSize: "2vw"} }}>{item.icon}</Typography></Grid>
              <Grid item xs={9}><Typography sx={{ fontSize: "1.7vw", fontWeight: "bold" }}>{item.text}</Typography></Grid>
            </ListItem>
          ))}
          {user && (
          <Button 
            variant="contained"
            onClick={handleOpen}
            sx={{
              marginTop: "5vh",
              fontSize: "1.2vw",
              fontWeight: "bold",
              borderRadius: "10px",
              bgcolor: "#E72971",
              "&:hover": {
                bgcolor: "#e6407f",
              }
            }}>
              Logout
            </Button>
        )}
        </Grid>
      </List>
      </Grid>
    </Grid>
  );
}

export default Navbar;
