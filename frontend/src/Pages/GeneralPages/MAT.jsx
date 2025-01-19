import React from "react";
import { useState, useEffect } from "react";
//import custom hooks and react hooks
import { useGetAllMat, useGetMatByID } from "../../Hooks/useGetMat";
import { useDownloadMat } from "../../Hooks/useDownloadMat";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { Form, Formik, useFormikContext } from "formik";

//Import external pages and data in our project
import Review from "../MatPages/Review";
import validationSchema from "../../FormikUtils/validationSchema";

// Import external components
import CustomDataGrid from "../../Components/CustomDataGrid";
import SnackBar from "../../Components/SnackBar";
import ErrorModal from "../../Components/ErrorModal";

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
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress, 
  Tooltip,
  Typography,
  Modal
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import EditIcon from '@mui/icons-material/Edit';


const MATDash = () => {
  const [hasUpdated,setHasUpdated]=useState(0);
  const [matID, setMatID] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [openMat, setOpenMat] = useState(false);
  const [type, setType] = useState("");
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState("");
  const [isSubmitted,setIsSubmitted]=useState("false");
  const [showErrorModal,setShowErrorModal]=useState(false)
  const [enableUpdate, setEnableUpdate]=useState(true);
  const [errorCopy, setErrorCopy]=useState({});

  const { downloadMat, getError } = useDownloadMat();
  const { user } = useAuthContext();
  const { matRecords, matsIsLoading, getMatError } = useGetAllMat(hasUpdated);
  const { matRecord, matIsLoading, getMatPageError,fetchMat } = useGetMatByID();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));

  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleViewClick = (matId) => {
    setType("view");
    setOpenMat(true);
    setMatID(matId);
    fetchMat(matId);
  };
  
  const handleEditClick = (matId) => {
    setIsSubmitted(false)
    setType("update");
    setOpenMat(true);
    setMatID(matId);
    fetchMat(matId);
  };

  const handleFormUpdate = async (values, { setSubmitting }) => {
    try {
      const response = await axios.patch(`/api/mat/matUpdate/${matID}`, values, {headers});
      console.log("MAT Updated:", response.data);

      setSubmitting(false);
      setIsSubmitted(true)
      // Show the success Snackbar 
      setShowSuccessSnackbar(true);
      setHasUpdated(hasUpdated+1);
    } catch (error) {
    
      // Validation error occurred, set the error message
      setErrorSnackbar("Updated Failed.");

      console.error("Error updated MAT:", error);
      setSubmitting(false);
    }
  };

  const ReturnCorrectForm = ({ type }) => {
    if (type === "view") {
      return (
        <Formik>
          <Review values={matRecord} type="view" />
        </Formik>
      );
    } else {
      return (
        <Formik
          initialValues={matRecord}
          onSubmit={handleFormUpdate}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting, values, errors, handleSubmit, validateForm }) => (
            <Form
              onChange={() => {
                console.log(errors)
                console.log(values.patient.personalInfo)
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                if(Object.entries(errors).length > 0) {
                  setErrorCopy(errors);
                  setShowErrorModal(true);
                }
              }}
            >
                <Review values={values} type="update" />



                <ErrorModal 
                  values={values}
                  errors={errorCopy}
                  showErrorModal={showErrorModal}
                  setShowErrorModal={setShowErrorModal}
                  validateForm={validateForm}
                />

                <SnackBar
                  message={isSubmitting ? "Updating MAT Assessment..." : ""}
                  severity="info"
                />

                <SnackBar
                  message={
                    isSubmitted
                    ?
                      showSuccessSnackbar
                      ? "MAT Assessment updated successfully!": errorSnackbar
                    :""  
                  }
                  severity={
                    showSuccessSnackbar
                      ? "success"
                      : errorSnackbar
                      ? "error"
                      : "success"
                  }
                />

                <SnackBar
                  message={isValid ? "" : "Missing or Invalid Form Values"}
                  severity="error"
                />

                 <Button
                  type="submit"
                  variant="contained"
                  disabled={ isSubmitting || !enableUpdate }
                  sx={{
                    bgcolor: "#A6C933",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    letterSpacing: "2px",
                    borderRadius: "15px",
                    padding: "5px 40px",
                    position: "absoluted",
                    bottom: "15px",
                    left:lg?"80%": isSmallScreen ? "73%" : "85%",
                    "&:hover": {
                      bgcolor: "#59db25",
                    },
                  }}
                >
                  Update
                </Button>  
            </Form>
          )}
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


  const closeMat = () => {
    setOpenMat(false);
  };

  function DownloadAction(matId) {
    return (
      <Tooltip title="Download PDF">
        <GridActionsCellItem
          onClick={() => handleDownloadClick(matId)}
          icon={<FileDownloadIcon />}
          label="Download PDF"
          style={{ color: "#A6C933"}}
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
          style={{ color: "#38A6DE"}}
        />
      </Tooltip>
    );
  }

  function EditAction(therapistId, matId) {
    if (therapistId == user.username) {
      return (
        <Tooltip title="Edit MAT Record">
          <GridActionsCellItem
            onClick={() => handleEditClick(matId)}
            icon={<EditIcon />}
            label="Edit MAT Record"
            style={{ color: "#ED8221"}}
          />
        </Tooltip>
      );
    } else return <></>;
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
        EditAction(params.row.therapistID, params.row.id),
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
            <CircularProgress sx={{position:"absolute",left:"50%",top:"30%"}}/>
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
          ) :(
            <CustomDataGrid 
              rows={rows}
              columns={columns}
              isLoading={matsIsLoading}
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
      </Grid>
    </>
  );
};

export default MATDash;