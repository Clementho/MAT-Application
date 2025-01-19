import React, { useState } from "react";
import { useGetBookings } from "../../Hooks/useGetBookings"; // Import the correct hook
import { Formik } from "formik";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Review from "../MatPages/Review";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { UpdateBooking } from "../../Pages/AdminPages/UpdateBooking";
import CustomDataGrid from "../../Components/CustomDataGrid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

//import libraries components
import axios from "axios";
import { GridActionsCellItem } from "@mui/x-data-grid";
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
import ArchiveIcon from "@mui/icons-material/Archive";
import InventoryIcon from "@mui/icons-material/Inventory";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import MuiAlert from "@mui/material/Alert";

const Booking = () => {
  const [hasUpdated, setHasUpdated] = useState(0);
  const [bookingID, setMatID] = useState("");
  const [patientName, setPatientName] = useState();

  const [openSnack, setOpenSnack] = useState(false);
  const [openMat, setOpenMat] = useState(false);
  const [openSuccessDeleteSnack, setOpenSuccessDeleteSnack] = useState(false);
  const [openFailDeleteSnack, setOpenFailDeleteSnack] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { token } = JSON.parse(localStorage.getItem("user"));
  const [selectedBooking, setSelectedBooking] = useState(null);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const { bookings, isLoading } = useGetBookings(hasUpdated); // Use the useGetBookings hook
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
      return <Formik>{/*<Review values={} type="view" />*/}</Formik>;
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

  const openUpdateModal = (encodedData) => {
    const decodedData = JSON.parse(decodeURIComponent(encodedData));
    setSelectedBooking(decodedData);
    setOpenMat(true);
  };

  const handleUpdateClick = (bookingId) => {
    setType("update");
    setOpenMat(true);
    console.log("Update Test");
    setMatID(bookingId);

    const selectedBooking = bookings.find(
      (booking) => booking._id === bookingId
    );

    const encodedData = encodeURIComponent(
      JSON.stringify({
        ...selectedBooking,
        therapist: selectedBooking.therapist?._id || {},
      })
    );

    openUpdateModal(encodedData);
  };

  const handleDeleteClick = async (bookingId) => {
    setMatID(bookingId);

    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    closeDeleteModal();
    try {
      const response = await fetch(`/api/admin/deleteBooking/${bookingID}`, {
        method: "DELETE",
        headers: headers,
      });
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

  function UpdateAction(matId) {
    return (
      <Tooltip title="Update Booking">
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => handleUpdateClick(matId)}
          label="Update Booking"
          style={{ color: "#38A6DE" }}
        />
      </Tooltip>
    );
  }

  function DeleteAction(bookingId) {
    return (
      <Tooltip title="Delete Booking">
        <GridActionsCellItem
          onClick={() => handleDeleteClick(bookingId)}
          icon={<DeleteForeverIcon />}
          style={{ color: "#CC0202" }}
          label="Delete Booking"
        />
      </Tooltip>
    );
  }

  const BookingButton = () => {
    return (
      <Button
        variant="contained"
        sx={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          borderRadius: "10px",
          padding: "10px 20px 10px 15px",
          textTransform: "capitalize",
          bgcolor: "#43e669",
          "&:hover": {
            bgcolor: "#5ef281",
          },
        }}
        component={Link}
        to="/createbooking"
      >
        <AddCircleIcon
          style={{
            color: "white",
            width: "30px",
            height: "30px",
            marginRight: "10px",
          }}
        />
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            textAlign: "center",
            fontFamily: "inter",
          }}
        >
          New Booking
        </Typography>
      </Button>
    );
  };

  const rows = bookings.map((booking) => ({
    id: booking._id,
    patient: `${booking.patientFirstName} ${booking.patientLastName}`,
    date: booking.date,
    location: booking.location,
    therapist: `${booking.therapist?.firstName} ${booking.therapist?.lastName}`,
    therapistID: booking.therapist?.username,
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
      headerName: "Date",
      editable: false,
      flex: 0.15,
    },
    {
      field: "location",
      headerName: "Location",
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
        UpdateAction(params.row.id),

        DeleteAction(params.row.id),
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
            isLoading ? (
              <CircularProgress
                sx={{ position: "absolute", left: "50%", top: "30%" }}
              />
            ) : (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    padding: "1% 2% 1% 1.5%",
                    bgcolor: "#ED8221",
                    "&:hover": {
                      bgcolor: "#f09441",
                    },
                  }}
                  onClick={() => {
                    setHasUpdated(hasUpdated + 1);
                    closeMat();
                  }}
                >
                  <ArrowCircleLeftRoundedIcon
                    style={{
                      color: "white",
                      width: "30px",
                      height: "30px",
                      marginRight: "10px",
                    }}
                  />
                  <Typography
                    fontSize="1.1rem"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    Back to Booking Dashboard
                  </Typography>
                </Button>

                {selectedBooking !== null && (
                  <UpdateBooking booking={selectedBooking} onClose={closeMat} />
                )}
              </Grid>
            )
          ) : (
            <CustomDataGrid
              rows={rows}
              columns={columns}
              isLoading={isLoading}
              extraButton={<BookingButton />}
            />
          )}
        </Box>

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

export default Booking;
