import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Modal,
  Grid,
  Box,
  IconButton,
  Typography,
  styled,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Tooltip,

} from "@mui/material";
import { useGetBookings } from "../../Hooks/useGetBookings";
import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { UpdateBooking } from "../../Pages/AdminPages/UpdateBooking";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const StyledTableCellHead = styled(TableCell)({
  whiteSpace: "nowrap",
  fontWeight: "bold",
  fontSize: "1.2rem",
  lineHeight: "2rem",
});

const StyledTableCellBody = styled(TableCell)({
  fontSize: "1.1rem",
});

function AdminHome() {
  const { bookings, isLoading, getError } = useGetBookings();
  const [expandedRows, setExpandedRows] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const [openMat, setOpenMat] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [deleteBookingId, setDeleteBookingId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [pageSched, setPageSched] = useState(0);
  const [rowsPerPageSched, setRowsPerPageSched] = useState(5);

  const [pagePrev, setPagePrev] = useState(0);
  const [rowsPerPagePrev, setRowsPerPagePrev] = useState(5);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };


  //Actions for Scheduled Assessments Table Pagination
  function TablePaginationActionsSched(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    //Decrement Page upon back button click
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
    //Increment Page upon next button click
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActionsSched.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    pageSched: PropTypes.number.isRequired,
    rowsPerPageSched: PropTypes.number.isRequired,
  };

  //Actions for Previous Assessments Table Pagination
  function TablePaginationActionsPrev(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    //Decrement Page upon back button click
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
    //Increment Page upon next button click
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActionsPrev.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    pagePrev: PropTypes.number.isRequired,
    rowsPerPagePrev: PropTypes.number.isRequired,
  };

  //Update Scheduled Assessments Table to new page #
  const handleChangePageSched = (event, newPage) => {
    setPageSched(newPage);
  };

  //Update Scheduled Assessments Table to new rows per page # and return to first page
  const handleChangeRowsPerPageSched = (event) => {
    setRowsPerPageSched(parseInt(event.target.value, 10));
    setPageSched(0);
  };

  //Update Previous Assessments Table to new page #
  const handleChangePagePrev = (event, newPage) => {
    setPagePrev(newPage);
  };

  //Update Previous Assessments Table to new rows per page # and return to first page
  const handleChangeRowsPerPagePrev = (event) => {
    setRowsPerPagePrev(parseInt(event.target.value, 10));
    setPagePrev(0);
  };


  const handleDeleteClick = (id) => {
    setDeleteBookingId(id);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteBookingId) {
        const response = await fetch(
          `/api/admin/deleteBooking/${deleteBookingId}`,
          {
            method: "DELETE",
            headers: headers,
          }
        );

        if (response.status === 200) {
          console.log("Booking deleted successfully");
          window.location.reload();
        }
      }

      setOpenDeleteModal(false);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const [showMorePrevious, setShowMorePrevious] = useState(false);

  const scheduledAssessments = bookings.filter(
    (booking) => !booking.isComplete
  );
  const previousAssessments = bookings.filter((booking) => booking.isComplete);

  useEffect(() => {
    if (selectedBooking !== null) {
      setOpenMat(true);
    }
  }, [selectedBooking]);

  const openUpdateModal = (encodedData) => {
    const decodedData = JSON.parse(decodeURIComponent(encodedData));
    setSelectedBooking(decodedData);
    setOpenMat(true);
  };

  const navigate = useNavigate();
  const closeUpdateModal = () => {
    navigate("/AdminHome");
    setOpenMat(false);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  if (isLoading) {
    return (
      <CircularProgress
        sx={{ position: "absolute", left: "50%", top: "30%" }}
      />
    );
  }

  if (getError) {
    return <div>Error: {getError}</div>;
  }

  return (
    <Grid item xs={10}>
      <Box
        width="90%"
        margin="30px auto"
        padding="40px"
        bgcolor="#FFFFFF"
        borderRadius="10px"
      >
        {openMat ? (
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
                },
              }}
              onClick={closeUpdateModal}
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
                Back to MAT Dashboard
              </Typography>
            </Button>
            {selectedBooking !== null && (
              <UpdateBooking
                booking={selectedBooking}
                onClose={closeUpdateModal}
              />
            )}
          </Grid>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ width: "90%", marginBottom: "20px" }}>
              <Grid item sx={{ mt: "20px" }} xs={12}>
                <Typography
                  fontSize="1.8rem"
                  fontWeight="bold"
                  margin="10px 0 20px 0"
                >
                  Scheduled Assessments
                </Typography>
              </Grid>
              <Grid container>
                <TableContainer component={Paper} style={{ width: "100%" }}>
                  <Table>
                    <TableHead>
                      <TableRow style={{ background: "#D9D9D9" }}>
                        <StyledTableCellHead>Client Name</StyledTableCellHead>
                        <StyledTableCellHead>Date</StyledTableCellHead>
                        <StyledTableCellHead>Time</StyledTableCellHead>
                        <StyledTableCellHead>Location</StyledTableCellHead>
                        <StyledTableCellHead>Therapist</StyledTableCellHead>
                        <StyledTableCellHead></StyledTableCellHead>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {scheduledAssessments
                        .slice(0, showMore ? scheduledAssessments.length : 1)
                        .map((booking) => (
                          <Fragment key={booking._id}>
                            <TableRow
                              style={{
                                background: "#F5F5F5",
                                lineHeight: "1.5rem",
                              }}
                            >
                              <StyledTableCellBody>
                                {booking.patientFirstName}{" "}
                                {booking.patientLastName}
                              </StyledTableCellBody>
                              <StyledTableCellBody>
                                {booking.date}
                              </StyledTableCellBody>
                              <StyledTableCellBody>
                                {booking.time}
                              </StyledTableCellBody>
                              <StyledTableCellBody>
                                {booking.location}
                              </StyledTableCellBody>
                              <StyledTableCellBody>
                                {booking.therapist?.firstName}{" "}
                                {booking.therapist?.lastName}
                              </StyledTableCellBody>

                              <StyledTableCellBody>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Tooltip title="Delete">
                                    <IconButton
                                      onClick={() =>
                                        handleDeleteClick(booking._id)
                                      }
                                    >
                                      <DeleteIcon
                                        style={{
                                          color: "red",
                                          fontSize: "30px",
                                        }}
                                      />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Edit">
                                    <IconButton
                                      onClick={() => {
                                        const encodedData = encodeURIComponent(
                                          JSON.stringify({
                                            ...booking,
                                            therapist:
                                              booking.therapist._id || {},
                                          })
                                        );
                                        openUpdateModal(encodedData);
                                      }}
                                    >
                                      <EditIcon
                                        style={{
                                          color: "#F08106",
                                          fontSize: "30px",
                                        }}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                              </StyledTableCellBody>
                            </TableRow>
                            {expandedRows.includes(booking._id) && (
                              <TableRow
                                style={{
                                  background: "lightblue",
                                  lineHeight: "1.5rem",
                                }}
                              >
                                <TableCell colSpan={5}>
                                  <div>
                                    <strong>Therapist ID:</strong>{" "}
                                    {booking.therapist?._id}
                                  </div>
                                  <div>
                                    <strong>Client Last Name:</strong>{" "}
                                    {booking.patientLastName}
                                  </div>
                                  <div>
                                    <strong>Date:</strong> {booking.date}
                                  </div>
                                  <div>
                                    <strong>Time:</strong> {booking.time}
                                  </div>
                                  <div>
                                    <strong>Complete Status:</strong>{" "}
                                    {booking.isComplete
                                      ? "Complete"
                                      : "Incomplete"}
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </Fragment>
                        ))}
                    </TableBody>

                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[2, 5, 10, { label: 'All', value: -1 }]}
                          colSpan={3}
                          count={scheduledAssessments.length}
                          rowsPerPage={rowsPerPageSched}
                          page={pageSched}
                          SelectProps={{
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePageSched}
                          onRowsPerPageChange={handleChangeRowsPerPageSched}
                          ActionsComponent={TablePaginationActionsSched}
                        />
                      </TableRow>
                    </TableFooter>

                  </Table>
                </TableContainer>
              </Grid>
            </div>
            <div style={{ width: "90%", marginBottom: "20px" }}>
              <Grid item sx={{ mt: "20px" }} xs={12}>
                <Typography
                  fontSize="1.8rem"
                  fontWeight="bold"
                  margin="10px 0 20px 0"
                >
                  Previous Assessments
                </Typography>
              </Grid>
              <Grid container>
                <TableContainer component={Paper} style={{ width: "100%" }}>
                  <Table>
                    <TableHead>
                      <TableRow style={{ background: "#D9D9D9" }}>
                        <StyledTableCellHead>Client Name</StyledTableCellHead>
                        <StyledTableCellHead>Date</StyledTableCellHead>
                        <StyledTableCellHead>Time</StyledTableCellHead>
                        <StyledTableCellHead>Therapist</StyledTableCellHead>
                        <StyledTableCellHead></StyledTableCellHead>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {previousAssessments
                        .slice(
                          0,
                          showMorePrevious ? previousAssessments.length : 1
                        )
                        .map((booking) => (
                          <Fragment key={booking._id}>
                            <TableRow
                              style={{
                                background: "#F5F5F5",
                                lineHeight: "1.5rem",
                              }}
                            >
                              <StyledTableCellBody>
                                {booking.patientFirstName}{" "}
                                {booking.patientLastName}
                              </StyledTableCellBody>
                              <StyledTableCellBody>
                                {booking.date}
                              </StyledTableCellBody>
                              <StyledTableCellBody>
                                {booking.time}
                              </StyledTableCellBody>
                              <StyledTableCellBody>
                                {booking.therapist?.firstName}{" "}
                                {booking.therapist?.lastName}
                              </StyledTableCellBody>
                              <StyledTableCellBody>
                                <Tooltip title="Delete">
                                  <IconButton
                                    onClick={() =>
                                      handleDeleteClick(booking._id)
                                    }
                                  >
                                    <DeleteIcon
                                      style={{
                                        color: "red",
                                        fontSize: "30px",
                                        paddingRight: isSmallScreen
                                          ? "3px"
                                          : "5px",
                                      }}
                                    />
                                  </IconButton>
                                </Tooltip>
                              </StyledTableCellBody>
                            </TableRow>
                            {expandedRows.includes(booking._id) && (
                              <TableRow
                                style={{
                                  background: "#D9D9D9",
                                  lineHeight: "1rem",
                                }}
                              >
                                <StyledTableCellBody colSpan={5}>
                                  <div>
                                    <strong>Therapist ID:</strong>{" "}
                                    {booking.therapist?._id}
                                  </div>
                                  <div>
                                    <strong>Client Last Name:</strong>{" "}
                                    {booking.patientLastName}
                                  </div>
                                  <div>
                                    <strong>Date:</strong> {booking.date}
                                  </div>
                                  <div>
                                    <strong>Time:</strong> {booking.time}
                                  </div>
                                  <div>
                                    <strong>Complete Status:</strong>{" "}
                                    {booking.isComplete
                                      ? "Complete"
                                      : "Incomplete"}
                                  </div>
                                </StyledTableCellBody>
                              </TableRow>
                            )}
                          </Fragment>
                        ))}
                    </TableBody>

                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[2, 5, 10, { label: 'All', value: -1 }]}
                          colSpan={3}
                          count={previousAssessments.length}
                          rowsPerPage={rowsPerPagePrev}
                          page={pagePrev}
                          SelectProps={{
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePagePrev}
                          onRowsPerPageChange={handleChangeRowsPerPagePrev}
                          ActionsComponent={TablePaginationActionsPrev}
                        />
                      </TableRow>
                    </TableFooter>
                    
                  </Table>
                </TableContainer>
              </Grid>
            </div>
          </div>
        )}
      </Box>

      {/* Modal */}
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
            WARNING
          </Typography>
          <Typography
            sx={{
              fontSize: "1em",
            }}
          >
            Are you sure you want to delete this booking?
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
              onClick={handleConfirmDelete}
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
    </Grid>
  );
}

export default AdminHome;