import { useEffect, useState } from "react";

export const useGetBookings = (hasUpdated) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("api/admin/getBookings", { headers });
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setGetError("An error occurred while fetching bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [hasUpdated]);

  return { bookings, isLoading, getError };
};

export const useBookingById = (therapistId) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);

  useEffect(() => {
    const fetchBookingById = async () => {
      try {
        const response = await fetch(`/api/user/bookings/${therapistId}`, {
          headers,
        });
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        // console.log("Fetched booking data:", data); // Log fetched data
        setBooking(data);
      } catch (error) {
        console.error(`Error fetching booking by ID (${therapistId}):`, error);
        setGetError("An error occurred while fetching the booking.");
      } finally {
        setIsLoading(false);
      }
    };

    if (therapistId) {
      fetchBookingById();
    } else {
      // Reset state if no therapistId is provided
      setBooking(null);
      setIsLoading(false);
      setGetError(null);
    }
  }, [therapistId]);

  // console.log("Booking data:", booking); // Log booking data
  // console.log("isLoading:", isLoading); // Log isLoading
  // console.log("getError:", getError); // Log getError

  return { booking, isLoading, getError };
};

export const useFormStartedUpdate = () => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateFormStarted = async (bookingId, formStarted) => {
    try {
      const response = await fetch(
        `/api/admin/updateFormStarted/${bookingId}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify({ formStarted }),
        }
      );

      if (!response.ok) {
        throw new Error("Update request failed");
      }

      setUpdateSuccess(true);
      setUpdateError(null);
    } catch (error) {
      console.error("Error updating formStarted:", error);
      setUpdateSuccess(false);
      setUpdateError("An error occurred while updating formStarted.");
    }
  };

  return { updateFormStarted, updateSuccess, updateError };
};

export const useIsCompleteUpdate = () => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateIsComplete = async (bookingId, isComplete) => {
    try {
      const response = await fetch(`/api/admin/updateIsComplete/${bookingId}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ isComplete }),
      });

      if (!response.ok) {
        throw new Error("Update request failed");
      }

      setUpdateSuccess(true);
      setUpdateError(null);
    } catch (error) {
      console.error("Error updating isComplete:", error);
      setUpdateSuccess(false);
      setUpdateError("An error occurred while updating isComplete.");
    }
  };

  return { updateIsComplete, updateSuccess, updateError };
};
