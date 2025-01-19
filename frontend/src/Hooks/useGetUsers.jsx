import { useEffect, useState } from "react";

export const useGetUsers = () => {
  const [therapists, setTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await fetch("/api/admin/getUsers", { headers });
        const data = await response.json();

        setTherapists(data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
        setGetError("An error occurred while fetching therapists.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  return { therapists, isLoading, getError };
};
