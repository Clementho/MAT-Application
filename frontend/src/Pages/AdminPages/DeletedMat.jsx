import React from "react";
import { useState } from "react";
// Import custom hooks and react hooks
import {
  useGetAllDeletedMats,
  useGetDeletedMatById,
} from "../../Hooks/useGetMat"; // Updated import
import { useDownloadMat } from "../../Hooks/useDownloadMat";
import { Formik } from "formik";
import { Link } from "react-router-dom";

// Import external pages and data in our project
import Review from "../MatPages/Review";

// Import external components
import CustomDataGrid from "../../Components/CustomDataGrid";

// Import libraries components
import axios from "axios";
import {
  GridActionsCellItem,
} from "@mui/x-data-grid";
import {
  Box,
  Grid,
  Snackbar,
  IconButton,
  Modal,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
  CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from '@mui/icons-material/Visibility';
import RestoreIcon from '@mui/icons-material/Restore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import MuiAlert from "@mui/material/Alert";

const DeletedMat = () => {
  const [hasUpdated, setHasUpdated] = useState(0);
  const [matID, setMatID] = useState("");
  const [patientName, setPatientName] = useState();
  const [openSnack, setOpenSnack] = useState(false);
  const [openDownloadSnack, setOpenDownloadSnack] = useState(false);
  const [openMat, setOpenMat] = useState(false);
  const [openSuccessDeleteSnack, setOpenSuccessDeleteSnack] = useState(false);
  const [openFailDeleteSnack, setOpenFailDeleteSnack] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteMatRecords, setDeleteMatRecords] = useState([]);
  const { deletedMatRecords, deletedMatsIsLoading, getDeletedMatsError } =
    useGetAllDeletedMats(hasUpdated);
  const {
    deletedMatRecord,
    deletedMatIsLoading,
    getDeletedMatPageError,
    fetchDeletedMat,
  } = useGetDeletedMatById(matID, hasUpdated);
  const { downloadMat, getError } = useDownloadMat();
  const [type, setType] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const handleCloseDownloadSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDownloadSnack(false);
  };

  const handleCloseDeleteSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailDeleteSnack(false);
    setOpenSuccessDeleteSnack(false);
  };

  const ReturnCorrectForm = ({ type }) => {
    if (type === "view") {
      return (
        <Formik>
          <Review values={deletedMatRecord} type="view" />
        </Formik>
      );
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleRestoreClick = async (matId) => {
    try {
      await axios.post(`/api/mat/restoreDeletedMat/${matId}`);
      console.log("MAT Restored");

      setHasUpdated(hasUpdated + 1);
      setOpenSnack(true);
    } catch (error) {
      console.error("Error Restoring MAT: ", error);
      handleCloseSnack();
    }
  };

  const handleDownloadClick = (matId) => {
    setOpenDownloadSnack(true);
    downloadMat("archivedMatDownload",matId);
  };

  const handleViewClick = (matId) => {
    setType("view");
    setOpenMat(true);
    setMatID(matId);
    fetchDeletedMat(matId);
  };

  const handleDeleteClick = async (matId, patient) => {
    setMatID(matId);
    setPatientName(patient);
    setOpenDeleteModal(true);
  };
  const handleDeleteConfirm = async () => {
    closeDeleteModal();
    try {
      await axios.delete(`/api/mat/matDelete/${matID}`);
      console.log("MAT Deleted");

      setDeleteMatRecords((prevRecords) =>
        prevRecords.filter((record) => record._id !== matID)
      );

      setOpenSuccessDeleteSnack(true);
      setHasUpdated(hasUpdated + 1);
    } catch (error) {
      console.error("Error Deleting MAT: ", error);
      setOpenFailDeleteSnack(true);
    }
  };

  const closeMat = () => {
    setOpenMat(false);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  function RestoreAction(matId) {
    return (
      <Tooltip title="Restore Archived MAT Record">
        <GridActionsCellItem
          onClick={() => handleRestoreClick(matId)}
          icon={<RestoreIcon />}
          label="Restore Archived MAT Record"
          style={{ color: "#ED8221" }}
        />
      </Tooltip>
    );
  }

  function DownloadAction(matId) {
    return (
      <Tooltip title="Download PDF">
        <GridActionsCellItem
          onClick={() => handleDownloadClick(matId)}
          icon={<FileDownloadIcon />}
          label="Download PDF"
          style={{ color: "#A6C933" }}
        />
      </Tooltip>
    );
  }

  function ViewAction(matId) {
    return (
      <Tooltip title="View Archived MAT Record">
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={() => handleViewClick(matId)}
          label="View Archived MAT Record"
          style= {{ color: "#38A6DE" }}
        />
      </Tooltip>
    );
  }

  function DeleteAction(matId, patient) {
    return (
      <Tooltip title="Delete Archived MAT Record">
        <GridActionsCellItem
          onClick={() => handleDeleteClick(matId, patient)}
          icon={<DeleteForeverIcon />}
          style={{ color: "#CC0202" }}
          label="Delete Archived MAT Record"
        />
      </Tooltip>
    );
  }

  const rows = deletedMatRecords.map((record) => ({
    id: record._id,
    patient:
      record.patient.personalInfo?.firstName +
      " " +
      record.patient.personalInfo?.lastName,
    lastMod: formatIsoDateToNormalDate(record.updatedAt),
    createdAt: formatIsoDateToNormalDate(record.createdAt),
    therapist:
      record.therapistID?.firstName + " " + record.therapistID?.lastName,
    therapistID: record.therapistID?.username,
  }));

  deletedMatRecords.map((record) => {
    console.log("Retrieved currentSeating.comments", record.currentSeating.comments)
    console.log("Retrieved supine.comments", record.supine.comments)
    console.log("Retrieved sitting.comments", record.sitting.comments)
  })
  

  function formatIsoDateToNormalDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  }

  const columns = [
    { 
      field: "patient", 
      headerName: "Patient", 
      editable: false, 
      flex: 0.2 
    },
    {
      field: "lastMod",
      headerName: "Last Modified",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      editable: false,
      flex: 0.15,
    },
    {
      field: "createdAt",
      headerName: "Created date",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      editable: false,
      flex: 0.15,
    },
    {
      field: "therapist",
      headerName: "Therapist",
      editable: false,
      flex: 0.3,
    },

    {
      field: "actions",
      type: "actions",
      flex: 0.2,
      getActions: (params) => [
        RestoreAction(params.row.id),
        DownloadAction(params.row.id),
        ViewAction(params.row.id),
        DeleteAction(params.row.id, params.row.patient),
      ],
    },
  ];

  return (
    <>
      <Grid item xs={10}>
        <Box
          width="90%"
          margin="30px auto"
          padding="20px"
          bgcolor="#FFFFFF"
          borderRadius="10px"
        >
          
          {openMat ? (
            deletedMatIsLoading ? (
              <CircularProgress
                sx={{ position: "absolute", left: "50%", top: "30%" }}
              />
            ) : (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    padding: "1% 2% 1% 1.5%",
                    bgcolor: "#ED8221",
                    "&:hover": {
                      bgcolor: "#f09441",
                    }
                  }}
                  onClick={closeMat}
                >
                  <ArrowCircleLeftRoundedIcon
                    style={{
                      color: "white",
                      width: "30px",
                      height: "30px",
                      marginRight: "10px",
                    }}
                  />
                  <Typography fontSize="1.1rem" fontWeight="bold" textAlign="center">
                    Back to Archived MAT Dashboard
                  </Typography>
                </Button>
                <ReturnCorrectForm type={type} />
              </Grid>
            )
          ) : (
            <>
            <Button
              variant="contained"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: "10px",
                padding: "1% 2% 1% 1.5%",
                marginBottom: "10px",
                bgcolor: "#ED8221",
                "&:hover": {
                  bgcolor: "#f09441",
                }
              }}
              component={Link}
              to="/mat"
            >
              <ArrowCircleLeftRoundedIcon
                style={{
                  color: "white",
                  width: "30px",
                  height: "30px",
                  marginRight: "10px",
                }}
              />
              <Typography fontSize="1.1rem" fontWeight="bold" textAlign="center">
                Back to MAT Dashboard
              </Typography>
            </Button>
            <CustomDataGrid 
              rows={rows}
              columns={columns}
              isLoading={deletedMatsIsLoading}
            />
            </>
          )}  
        </Box>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleCloseSnack}
          action={action}
        >
          <MuiAlert
            onClose={handleCloseSnack}
            elevation={6}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            Archived Record Successfully Restored
          </MuiAlert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openDownloadSnack}
          autoHideDuration={3000}
          onClose={handleCloseDownloadSnack}
          action={action}
        >
          <MuiAlert
            onClose={handleCloseDownloadSnack}
            elevation={6}
            variant="filled"
            severity="info"
            sx={{ width: "100%" }}
          >
            Your Mat PDF is being downloaded...
          </MuiAlert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openFailDeleteSnack}
          autoHideDuration={3000}
          onClose={handleCloseDeleteSnack}
          action={action}
        >
          <MuiAlert
            onClose={handleCloseDeleteSnack}
            elevation={6}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            Archived Record Failed to Delete
          </MuiAlert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSuccessDeleteSnack}
          autoHideDuration={3000}
          onClose={handleCloseDeleteSnack}
          action={action}
        >
          <MuiAlert
            onClose={handleCloseDeleteSnack}
            elevation={6}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            Archived Record Successfully Deleted
          </MuiAlert>
        </Snackbar>
      </Grid>

      <Modal
        open={openDeleteModal}
        onClose={closeDeleteModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            textAlign: "center",
            bgcolor: "background.paper",
            border: "2px solid #1D4D93",
            borderRadius: "15px",
            boxShadow: 24,
            padding: "50px 40px",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.2em",
              fontWeight: "bold",
            }}
          >
            DELETE WARNING
          </Typography>
          <Typography
            sx={{
              fontSize: "1em",
            }}
          >
            Are you sure you want to permanently delete {patientName}'s MAT Record?
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: "30px",
            }}
          >
            <Button
              onClick={closeDeleteModal}
              variant="outlined"
              sx={{
                fontWeight: "700",
                fontSize: "1em",
                borderRadius: "15px",
                padding: "10px 50px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              sx={{
                fontWeight: "700",
                fontSize: "1em",
                bgcolor: "#CC0202",
                color: "#FFFFFF",
                borderRadius: "15px",
                padding: "10px 50px",
                "&:hover": {
                  bgcolor: "#990202",
                },
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeletedMat;