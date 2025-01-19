import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useGetProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);
  const { state } = useAuthContext();

  useEffect(() => {
    const fetchProfile = async () => {
      const { token, username } = JSON.parse(localStorage.getItem("user"));

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      try {
        const response = await fetch(`/api/user/profile/${username}`, {
          headers,
        });

        if (!response.ok) {
          const json = await response.json();
          setGetError(json.error);
        } else {
          const json = await response.json();
          setProfileData(json);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setGetError("An error occurred while fetching the profile.");
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, [state]);

  return { profileData, isLoading, getError };
};
