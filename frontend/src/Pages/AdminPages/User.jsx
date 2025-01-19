import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  InputLabel,
  styled,
} from "@mui/material";
import SnackBar from "../../Components/SnackBar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSignup } from "../../Hooks/useSignup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name required"),
  lastName: Yup.string().required("Last name required"),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email format"
    ),
  phoneNumber: Yup.string()
    .required("Phone number required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 numeric digits"),
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
});

const generateRandomUsername = () => {
  // Generate a random username that meets the validation criteria
  const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let username = "user";
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    username += allowedChars.charAt(randomIndex);
  }
  return username;
};

const generateRandomPassword = () => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const allowedChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&";

  let password = "";

  while (!password.match(passwordPattern)) {
    password = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      password += allowedChars.charAt(randomIndex);
    }
  }

  return password;
};

const User = () => {
  const { signup, signUpError, isLoading } = useSignup();
  const [showSuccessSnackBar, setShowSuccessSnackBar] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Generate username and password
        const generatedUsername = generateRandomUsername();
        const generatedPassword = generateRandomPassword();

        // Call the signup function with generated values
        await signup(
          generatedUsername,
          generatedPassword,
          values.firstName,
          values.lastName,
          values.email,
          values.phoneNumber
        );

        // Show success message
        setShowSuccessSnackBar(true);

        // Clear form values
        formik.resetForm();
      } catch (error) {}
    },
  });

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
            Create User
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          padding="20px 30px"
          marginTop="0"
          borderRadius="0px 0px 10px 10px"
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container xs>
              <Grid item xs={12} md={6} display="flex" flexDirection="column">
                <StyledBox>
                  <StyledInputLabel htmlFor="firstName">
                    First Name:
                  </StyledInputLabel>
                  <StyledTextField
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    variant="outlined"
                    {...formik.getFieldProps("firstName")}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </StyledBox>

                <StyledBox>
                  <StyledInputLabel htmlFor="lastName">
                    Last Name:
                  </StyledInputLabel>
                  <StyledTextField
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    variant="outlined"
                    {...formik.getFieldProps("lastName")}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </StyledBox>
              </Grid>

              <Grid item xs={12} md={6} display="flex" flexDirection="column">
                <StyledBox>
                  <StyledInputLabel htmlFor="phoneNumber">
                    Phone Number:
                  </StyledInputLabel>
                  <StyledTextField
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    variant="outlined"
                    pattern="^\d{10}$"
                    maxLength={10}
                    title="Phone number must be exactly 10 numeric digits"
                    {...formik.getFieldProps("phoneNumber")}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                </StyledBox>

                <StyledBox>
                  <StyledInputLabel htmlFor="email">
                    Email Address:
                  </StyledInputLabel>
                  <StyledTextField
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    variant="outlined"
                    pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}$"
                    title="Invalid email format. Use aa@exampl.com or aa@exampl.com.au"
                    {...formik.getFieldProps("email")}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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
                  <PersonAddIcon sx={{ marginRight: "5px" }} />
                  <Typography fontSize="1.3rem" fontWeight="bold">
                    Create User
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <SnackBar
          message={
            isLoading
              ? "Creating new user..."
              : showSuccessSnackBar && !signUpError
              ? "User created successfully!"
              : ""
          }
          severity={isLoading ? "info" : "success"}
        />

        <SnackBar message={signUpError} severity="error" />
      </Box>
    </Grid>
  );
};

export default User;