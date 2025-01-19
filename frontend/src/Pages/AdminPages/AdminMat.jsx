import React from "react";
import { useState } from "react";
//import custom hooks and react hooks
import { useGetAllMat, useGetMatByID } from "../../Hooks/useGetMat";
import { useDownloadMat } from "../../Hooks/useDownloadMat";
import { Formik } from "formik";
import { Link } from "react-router-dom";

//Import external pages and data in our project
import Review from "../MatPages/Review";

// Import external components
import CustomDataGrid from "../../Components/CustomDataGrid";

//import libraries components
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
  CircularProgress,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArchiveIcon from '@mui/icons-material/Archive';
import InventoryIcon from '@mui/icons-material/Inventory';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import MuiAlert from "@mui/material/Alert";

const AdminMATDash = () => {
  const [hasUpdated, setHasUpdated] = useState(0);
  const [matID, setMatID] = useState("");
  const [patientName, setPatientName] = useState();
  const { downloadMat, getError } = useDownloadMat();
  const [openSnack, setOpenSnack] = useState(false);
  const [openMat, setOpenMat] = useState(false);
  const [openSuccessDeleteSnack, setOpenSuccessDeleteSnack] = useState(false);
  const [openFailDeleteSnack, setOpenFailDeleteSnack] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const { matRecords, matsIsLoading, getMatError } = useGetAllMat(hasUpdated);
  const { matRecord, matIsLoading, getMatPageError, fetchMat } = useGetMatByID(
    matID,
    hasUpdated
  );
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
          <Review values={matRecord} type="view" />
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

  const handleDownloadClick = (matId) => {
    setOpenSnack(true);
    downloadMat("matDownload",matId);
  };
  const handleViewClick = (matId) => {
    setType("view");
    setOpenMat(true);
    setMatID(matId);
    fetchMat(matId);
  };

  const handleDeleteClick = async (matId, patient) => {
    setMatID(matId);
    setPatientName(patient);
    setOpenDeleteModal(true);
  };
  //Handle delete

  const handleDeleteConfirm = async () => {
    closeDeleteModal();
    try {
      const response = await axios.post(`/api/mat/matDeleted/${matID}`);
      console.log("MAT Deleted: ", response.data);
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
      <Tooltip title="View MAT Record">
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={() => handleViewClick(matId)}
          label="View MAT Record"
          style={{ color: "#38A6DE" }}
        />
      </Tooltip>
    );
  }

  function DeleteAction(matId, patient) {
    return (
      <Tooltip title="Archive MAT Record">
        <GridActionsCellItem
          onClick={() => handleDeleteClick(matId, patient)}
          icon={<ArchiveIcon />}
          style={{ color: "#ED8221" }}
          label="Archive MAT Record"
        />
      </Tooltip>
    );
  }

  const ArchiveButton = () => {
    return (
      <Button
        variant="contained"
        sx={{
          textTransform: "capitalize",
          fontSize: "1.2rem",
          fontWeight: "bold",
          borderRadius: "20px",
          padding: "10px 25px 10px 20px",
          bgcolor: "#ED8221",
          "&:hover": {
            bgcolor: "#f09441",
          },
          order: {xs:"1", md:"inherit"},
          marginLeft: {xs:"auto", md:"inherit"},
        }}
        component={Link}
        to="/deletedmat"
      >
        <InventoryIcon
          style={{
            color: "white",
            width: "30px",
            height: "30px",
            marginRight: "10px",
          }}
        />
        <Typography sx={{
          fontSize: "1.1rem",
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: "inter",
        }}>
          Archive
        </Typography>
      </Button>
    )
  }
  
  const rows = matRecords.map((record) => ({
    id: record._id,
    patient:
      record.patient.personalInfo?.firstName +
      " " +
      record.patient.personalInfo?.lastName,
    date: record.updatedAt,
    createdAt: record.createdAt,
    therapist:
      record.therapistID?.firstName + " " + record.therapistID?.lastName,
    therapistID: record.therapistID?.username,
  }));

  const columns = [
    { 
      field: "patient",
      headerName: "Client", 
      editable: false, 
      flex: 0.2,
    },
    {
      field: "date",
      headerName: "Last Modified",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      valueFormatter: ({ value }) => {
        if (value) {
          const date = new Date(value);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }
        return "";
      },
      editable: false,
      flex: 0.15,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      valueFormatter: ({ value }) => {
        if (value) {
          const date = new Date(value);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }
        return "";
      },
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
        ViewAction(params.row.id),
        DownloadAction(params.row.id),
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
            matIsLoading ? (
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
                    Back to MAT Dashboard
                  </Typography>
                </Button>
                <ReturnCorrectForm type={type} />
              </Grid>
            )
          ) : (
            <CustomDataGrid 
              rows={rows}
              columns={columns}
              isLoading={matsIsLoading}
              extraButton={<ArchiveButton />}
            />
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
            Record Failed to Archive
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
            Record Archived Successfully
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
            Archive Confirmation
          </Typography>
          <Typography
            sx={{
              fontSize: "1em",
            }}
          >
            Are you sure you want to archive {patientName}'s MAT Record?
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

export default AdminMATDash;
