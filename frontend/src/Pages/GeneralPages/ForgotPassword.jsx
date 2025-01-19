// Signup.js
import { useState } from "react";
import { useForgotPassword} from "../../Hooks/useForgotPassword";
import styles from '../../Styles/authStyles.module.css';
import logo from '../../Images/scopeLogo.png';
import pattern from '../../Images/decorativePattern.png';

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const { forgotPassword, isLoading } = useForgotPassword();
  const [error, setError] = useState("");
  const { isEmail } = require('validator');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    
    if (!isEmail(email)) {
      throw new Error('Email address must be filled.');
    }

    // Clear any previous error
    setError("");

    // Call the forgotPassword function
    await forgotPassword( email);
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
    <h2 className={styles['sub-title']}>Forgot Password</h2>
    
       
      {isLoading ? (
          <div>Loading...</div>
        ) :
          <form className={styles['auth-form']} onSubmit={handleFormSubmit}>
            <div className={styles['auth-form-row']}>
              <label className={styles['auth-form-label']}>email:</label>
                <input 
                  className={styles['auth-form-input']}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter your email address"
                />
            </div>
            <div className={styles['link-container']}>
                <p><a href="/login">Back to Login</a></p>
            </div>
            <div className={styles['button-container']}>
              <button className={styles['button']} disabled={isLoading}>Continue</button>
            </div>
              {/* {error && <div className={styles['error-forgotpassword-email']}>{error}</div>} */}
              {error && <div className={`${styles['error']} ${styles['error-forgotpassword-email']}`}>{error}</div>}

          </form>}
          </div>
      

    </div>

    <div className={styles['pattern']}>
        <img src={pattern} alt="My Image" />
        </div> 

    </div>
   
  );
};

export default ForgotPassword;

