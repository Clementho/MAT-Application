import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const { login } = useLogin();
  const navigate = useNavigate();

  const resetPassword = async (token) => {

  console.log(">>>>> useResetPassword.jsx Page...")
    setIsLoading(true);
    setError(null);
    
    console.log("Token Passed >>> " + token);

    const response = await fetch(`/api/user/svrResetPassword/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
      }),
    });


     const jsonData = await response.json();
    //  console.log("jsonData >>> " + jsonData);

     setIsLoading(false);

     //return jsonData.success; // Return the success value after API call completion
     return jsonData;

    
  };

  const resetPasswordSave = async (password, userId) => {

    console.log(">>>>> Reset Password Save ..." + userId);
      setIsLoading(true);
      setError(null);      
  
      const response = await fetch("/api/user/svrResetPasswordSave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          userId,
        }),
      });

      const json = await response.json();
  
      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      } else {
        // Redirect to the success page
        navigate("/SuccessPasswordChanged");
        
      }
  
      
    };

  return { resetPassword, resetPasswordSave, isLoading, error };
};
