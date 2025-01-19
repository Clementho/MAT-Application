import { useGetProfile } from '../../Hooks/useGetProfile';
import { useUpdateProfile } from '../../Hooks/useUpdateProfile';
import { useState } from 'react';
import { InputLabel, TextField, styled, Box, Grid, Typography, Button } from '@mui/material';

import SnackBar from '../../Components/SnackBar';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "20px 0"
})

const StyledInputLabel = styled(InputLabel)({
  color: "black",
  fontWeight: "bold",
  fontSize: "1.2rem",
})


const StyledTextField = styled(TextField)({
  width: "60%",
  margin: "0 3vw 0 auto",
  "& .MuiOutlinedInput-root": { //Styles the outlined input component
    borderRadius: "10px",
  },
  "& .MuiInputBase-input": { //Styles the base input component
    color: "#000000",
    backgroundColor: "#F0EFEF",
    borderRadius: "10px",
    maxHeight: "15px",
    fontSize: "1.2rem",
  },
  "& .Mui-readOnly": {
    backgroundColor: "#D1CDCD",
  }
})


const Profile = ({setInMat}) => {
  setInMat(false)
  const { profileData, isLoading, getError } = useGetProfile();
  const { isUpdating, updateError, updateSuccess, setUpdateError, setUpdateSuccess, updateUserProfile } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
 
 
  const handleEditClick = (e) => {
    e.preventDefault();

    setIsEditing(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    setUsername(profileData.username);
    setFirstName(profileData.firstName);
    setLastName(profileData.lastName);
    setPhoneNumber(profileData.phoneNumber);
    setEmail(profileData.email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData={
      username,
      firstName,
      lastName,
      phoneNumber,
      email
    }

    await updateUserProfile(updatedData,profileData);
    setIsEditing(false);
  };


  return (
    <Grid item xs={10}>
      <Box width="90%" margin="30px auto" bgcolor="#FFFFFF" borderRadius="10px">
        <Grid item xs={12}
          sx={{
            bgcolor: "#CCD2D3", 
            padding:"5px 0",
            borderRadius: "10px 10px 0px 0px",
            textAlign:"center"
        }}>
          <Typography fontSize="2.5rem" fontWeight="bold" color="#1D4D93">User Profile</Typography>
        </Grid>

        <Grid item xs={12} padding="30px 0 0 30px">
          <Typography fontSize="1.7rem" fontWeight="bold">Personal Details</Typography>
        </Grid>

        <Grid item xs={12} padding="20px 30px" marginTop="0" borderRadius="0px 0px 10px 10px"> 
          <form onSubmit={handleSubmit}>
          <Grid container xs>
            <Grid item xs={12} md={6} display="flex" flexDirection="column">
            
            <StyledBox>
              <StyledInputLabel htmlFor="username">Username:</StyledInputLabel>
              <StyledTextField
                id="username"
                placeholder="Enter username"
                variant="outlined"
                InputProps={{
                  readOnly: !isEditing
                }}
                value={isEditing ? username : (profileData?.username || '')}
                onChange={(e) => setUsername(e.target.value)}
              />
            </StyledBox>

            <StyledBox>
              <StyledInputLabel htmlFor="firstName">First Name:</StyledInputLabel>
              <StyledTextField
                id="firstName"
                placeholder="First Name"
                variant="outlined"
                InputProps={{
                  readOnly: !isEditing
                }}
                value={isEditing ? firstName : (profileData?.firstName || '')}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </StyledBox>

            <StyledBox>
              <StyledInputLabel htmlFor="lastName">Last Name:</StyledInputLabel>
              <StyledTextField
                id="lastName"
                placeholder="Last Name"
                variant="outlined"
                InputProps={{
                  readOnly: !isEditing
                }}
                value={isEditing ? lastName : (profileData?.lastName || '')}
                onChange={(e) => setLastName(e.target.value)}
              />
            </StyledBox>

            </Grid>

            <Grid item xs={12} md={6} display="flex" flexDirection="column">

            <StyledBox>
              <StyledInputLabel htmlFor="phoneNumber">Phone Number:</StyledInputLabel>
              <StyledTextField
                id="phoneNumber"
                placeholder="Phone Number"
                variant="outlined"
                pattern="^\d{10}$"
                maxLength={10}
                title="Phone number must be exactly 10 numeric digits"
                InputProps={{
                  readOnly: !isEditing
                }}
                value={isEditing ? phoneNumber : (profileData?.phoneNumber || '')}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </StyledBox>

            <StyledBox>
              <StyledInputLabel htmlFor="emailAddress">Email Address:</StyledInputLabel>
              <StyledTextField
                id="emailAddress"
                placeholder="Email Address"
                variant="outlined"
                InputProps={{
                  readOnly: !isEditing
                }}
                pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}$"
                title="Invalid email format. Use aa@exampl.com or aa@exampl.com.au"
                value={isEditing ? email : (profileData?.email || '')}
                onChange={(e) => setEmail(e.target.value)}
              />
            </StyledBox>
            </Grid>

            <Grid item xs={12} textAlign={{xs:"center", md:"right"}} marginTop="10px">
              {isEditing ? (
                <Button 
                disabled={isUpdating || isLoading}
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
                  }
                }}>
                  <SaveIcon sx={{marginRight: "5px"}}/>
                  <Typography fontSize="1.3rem" fontWeight="bold">Save Profile</Typography>
                </Button>
              ) : (
                <Button 
                  disabled={isUpdating || isLoading}
                  variant="contained"
                  onClick={handleEditClick}
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginRight: "10px",
                    borderRadius: "15px",
                    padding: "5px 20px 5px 15px",
                  }}>
                  <EditIcon sx={{marginRight: "5px"}}/>
                  <Typography fontSize="1.3rem" fontWeight="bold">Edit Profile</Typography>
                </Button>
              )}
              </Grid>
         

          </Grid>
          </form>
        </Grid>
        
        <SnackBar message={updateSuccess ? "Profile updated successfully!" : ""} severity="success"/>
        <SnackBar message={getError || updateError} severity="error"/>
                
      </Box>
    </Grid>
  );
};


export default Profile;