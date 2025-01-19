
import { useState } from "react";
import { useSignup } from "../../Hooks/useSignup";
import styles from '../../Styles/authStylesSignUp.module.css';
import logo from '../../Images/scopeLogo.png';
import pattern from '../../Images/decorativePattern.png';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { signup, signUpError, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, password, firstName, lastName, email, phoneNumber);
  };

  return (
    <div className={styles['auth-container']}>

      <div className={styles['auth-container-item']}>
        <div className={styles['logo']}>
          <img src={logo} alt="ScopeLogo" />
        </div>

        <h1 className={styles['title']}>MAT Assessment Capture</h1>

        <div className={styles['auth-box']}>
          <h2 className={styles['sub-title']}>Sign Up</h2>

          <form className={styles['auth-form']} onSubmit={handleSubmit}>
            <div className={styles['auth-form-row']}>
              <label className={styles['auth-form-label']}>First Name:</label>
              <input
                className={styles['auth-form-input']}
                type="text"
                placeholder="Your first name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>

            <div className={styles['auth-form-row']}>
              <label className={styles['auth-form-label']}>Last Name:</label>
              <input
                className={styles['auth-form-input']}
                type="text"
                placeholder="Your last name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>

            <div className={styles['auth-form-row']}>
              <label className={styles['auth-form-label']}>Username:</label>
              <input
                className={styles['auth-form-input']}
                type="text"
                placeholder="Your username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                pattern="^(?=.*\d)[a-zA-Z0-9_]{3,20}$"
                title="Alphanumeric username, 3-20 characters, and must include at least one digit."
              />
            </div>

            <div className={styles['auth-form-row']}>
              <label className={styles['auth-form-label']}>Email:</label>
              <input
                className={styles['auth-form-input']}
                type="email"
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}$"
                title="Invalid email format. Use aa@exampl.com or aa@exampl.com.au"
              />
            </div>

            <div className={styles['auth-form-row']}>
              <label className={styles['auth-form-label']}>Phone Number:</label>
              <input
                className={styles['auth-form-input']}
                type="text"
                placeholder="Your phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                pattern="^\d{10}$"
                maxLength={10}
                title="Phone number must be exactly 10 numeric digits"
              />
            
            </div>

            <div className={styles['auth-form-row']}>
              <label className={styles['auth-form-label']}>Password:</label>
              <input
                className={styles['auth-form-input']}
                type="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Minimum length: 8 characters, Requires at least 1 lowercase letter, Requires at least 1 uppercase letter, Requires at least 1 numeric digit, Requires at least 1 special character"
              />
            </div>

            {signUpError && <div className={styles['error']}>{signUpError}</div>}
            <div className={styles['link-container']}>
              <p>Have an account? <br /><a href="Login">Login Here</a></p>
            </div>

            <div className={styles['button-container']}>
              <button className={styles['button']} disabled={isLoading}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles['pattern']}>
        <img src={pattern} alt="My Image" />
      </div>
    </div>
  );
};


export default Signup;