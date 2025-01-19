import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  styled,
  IconButton,
  Typography,
  Box,
  Divider,
  Grid,
  Modal,
  Button,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";
import * as Yup from "yup";
import { useGetUsers } from "../../Hooks/useGetUsers";
import { useUpdateBooking } from "../../Hooks/useUpdateBooking";
import styles from "../../Styles/reviewStyles.module.css";
import SnackBar from "../../Components/SnackBar";
import EditIcon from "@mui/icons-material/Edit";

const StyledBox = styled(Box)(() => ({
  width: "90%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  margin: "20px auto",
  fontSize: "1.3rem",
  fontWeight: "bold",
}));

const StyledTextField = styled(TextField)({
  width: "60%",
  margin: "0 3vw 0 auto",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
  },
  "& .MuiInputBase-input": {
    color: "#000000",
    backgroundColor: "#F0EFEF",
    borderRadius: "10px",
    maxHeight: "15px",
    fontSize: "1.2rem",
  },
  "& .Mui-readOnly": {
    backgroundColor: "#B1ACAC",
  },
  "& .Mui-error > input": {
    border: "2px solid red",
  },
  "& .MuiFormHelperText-root": {
    color: "red",
    fontSize: "1rem",
    fontWeight: "600",
  },
  label: {
    fontSize: "1.1rem",
    color: "#939292",
  },
});

export const UpdateBooking = ({ booking }) => {
  const { therapists, isLoading: isTherapistsLoading } = useGetUsers();
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    updateError,
    updateSuccess,
    setUpdateError,
    setUpdateSuccess,
    updateBooking,
  } = useUpdateBooking();

  const currentDate = new Date().toISOString().split("T")[0];
  const [locationInputType, setLocationInputType] = useState("dropdown");
  
  function formatDateForInput(dateString) {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  }

  function formatIsoDateToNormalDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  }

  function formatDateToISODate(inputDate) {
    const parsedDate = new Date(inputDate);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function twelveHourFormatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const amPm = hour >= 12 ? "PM" : "AM";
    const twelveHourFormat =
      ((hour % 12) || 12) + ":" + (minute < 10 ? "0" : "") + minute + " " + amPm;
    return twelveHourFormat;
  }

  const genders = ["Male", "Female"];
  const bookingId = booking._id;

  const initialValues = booking
    ? {
        patientFirstName: booking.patientFirstName,
        patientLastName: booking.patientLastName,
        patientGender: booking.patientGender,
        patientDOB: formatDateToISODate(booking.patientDOB),
        therapist: booking.therapist,
        juniorTherapist: booking.juniorTherapist,
        date: formatDateForInput(booking.date),
        time: booking.time,
        location: booking.location,
      }
    : {
        patientFirstName: "",
        patientLastName: "",
        patientGender: "",
        patientDOB: "",
        therapist: "",
        juniorTherapist: "",
        date: "",
        time: "",
        location: "",
      };

  const validationSchema = Yup.object().shape({
    patientFirstName: Yup.string().required("Client's first name is required"),
    patientLastName: Yup.string().required("Client's last name is required"),
    patientGender: Yup.string().required("Client's gender is required"),
    patientDOB: Yup.date()
      .max(currentDate, "Invalid client date of birth")
      .required("Client's date of birth is required"),
    therapist: Yup.string().required("Therapist is required"),
    juniorTherapist: Yup.string(),
    date: Yup.date().required("Date is required"),
    time: Yup.string().required("Time is required"),
    location: Yup.string().required("Location is required"),
  });

  const labelStyle = {
    fontWeight: "bold",
    fontSize: "1.1rem",
    width: "calc(40% - 60px)",
  };

  const fieldContainerStyle2 = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "1.1rem",
  };

  const handleCancel = (resetForm) => {
    setOpen(false);
    resetForm();
  };

  const handleClickEdit = () => {
    setOpen(true);
  };
  const locations = ["Clinic", "Community Centre", "Home"];
  const handleSubmit = async (values) => {
    const formattedDate = formatIsoDateToNormalDate(values.date);
    const therapistValue = values.therapist;
    const juniorTherapistValue = values.juniorTherapist;
    const dateValue = formattedDate;
    const timeValue = values.time;
    const patientFirstNameValue = values.patientFirstName;
    const patientLastNameValue = values.patientLastName;
    const patientGenderValue = values.patientGender;
    const patientDOBValue = values.patientDOB;

    const locationValue = values.location;

    const updatedData = {
      therapist: therapistValue,
      juniorTherapist: juniorTherapistValue,
      date: dateValue,
      time: timeValue,
      location: locationValue,
      patientFirstName: patientFirstNameValue,
      patientLastName: patientLastNameValue,
      patientGender: patientGenderValue,
      patientDOB: patientDOBValue,
    };
    try {
      await updateBooking(bookingId, updatedData);
      setSubmitSuccess(true);
      setUpdateSuccess(true);
      setOpen(false);
    } catch (error) {
      console.error("Error updating booking:", error);
      setUpdateError(error.response.data.error);
      setSubmitError(error.response.data.error);
    }
  };

  return (
    <Box width="95%" margin="30px auto" bgcolor="#FFFFFF" borderRadius="10px">
      <Grid
        item
        xs={12}
        sx={{
          bgcolor: "#CCD2D3",
          padding: "5px 0",
          borderRadius: "10px 10px 0px 0px",
          textAlign: "center",
        }}
      >
        <Typography fontSize="2rem" fontWeight="bold" color="#1D4D93">
          Update Booking
        </Typography>
      </Grid>

      <Grid item xs={12} padding=" 2% 5%" bgcolor="#F5F5F5" position="relative">
        <h2 style={{ marginBottom: "5px", fontWeight: 750 }}>
          Appointment Details
        </h2>

        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "10%",
            right: "5%",
          }}
        >
          <IconButton
            onClick={handleClickEdit}
            sx={{
              bgcolor: "#38A6DE",
              color: "#FFFFFF",
              borderRadius: "15px",
              columnGap: "5px",
              padding: "10px 15px",
              "&:hover": {
                bgcolor: "#1C4D91",
              },
            }}
          >
            <EditIcon />
            <Typography fontWeight="bold">Edit</Typography>
          </IconButton>
        </div>

        {isTherapistsLoading ? (
          <CircularProgress sx={{ position: "absolute", left: "50%" }} />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              getFieldProps,
              resetForm,
              handleBlur,
            }) => (
              <Box>
                <p style={fieldContainerStyle2}>
                  <b style={labelStyle}>Therapist:</b>{" "}
                  {therapists
                    .filter((therapist) => therapist._id === values.therapist)
                    .map((therapist) => (
                      <span key={therapist._id}>
                        {therapist.firstName} {therapist.lastName}
                      </span>
                    ))}
                </p>

                <p style={fieldContainerStyle2}>
                  <b style={labelStyle}>Additional Therapist:</b>{" "}
                  {values.juniorTherapist}
                </p>

                <p style={fieldContainerStyle2}>
                  <b style={labelStyle}>Date:</b>{" "}
                  {formatIsoDateToNormalDate(values.date)}
                </p>
                <p style={fieldContainerStyle2}>
                  <b style={labelStyle}>Time:</b>{" "}
                  <span inputFieldStyle3>{twelveHourFormatTime(values.time)}</span>
                </p>
                <p style={fieldContainerStyle2}>
                  <b style={labelStyle}>Location:</b> {values.location}
                </p>

                <Divider
                  sx={{
                    "&.MuiDivider-root": {
                      backgroundColor: "#B1ACAC",
                      borderTop: "1px",
                      width: "100%",
                      marginTop: "20px",
                    },
                  }}
                />
                <h2
                  style={{
                    marginBottom: "5px",

                    fontWeight: 750,
                  }}
                >
                  Client Details
                </h2>
                <p style={fieldContainerStyle2}>
                  <b style={labelStyle}>First Name:</b>{" "}
                  {values.patientFirstName}
                </p>
                <p style={fieldContainerStyle2}>
                  <b style={labelStyle}>Last Name:</b> {values.patientLastName}
                </p>
                <p style={fieldContainerStyle2}>
                  <b style={labelStyle}>Gender:</b> {values.patientGender}
                </p>
                <p style={fieldContainerStyle2}>
                  <b style={labelStyle}>Date of Birth:</b> {formatIsoDateToNormalDate(values.patientDOB)}
                </p>

                <Modal open={open}>
                  <Grid container id={styles["modal-main-grid"]}>
                    <Grid item xs={12} id={styles["modal-header-grid"]}>
                      <Typography id={styles["modal-header-title"]}>
                        Update Booking Details
                      </Typography>
                      <Form>
                        <Box>
                          <Button
                            onClick={() => handleCancel(resetForm)}
                            variant="outlined"
                            id={styles["modal-header-cancelBtn"]}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            id={styles["modal-header-confirmBtn"]}
                          >
                            Confirm
                          </Button>
                        </Box>
                      </Form>
                    </Grid>

                    <Grid xs={12} id={styles["modal-edit-grid-listStyle"]}>
                      <StyledBox>
                        <Typography
                          sx={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                          }}
                        >
                          Appointment Details
                        </Typography>
                      </StyledBox>

                      <StyledBox>
                        Therapist:
                        <StyledTextField
                          select
                          name="therapist"
                          label="Select Therapist"
                          {...getFieldProps("therapist")}
                          error={touched.therapist && Boolean(errors.therapist)}
                          helperText={touched.therapist && errors.therapist}
                        >
                          <MenuItem value="">Select Therapist</MenuItem>
                          {therapists.map((therapist) => (
                            <MenuItem key={therapist._id} value={therapist._id}>
                              {therapist.firstName} {therapist.lastName}
                            </MenuItem>
                          ))}
                        </StyledTextField>
                      </StyledBox>

                      <StyledBox>
                        Additional Therapist:
                        <StyledTextField
                          id="juniorTherapist"
                          name="juniorTherapist"
                          placeholder="Enter Additional Therapist"
                          variant="outlined"
                          {...getFieldProps("juniorTherapist")}
                          error={
                            touched.juniorTherapist &&
                            Boolean(errors.juniorTherapist)
                          }
                          helperText={
                            touched.juniorTherapist && errors.juniorTherapist
                          }
                        />
                      </StyledBox>

                      <StyledBox>
                        Date:
                        <StyledTextField
                          id="date"
                          name="date"
                          placeholder="Select Date"
                          variant="outlined"
                          type="date"
                          {...getFieldProps("date")}
                          error={touched.date && Boolean(errors.date)}
                          helperText={touched.date && errors.date}
                        />
                      </StyledBox>

                      <StyledBox>
                        Time:
                        <StyledTextField
                          id="time"
                          name="time"
                          placeholder="Select Time"
                          variant="outlined"
                          type="time"
                          {...getFieldProps("time")}
                          error={touched.time && Boolean(errors.time)}
                          helperText={touched.time && errors.time}
                        />
                      </StyledBox>

                      <StyledBox>
                        Location:
                        {locationInputType === "dropdown" ? (
                          <StyledTextField
                            select
                            id="location"
                            name="location"
                            variant="outlined"
                            label="Select Location"
                            {...getFieldProps("location")}
                            onBlur={handleBlur}
                            error={touched.location && Boolean(errors.location)}
                            helperText={touched.location && errors.location}
                          >
                            <MenuItem value={booking.location}>
                              {booking.location}
                            </MenuItem>
                            {locations.map((location) => (
                              <MenuItem key={location} value={location}>
                                {location}
                              </MenuItem>
                            ))}
                            <MenuItem
                              value="Other"
                              onClick={() => setLocationInputType("text")}
                            >
                              Other
                            </MenuItem>
                          </StyledTextField>
                        ) : (
                          <StyledTextField
                            id="location"
                            name="location"
                            placeholder="Enter Location"
                            variant="outlined"
                            type="text"
                            {...getFieldProps("location")}
                            onBlur={handleBlur}
                            error={touched.location && Boolean(errors.location)}
                            helperText={touched.location && errors.location}
                          />
                        )}
                      </StyledBox>

                      <Divider
                        sx={{
                          "&.MuiDivider-root": {
                            backgroundColor: "#B1ACAC",
                            borderTop: "1px",
                            width: "100%",
                            marginTop: "20px",
                          },
                        }}
                      />

                      <StyledBox>
                        <Typography
                          sx={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                          }}
                        >
                          Client Details
                        </Typography>
                      </StyledBox>

                      <StyledBox>
                        First Name:
                        <StyledTextField
                          id="patientFirstName"
                          name="patientFirstName"
                          placeholder="Enter First Name"
                          variant="outlined"
                          type="text"
                          {...getFieldProps("patientFirstName")}
                          error={
                            touched.patientFirstName &&
                            Boolean(errors.patientFirstName)
                          }
                          helperText={
                            touched.patientFirstName && errors.patientFirstName
                          }
                        />
                      </StyledBox>

                      <StyledBox>
                        Last Name:
                        <StyledTextField
                          id="patientLastName"
                          name="patientLastName"
                          placeholder="Enter Last Name"
                          variant="outlined"
                          type="text"
                          {...getFieldProps("patientLastName")}
                          error={
                            touched.patientLastName &&
                            Boolean(errors.patientLastName)
                          }
                          helperText={
                            touched.patientLastName && errors.patientLastName
                          }
                        />
                      </StyledBox>

                      <StyledBox>
                        Gender:
                        <StyledTextField
                          select
                          id="patientGender"
                          name="patientGender"
                          variant="outlined"
                          label="Select Gender"
                          {...getFieldProps("patientGender")}
                          error={
                            touched.patientGender &&
                            Boolean(errors.patientGender)
                          }
                          helperText={
                            touched.patientGender && errors.patientGender
                          }
                        >
                          <MenuItem value="">Select Gender</MenuItem>
                          {genders.map((gender) => (
                            <MenuItem key={gender} value={gender}>
                              {gender}
                            </MenuItem>
                          ))}
                        </StyledTextField>
                      </StyledBox>

                      <StyledBox>
                        Date of Birth:
                        <StyledTextField
                          id="patientDOB"
                          name="patientDOB"
                          placeholder="Enter Date of Birth"
                          variant="outlined"
                          type="date"
                          
                          {...getFieldProps("patientDOB")}
                          error={
                            touched.patientDOB && Boolean(errors.patientDOB)
                          }
                          helperText={touched.patientDOB && errors.patientDOB}
                        />
                      </StyledBox>
                    </Grid>
                  </Grid>
                </Modal>
              </Box>
            )}
          </Formik>
        )}
      </Grid>
      <SnackBar
        message={updateSuccess ? "Booking updated successfully!" : ""}
        severity="success"
      />
      <SnackBar message={updateError} severity="error" />
    </Box>
  );
};

export default UpdateBooking;
