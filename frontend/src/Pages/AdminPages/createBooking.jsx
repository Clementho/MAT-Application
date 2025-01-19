import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  InputLabel,
  Typography,
  styled,
  Button,
  Divider,
  TextField,
  MenuItem,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import SnackBar from "../../Components/SnackBar";
import { useGetUsers } from "../../Hooks/useGetUsers";

const currentDate = new Date().toISOString().split("T")[0];

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

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "20px 0",
});

const StyledInputLabel = styled(InputLabel)({
  color: "black",
  fontWeight: "bold",
  fontSize: "1.2rem",
});

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
    fontSize: "1em",
    fontWeight: "600",
  },
  label: {
    fontSize: "1.1em",
    color: "#939292",
  },
});

const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  return `${hours.padStart(2, "0")}:${minutes}`;
};

const formatDate = (date) => {
  if (!date) {
    return "";
  }
  const [year, month, day] = date.split("-");
  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
};
const CreateBooking = () => {
  // Initialize Mapbox GL with your access token
  const { therapists, isLoading } = useGetUsers();
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [locationInputType, setLocationInputType] = useState("dropdown");
  const initialValues = {
    patientFirstName: "",
    patientLastName: "",
    patientGender: "",
    patientDOB: "",
    therapist: "",
    juniorTherapist: "", // Add the "juniorTherapist" field
    date: "",
    time: "",

    location: "",
  };
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Send the 'values.location' string to your backend API

      console.log(values);
      // Send the 'location' string to your backend API
      console.log(headers);
      const response = await axios.post(
        "/api/admin/createBooking",
        {
          patientFirstName: values.patientFirstName,
          patientLastName: values.patientLastName,
          patientGender: values.patientGender,
          patientDOB: values.patientDOB,
          therapistId: values.therapist,
          juniorTherapist: values.juniorTherapist, // Add the "juniorTherapist" field
          date: formatDate(values.date),
          time: formatTime(values.time),
          location: values.location,
        },
        { headers }
      );

      console.log("Booking Created:", response.data.booking);

      resetForm();
      setSubmitting(false);
      setSubmitSuccess(true);
      setSubmitError("");
    } catch (error) {
      console.error("Error creating booking:", error);

      setSubmitError(error.response.data.error);
      setSubmitting(false);
    }
  };

  const locations = ["Clinic", "Community Centre", "Home"];

  const genders = ["Male", "Female"];

  return (
    <Grid item xs={10}>
      <Box width="90%" margin="30px auto" bgcolor="#FFFFFF" borderRadius="10px">
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
          <Typography fontSize="2.5rem" fontWeight="bold" color="#1D4D93">
            Booking Form
          </Typography>
        </Grid>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, getFieldProps, handleBlur }) => (
            <Form
              style={{
                padding: "0px 30px 30px 30px",
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <Grid container xs>
                <Grid item xs={12} marginTop="30px">
                  <Typography fontSize="1.7rem" fontWeight="bold">
                    Appointment Details
                  </Typography>
                </Grid>

                <Grid item xs={12} md={7.5} display="flex" flexDirection="column">
                  <StyledBox>
                    <StyledInputLabel htmlFor="therapist">
                      Therapist:
                    </StyledInputLabel>
                    <StyledTextField
                      select
                      id="therapist"
                      name="therapist"
                      variant="outlined"
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
                    <StyledInputLabel htmlFor="juniorTherapist">
                      Additional Therapist:
                    </StyledInputLabel>
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
                    <StyledInputLabel htmlFor="date">Date:</StyledInputLabel>
                    <StyledTextField
                      id="date"
                      name="date"
                      placeholder="Select Date"
                      variant="outlined"
                      type="date"
                      inputProps={{min: new Date().toISOString().split("T")[0]}}
                      {...getFieldProps("date")}
                      error={touched.date && Boolean(errors.date)}
                      helperText={touched.date && errors.date}
                    />
                  </StyledBox>
                </Grid>

                <Grid item xs={12} md={4.5} display="flex" flexDirection="column">
                  <StyledBox>
                    <StyledInputLabel htmlFor="time">Time:</StyledInputLabel>
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
                    <StyledInputLabel htmlFor="location">
                      Location:
                    </StyledInputLabel>
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
                        <MenuItem value="">Select Location</MenuItem>
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
                </Grid>

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

                <Grid item xs={12} marginTop="30px">
                  <Typography fontSize="1.7rem" fontWeight="bold">
                    Client Details
                  </Typography>
                </Grid>

                <Grid item xs={12} display="flex" flexDirection="column">
                  <StyledBox>
                    <StyledInputLabel htmlFor="patientFirstName">
                      First Name:
                    </StyledInputLabel>
                    <StyledTextField
                      id="patientFirstName"
                      name="patientFirstName"
                      placeholder="Enter First Name"
                      variant="outlined"
                      type="text"
                      {...getFieldProps("patientFirstName")}
                      onBlur={handleBlur}
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
                    <StyledInputLabel htmlFor="patientLastName">
                      Last Name:
                    </StyledInputLabel>
                    <StyledTextField
                      id="patientLastName"
                      name="patientLastName"
                      placeholder="Enter Last Name"
                      variant="outlined"
                      type="text"
                      {...getFieldProps("patientLastName")}
                      onBlur={handleBlur}
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
                    <StyledInputLabel htmlFor="patientGender">
                      Gender:
                    </StyledInputLabel>
                    <StyledTextField
                      select
                      id="patientGender"
                      name="patientGender"
                      variant="outlined"
                      label="Select Gender"
                      {...getFieldProps("patientGender")}
                      onBlur={handleBlur}
                      error={
                        touched.patientGender && Boolean(errors.patientGender)
                      }
                      helperText={touched.patientGender && errors.patientGender}
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
                    <StyledInputLabel htmlFor="patientDOB">
                      Date of Birth:
                    </StyledInputLabel>
                    <StyledTextField
                      id="patientDOB"
                      name="patientDOB"
                      placeholder="Enter Last Name"
                      variant="outlined"
                      type="date"
                      inputProps={{max: new Date().toISOString().split("T")[0]}}
                      {...getFieldProps("patientDOB")}
                      onBlur={handleBlur}
                      error={touched.patientDOB && Boolean(errors.patientDOB)}
                      helperText={touched.patientDOB && errors.patientDOB}
                    />
                  </StyledBox>
                </Grid>

                <Grid
                  item
                  xs={12}
                  textAlign={{ xs: "center", md: "right" }}
                  marginTop="10px"
                >
                  <Button
                    disabled={isLoading}
                    variant="contained"
                    type="submit"
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      marginRight: "10px",
                      borderRadius: "15px",
                      padding: "5px 20px 5px 15px",
                      bgcolor: "#43e669",
                      "&:hover": {
                        bgcolor: "#5ef281",
                      },
                    }}
                  >
                    <AddCircleIcon sx={{ marginRight: "5px" }} />
                    <Typography fontSize="1.3rem" fontWeight="bold">
                      Create Booking
                    </Typography>
                  </Button>
                </Grid>
              </Grid>

              <SnackBar
                message={
                  isSubmitting
                    ? "Creating new booking..."
                    : submitSuccess && !submitError
                    ? "Booking created successfully!"
                    : ""
                }
                severity={isSubmitting ? "info" : "success"}
              />

              <SnackBar message={submitError} severity="error" />
            </Form>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};

export default CreateBooking;
