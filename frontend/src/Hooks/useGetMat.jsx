import { useEffect, useState } from "react";

export const useGetAllMat = (hasUpdated) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const [matRecords, setMatRecord] = useState([]);
  const [matsIsLoading, setIsLoading] = useState(true);
  const [getMatError, setGetError] = useState(null);

  useEffect(() => {
    const fetchMat = async () => {
      try {
        const response = await fetch("api/mat/matGetAll", { headers });
        const matRecord = await response.json();
        setMatRecord(matRecord);
      } catch (error) {
        console.error("Error fetching Mat Records:", error);
        setGetError("An error occurred while fetching Mat records.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMat();
  }, [hasUpdated]);

  return { matRecords, matsIsLoading, getMatError };
};

export const useGetMatByID = () => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const [matRecord, setMatRecord] = useState({});
  const [matIsLoading, setIsLoading] = useState(true);
  const [getMatPageError, setGetError] = useState(null);

  const fetchMat = async (id) => {
    if (id !== "") {
      try {
        const response = await fetch(`/api/mat/matRetrieve/${id}`, { headers });
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const matRecord = await response.json();
        
        //Format the date of birth to a format recognisable by the date input field
        matRecord.patient.personalInfo.dob = matRecord.patient.personalInfo.dob.split("T")[0]

        setMatRecord(matRecord);
      } catch (error) {
        console.error("Error fetching Mat Records:", error);
        setGetError("An error occurred while fetching Mat records.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { matRecord, matIsLoading, getMatPageError, fetchMat };
};

export const useGetAllDeletedMats = (hasUpdated) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const [deletedMatRecords, setDeletedMatRecords] = useState([]);
  const [deletedMatsIsLoading, setDeletedMatsIsLoading] = useState(true);
  const [getDeletedMatsError, setGetDeletedMatsError] = useState(null);

  useEffect(() => {
    const fetchDeletedMats = async () => {
      try {
        const response = await fetch("api/mat/deletedMatsGetAll", { headers });
        const deletedMatRecords = await response.json();
        setDeletedMatRecords(deletedMatRecords);
        console.log("Fetched DELETED MAT RECORDs",deletedMatRecords);
      } catch (error) {
        console.error("Error fetching Deleted Mat Records:", error);
        setGetDeletedMatsError(
          "An error occurred while fetching deleted Mat records."
        );
      } finally {
        setDeletedMatsIsLoading(false);
      }
    };

    fetchDeletedMats();
  }, [hasUpdated]);

  return { deletedMatRecords, deletedMatsIsLoading, getDeletedMatsError };
};
export const useGetDeletedMatById = (matID, hasUpdated) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const [deletedMatRecord, setDeletedMatRecord] = useState({});
  const [deletedMatIsLoading, setDeletedMatIsLoading] = useState(true);
  const [getDeletedMatError, setGetDeletedMatError] = useState(null);

  const fetchDeletedMat = async (id) => {
    if (id !== "") {
      try {
        const response = await fetch(`/api/mat/deletedMatGetById/${id}`, {
          headers,
        });
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const deletedMatRecord = await response.json();
        
        //Format the date of birth to a format recognisable by the date input field
        deletedMatRecord.patient.personalInfo.dob = deletedMatRecord.patient.personalInfo.dob.split("T")[0]

        setDeletedMatRecord(deletedMatRecord);
        console.log("Fetched DELETED MAT RECORD",deletedMatRecord);

      } catch (error) {
        console.error("Error fetching Deleted Mat Record:", error);
        setGetDeletedMatError(
          "An error occurred while fetching deleted Mat record."
        );
      } finally {
        setDeletedMatIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (matID) {
      fetchDeletedMat(matID);
    }
  }, [matID, hasUpdated]);

  return {
    deletedMatRecord,
    deletedMatIsLoading,
    getDeletedMatError,
    fetchDeletedMat,
  };
};