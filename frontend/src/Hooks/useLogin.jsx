import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      // Save the user data to local storage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...json,
          isAdmin: json.isAdmin,
          hasChanged: 0,
          userId: json.userId, // Include userId here
        })
      );

      // Save the userId to local storage
      localStorage.setItem("userId", json.userId);
      localStorage.setItem("token", json.token);

      // Update the auth context
      dispatch({
        type: "LOGIN",
        payload: { ...json, isAdmin: json.isAdmin, hasChanged: 0 },
      });

      // Update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
