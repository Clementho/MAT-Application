import { useState } from "react";
import { useLogin } from "../../Hooks/useLogin";
import styles from "../../Styles/authStyles.module.css";
import logo from "../../Images/scopeLogo.png";
import pattern from "../../Images/decorativePattern.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["auth-container-item"]}>
        <div className={styles["logo"]}>
          <img src={logo} alt="Scope Logo" />
        </div>

        <h1 className={styles["title"]}>MAT Assessment Capture</h1>

        <div className={styles["auth-box"]}>
          <h2 className={styles["sub-title"]}>User Login</h2>

          <form className={styles["auth-form"]} onSubmit={handleSubmit}>
            <div className={styles["auth-form-row"]}>
              <label className={styles["auth-form-label"]}>Username:</label>
              <input
                className={styles["auth-form-input"]}
                type="text"
                placeholder="Your Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className={styles["auth-form-row"]}>
              <label className={styles["auth-form-label"]}>Password:</label>
              <input
                className={styles["auth-form-input"]}
                type="password"
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className={styles["link-container-1"]}>
              <a href="/forgotpassword">Forgot Password</a>
            </div>

            <div className={styles["button-container"]}>
              <button className={styles["button"]} disabled={isLoading}>
                Login
              </button>
            </div>

            {error && <div className={styles["error"]}>{error}</div>}
          </form>
        </div>
      </div>
      <div className={styles["pattern"]}>
        <img src={pattern} alt="footer-decoration" />
      </div>
    </div>
  );
};

export default Login;
