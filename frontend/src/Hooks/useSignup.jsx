import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { token } = JSON.parse(localStorage.getItem("user"));

  // const navigate = useNavigate();

  const signup = async (
    username,
    password,
    firstName,
    lastName,
    email,
    phoneNumber,
    isAdmin
  ) => {
    setIsLoading(true);
    setError(null);

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    const response = await fetch("/api/user/signUp", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        username,
        password,
        firstName,
        lastName,
        email,
        phoneNumber,
        isAdmin,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      // Perform login after successful signup

      // Set the user as logged in (unnecessary code because login function already called dispatch)
      // dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);

      // Redirect to the homepage
      //navigate("/");
    }
  };

  return { signup, isLoading, error };
};
