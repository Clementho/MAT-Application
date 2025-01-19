import styles from '../../Styles/authStyles.module.css';
import logo from '../../Images/scopeLogo.png';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pattern from '../../Images/decorativePattern.png';

const SuccessPasswordChanged = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Redirect to login page after 5 seconds
    setTimeout(() => {
      navigate("/login");
    }, 6000);

    // Clear the interval when the component unmounts
    return () => clearInterval(countdownTimer);
  }, [navigate]);

  return (
    

    <div className={styles['auth-container']}>
    <div className={styles['auth-container-item']}>

    <div className={styles['logo']}>
      <img src={logo} alt="Scope Logo" />
    </div>

    
    <h1 className={styles['title']}>MAT Assessment Capture</h1>
    

    <div className={styles['auth-box']}>
    <h2 className={styles['sub-title']}>Forgot Password</h2>

    <div>
      <h3>Your password has been changed successfully!</h3>
      <h3>Going back to Login page in {countdown} seconds...</h3>
    </div>
    </div>  
    </div>
      <div className={styles['pattern']}>
          <img src={pattern} alt="My Image" />
      </div> 
    </div>
  );
};

export default SuccessPasswordChanged;