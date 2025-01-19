import { useState, useEffect } from "react";
import { useResetPassword} from "../../Hooks/useResetPassword";
import styles from '../../Styles/authStyles.module.css';
import logo from '../../Images/scopeLogo.png';
import pattern from '../../Images/decorativePattern.png';


const ResetPassword = () => {

  const [password, setPassword] =  useState("");
  const [passwordConfirm, setPasswordConfirm] =  useState("");
  const [jsonData, setJsonData] = useState(null);
  const { resetPassword, resetPasswordSave, isLoading } = useResetPassword();
  const [error, setError] = useState("");
  const [userId, setUserID] = useState(null);
  const {isStrongPassword} = require('validator');

  useEffect(() => {
    const validateToken = async () => {
    const currentURL = window.location.href;
    const token = currentURL.split("/").pop();

      if (token) {
        try {
          const response = await resetPassword(token);
          setJsonData(response.success); // Store the jsonData in state
          setUserID(response.user.id); // Assuming 'success' contains the user data

        } catch (error) {
          setJsonData(false); // Set jsonData to false in case of error
          setUserID(null); // Clear the user data in case of error

        }
      } else {
        // Handle the case when the 'token' parameter is not present in the URL
        console.error("Token not found in the URL.");
        setJsonData(false); // Set jsonData to false if token is not found
        setUserID(null); // Clear the user data if token is not found

      }
    };

    validateToken();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password === null || password === "" || passwordConfirm === "" || passwordConfirm === null){
      throw new Error("All fields must be filled.");
    }
  
    if (password !== passwordConfirm) {
      throw new Error("Passwords do not match.");
      // return;
    }

    if (!isStrongPassword(password)) {
      throw new Error("Password not strong enough.");
      // return;
    }

    setError("");

    await resetPasswordSave(password, userId);   
  };

  // Create a wrapper function to call handleSubmit within try...catch
  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault(); 
      await handleSubmit(e);
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (

    <div className={styles['auth-container']}>
    <div className={styles['auth-container-item']}>
    <div className={styles['logo']}>
      <img src={logo} alt="Scope Logo" />
    </div>
    <h1 className={styles['title']}>MAT Assessment Capture</h1>
    <div className={styles['auth-box']}>
    <h2 className={styles['sub-title']}>Reset Password</h2>
    
      {isLoading ? (
        <div>Loading...</div>
      ) : jsonData === true ? (
        
          <form className={styles['auth-form']} onSubmit={handleFormSubmit}>
            <div className={styles['auth-form-row']}>
            <label className={styles['auth-form-label']}>new password:</label>
              <input  className={styles['auth-form-input']}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="New Password"
              />
            </div>
            <div className={styles['auth-form-row']}>
            <label className={styles['auth-form-label']}>confirm password:</label>
              <input  className={styles['auth-form-input']}
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
                placeholder="Confirm New Password"
              />
            </div>
            <div className={styles['button-container']}>
            <button className={styles['button']} disabled={isLoading}>Reset</button>
            </div>
            
          {/* <div className={styles["error"]}>{error}</div> */}
          {error && <div className={styles["error"]}>{error}</div>}
          </form>        
        
      ) : jsonData === false ? (
        <div>
          <h3>The reset password link has expired. Please request a new one</h3>
          {error && <p>Error: {error.message}</p>}
        </div>
      ) : null }
   
    </div>
    </div>
    <div className={styles['pattern']}>
        <img src={pattern} alt="My Image" />
        </div> 
    </div>
  );
} 

export default ResetPassword;