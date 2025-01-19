import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useBookingById,
  useFormStartedUpdate,
} from "../../Hooks/useGetBookings";

import { useAuthContext } from "../../Hooks/useAuthContext";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Grid,
  Typography,
  styled,
  CircularProgress
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";


const StyledTableCellHead = styled(TableCell)({
  whiteSpace: "nowrap",
  fontWeight: "bold",
  fontSize: "1.2rem",
  lineHeight: "2rem",
});

const StyledTableCellBody = styled(TableCell)({
  fontSize: "1.1rem",
});

const Home = ({ setInMat }) => {
  //Hooks 
  setInMat(false);
  const { user } = useAuthContext();
  const [showMore, setShowMore] = useState(false);
  const [visibleRowCount, setVisibleRowCount] = useState(2);
  const { booking, isLoading, getError } = useBookingById(user.userId);
  const { updateFormStarted, updateSuccess, updateError } =
    useFormStartedUpdate();

  if (isLoading) {
    return <CircularProgress sx={{position:"absolute",left:"55%",top:"50%"}}/>
  }

  if (getError) {
    return <p>Error: {getError}</p>;
  }

  //helper functions
  const filteredBookings = (booking || []).filter(
    (bookingItem) => !bookingItem.isComplete
  );

  const handleUpdateFormStarted = async (bookingId) => {
    try {
      const response = await updateFormStarted(bookingId, true);
    } catch (error) {}
  };


  const renderBookingDetails = () => {

    //helper components
    if (filteredBookings.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5}>
            <Typography
              align="center"
              fontWeight="bold"
              fontSize="1.3rem"
              fontStyle="italic"
              color="#a8a3a3"
            >
              No bookings yet
            </Typography>
          </TableCell>
        </TableRow>
      );
    }

    return filteredBookings.slice(0, visibleRowCount).map((bookingItem) => (
      <TableRow
        key={bookingItem._id}
        style={{
          background: "#F5F5F5",
          lineHeight: "1.5rem",
        }}
      >
        <StyledTableCellBody>
          {bookingItem.patientFirstName} {bookingItem.patientLastName}
        </StyledTableCellBody>
        <StyledTableCellBody>{bookingItem.date}</StyledTableCellBody>
        <StyledTableCellBody>{bookingItem.time}</StyledTableCellBody>
        <StyledTableCellBody>
          {bookingItem.therapist?.firstName} {bookingItem.therapist?.lastName}
        </StyledTableCellBody>
        <StyledTableCellBody>
          <div style={{ marginLeft: "10px" }}>
            <Link
              to={`/form/${bookingItem._id}`}
              style={{ textDecoration: "none" }}
            >
              {localStorage.getItem(`${bookingItem._id}_formValues`) ? (
                <IconButton
                  sx={{
                    bgcolor: "#ED8221",
                    borderRadius: "20px",
                    width: "60%",
                    display: "flex",
                    alignItems: "center",
                    color: "#FFFFFF",
                    "&:hover": {
                      bgcolor: "#ed9647",
                    },
                  }}
                >
                  <PlayCircleRoundedIcon sx={{ marginRight: "5px" }} />
                  <Typography>Continue</Typography>
                </IconButton>
              ) : bookingItem.formStarted ? (
                <IconButton
                  sx={{
                    bgcolor: "#ED8221",
                    borderRadius: "20px",
                    width: "60%",
                    display: "flex",
                    alignItems: "center",
                    color: "#FFFFFF",
                    "&:hover": {
                      bgcolor: "#ed9647",
                    },
                  }}
                >
                  <PlayCircleRoundedIcon sx={{ marginRight: "5px" }} />
                  <Typography>Continue</Typography>
                </IconButton>
              ) : (
                <IconButton
                  sx={{
                    bgcolor: "#B1D235",
                    borderRadius: "20px",
                    width: "60%",
                    display: "flex",
                    alignItems: "center",
                    color: "#FFFFFF",
                    "&:hover": {
                      bgcolor: "#bbdb44",
                    },
                  }}
                  onClick={() => handleUpdateFormStarted(bookingItem._id)}
                >
                  <PlayCircleRoundedIcon sx={{ marginRight: "5px" }} />

                  <Typography>Start MAT</Typography>
                </IconButton>
              )}
            </Link>
          </div>
        </StyledTableCellBody>
      </TableRow>
    ));
  };

  //this component main body
  return (
    <Grid item xs={10}>
      <Box
        width="90%"
        margin="30px auto"
        padding="40px"
        bgcolor="#FFFFFF"
        borderRadius="10px"
      >
        <Grid item xs={12}>
          <Typography
            fontSize="1.8rem"
            fontWeight="bold"
            margin="10px 0 20px 0"
          >
            Upcoming Assessments
          </Typography>
        </Grid>

        {booking && booking.length === 0 ? (
          <Typography
            align="center"
            fontWeight="bold"
            fontSize="1.3rem"
            fontStyle="italic"
            color="#a8a3a3"
          >
            No bookings yet
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ background: "#D9D9D9" }}>
                  <StyledTableCellHead>Client</StyledTableCellHead>
                  <StyledTableCellHead>Date</StyledTableCellHead>
                  <StyledTableCellHead>Time</StyledTableCellHead>
                  <StyledTableCellHead>Therapist</StyledTableCellHead>
                  <StyledTableCellHead />
                </TableRow>
              </TableHead>
              <TableBody>{renderBookingDetails()}</TableBody>
            </Table>
          </TableContainer>
        )}

        {booking && booking.length > 0 && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={() => {
                setShowMore(!showMore);
                setVisibleRowCount(showMore ? 5 : (booking || []).length);
              }}
              color="primary"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "15px" }}>
                  {showMore ? "Less" : "More"}
                </span>
                <ExpandMoreIcon
                  style={{
                    transform: showMore ? "rotate(180deg)" : "rotate(0deg)",
                    marginLeft: "4px",
                  }}
                />
              </div>
            </IconButton>
          </div>
        )}
      </Box>
    </Grid>
  );
};

export default Home;