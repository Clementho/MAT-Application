import { useState } from "react";

export const useDownloadMat = () => {
  const [getError, setGetError] = useState(null);
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const downloadMat = async (matType, recordID) => {
    try {
      const response = await fetch(`/api/mat/${matType}/${recordID}`, {
        headers,
      });

      console.log(response.headers)

      const filename = response.headers
        .get("Content-Disposition")
        .split("filename=")[1];

      if (!response.ok) {
        const json = await response.json();
        setGetError(json.error);
      } else {
        // Success: The response contains the PDF data
        const blob = await response.blob();

        // Create a URL for the blob data
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = url;

        link.download = filename;
        link.click();

        // Revoke the URL to release resources
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log(error.message)
      setGetError(error.message);
    }
  };

  return { downloadMat, getError };
};