import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { dispatch } = useAuthContext();

  const { username } = JSON.parse(localStorage.getItem("user"));

  const updateUserProfile = async (updatedProfileData, oldProfileData) => {
    setIsUpdating(true);
    setUpdateError(null);
    const { token, username } = JSON.parse(localStorage.getItem("user"));

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    const response = await fetch(`/api/user/profile/${username}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(updatedProfileData),
    });

    const json = await response.json();

    const checkUpdate =
      updatedProfileData.username != oldProfileData.username ||
      updatedProfileData.firstName != oldProfileData.firstName ||
      updatedProfileData.lastName != oldProfileData.lastName ||
      updatedProfileData.phoneNumber != oldProfileData.phoneNumber ||
      updatedProfileData.email != oldProfileData.email;

    if (!response.ok) {
      setUpdateError(json.error);
    } else if (checkUpdate) {
      const user = JSON.parse(localStorage.getItem("user"));
      user.username = updatedProfileData.username;
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: "UPDATE", payload: updatedProfileData.username });
    }

    if (response.ok) setUpdateSuccess(true);

    setIsUpdating(false);
  };

  return {
    isUpdating,
    updateError,
    updateSuccess,
    setUpdateError,
    setUpdateSuccess,
    updateUserProfile,
  };
};
