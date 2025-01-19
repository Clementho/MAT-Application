import { useState } from "react";

export const useUpdateBooking = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const updateBooking = async (bookingId, updatedData) => {
    console.log("useUpdateBooking" + bookingId);

    setIsUpdating(true);
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetch(
        `/api/admin/updateBooking/${bookingId}`,

        {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify(updatedData),
        }
      );
    } catch (error) {
      console.error("Error updating booking:", error);
      setUpdateSuccess(false);
      setUpdateError("An error occurred while updating booking.");
    }
  };

  return {
    isUpdating,
    updateError,
    updateSuccess,
    setUpdateError,
    setUpdateSuccess,
    updateBooking,
  };
};
