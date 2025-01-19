import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const { login } = useLogin();
  const navigate = useNavigate();

  const forgotPassword = async (email) => {

    console.log("useForgotPassword.jsx Page...")
    setIsLoading(true);
    setError(null);
    
    const response = await fetch("/api/user/svrForgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      // Redirect to the homepage
      navigate("/SuccessEmailSent", { state: {email} });
      
    }
  };

  return { forgotPassword, isLoading, error };
};