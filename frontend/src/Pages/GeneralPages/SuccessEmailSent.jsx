import React from "react";
import { useState } from 'react';
import pattern from '../../Images/decorativePattern.png';
import styles from '../../Styles/authStyles.module.css';
import logo from '../../Images/scopeLogo.png';
import { useLocation } from "react-router-dom";
import useResendEmail from "../../Hooks/useResendEmail";
import { Snackbar,IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";


const SuccessEmailSent = () => {
  const [openSnack, setOpenSnack] = useState(false);
  const location = useLocation();
  const email = location?.state?.email;
  const { handleResendEmail } = useResendEmail();


  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleResendEmailClick = async (e) => {  
    e.preventDefault(); 
    setOpenSnack(true);
    try {
      await handleResendEmail(email);
    } catch (error) {
      console.error("Error resending email:", error);
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className={styles['auth-container']}>
    <div className={styles['auth-container-item']}>
      <div className={styles['logo']}>
        <img src={logo} alt="Scope Logo" />
      </div>
      <h1 className={styles['title']}>MAT Assessment Capture</h1>
      <div className={styles['auth-box']}>
        <h2 className={styles['sub-title']}>Forgot Password</h2>

        <div className={styles['auth-form']} >
          <p className={styles['auth-form-row']}>Please check the email address: {email} for the instruction to reset your password.</p>
          <div className={styles['link-container']}>
                <p>Didn't receive an email?</p>
          </div>
          <div className={styles['link-container-backToLogin']}>
                <p><a href="/login">Back to Login</a></p>
            </div>
          <div className={styles['button-container']}>        
            <button className={styles['button']} onClick={handleResendEmailClick}>Resend</button>
          </div>
        </div>
      </div>
    </div>
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openSnack}
      autoHideDuration={3000}
      onClose={handleCloseSnack}
      action={action}
    >
      <MuiAlert
        onClose={handleCloseSnack}
        elevation={6}
        variant="filled"
        severity="info"
        sx={{ width: "100%" }}
      >
        An email has been resent to your inbox
      </MuiAlert>
    </Snackbar>
     <div className={styles['pattern']}>
        <img src={pattern} alt="My Image" />
        </div> 
    </div>
  );
};

export default SuccessEmailSent;