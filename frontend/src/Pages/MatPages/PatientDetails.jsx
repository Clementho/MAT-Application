import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { styled, Box, Grid, Typography, Divider } from '@mui/material';

import SelectDropDown from "../../Components/SelectDropDown";

const genderOptions = ['Male', 'Female']; 
const visionOptions = ['Blind', 'Impaired w/correction', 'Within normal limits']; 
const hearingOptions = ['Deaf', 'Impaired w/correction', 'Within normal limits'];

const StyledBox = styled(Box)(({error}) => ({
  width: "90%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  margin: "20px 0",
  fontSize: "1.3rem",
  fontWeight: "bold",
  "& input": {
    width: "60%",
    padding: "1%",
    border: error ? "2px solid red" : "2px solid #B1ACAC",
    borderRadius: "10px",
    backgroundColor: "#F0EFEF",
    fontSize: "1.2rem",
    "&:focus": {
      backgroundColor: "#FEFCFC",
    }
  },
  "& .MuiSelect-select": {
    border: error ? "2px solid red" : "2px solid #B1ACAC",
    borderRadius: "10px",
    padding: "10px",
  }
}));

const StyledErrorMessage = styled(ErrorMessage)({
  width: "62%",
  marginTop: "6px",
  marginLeft: "auto",
  color: "red",
  fontSize: "0.8em",
  fontWeight: "600",
})

const PatientDetails = ({errors, values}) => {

  const { setFieldTouched } = useFormikContext();

    return(
      <Box width="95%" margin="30px auto" bgcolor="#FFFFFF" borderRadius="10px">
        <Grid item xs={12}
          sx={{
            bgcolor: "#CCD2D3", 
            padding:"5px 0",
            borderRadius: "10px 10px 0px 0px",
            textAlign:"center"
        }}>
          <Typography fontSize="2.5rem" fontWeight="bold" color="#1D4D93">Client Details</Typography>
        </Grid>

        <Box padding="30px">
        <Grid item xs={12}>
          <Typography fontSize="1.7rem" fontWeight="bold">Personal Info</Typography>
        </Grid>

        <Grid item xs={12}>
          <StyledBox error={errors.patient?.personalInfo?.firstName}>
            First Name:
            <Field type="text" name="patient.personalInfo.firstName" placeholder="Enter first name" />
            <StyledErrorMessage
                name="patient.personalInfo.firstName"
                component="div"
            />
          </StyledBox>

          <StyledBox error={errors.patient?.personalInfo?.lastName}>
            Last Name:
            <Field type="text" name="patient.personalInfo.lastName" placeholder="Enter last name" />
            <StyledErrorMessage
                name="patient.personalInfo.lastName"
                component="div"
            />
          </StyledBox>

          <StyledBox error={errors.patient?.personalInfo?.gender}>
            Gender:
            <Field
              name="patient.personalInfo.gender"
              render={({ field }) => (
                <SelectDropDown
                  options={genderOptions}
                  placeholder="Select Gender"
                  field={field}
                  setFieldTouched={setFieldTouched}
                />
              )}
            />
            <StyledErrorMessage 
                name="patient.personalInfo.gender"
                component="div"
            />
          </StyledBox>

          <StyledBox error={errors.patient?.personalInfo?.dob}>
            Date of Birth:
            <Field type="date" name="patient.personalInfo.dob" />
            <StyledErrorMessage 
                name="patient.personalInfo.dob"
                component="div"
            />
          </StyledBox>
        </Grid>
        
        <Divider sx={{ border: "2px solid #F0EEEE", margin: "30px 0px" }}/>

        <Grid item xs={12}>
          <Typography fontSize="1.7rem" fontWeight="bold">Medical Info</Typography>
        </Grid>


        <Grid item xs={12}>
          <StyledBox error={errors.patient?.medicalInfo?.diagnosis}>
            Diagnosis:
            <Field
              type="text"
              name="patient.medicalInfo.diagnosis"
              placeholder="Enter Diagnosis"
            />
          </StyledBox>
          <StyledBox error={errors.patient?.medicalInfo?.otherMedicalConcerns}>
            Other Medical Concerns:
            <Field
              type="text"
              name="patient.medicalInfo.otherMedicalConcerns"
              placeholder="Enter Other Medical Concerns"
            />
          </StyledBox>
          <StyledBox error={errors.patient?.medicalInfo?.pastSurgery}>
            Past Surgery:
            <Field
              type="text"
              name="patient.medicalInfo.pastSurgery"
              placeholder="Enter Past Surgery Details"
            />
          </StyledBox>
          <StyledBox error={errors.patient?.medicalInfo?.futureSurgery}>
            Future Surgery:
            <Field
              type="text"
              name="patient.medicalInfo.futureSurgery"
              placeholder="Enter Future Surgery Details"
            />
          </StyledBox>
          <StyledBox error={errors.patient?.medicalInfo?.otherInterventions}>
            Other Interventions:
            <Field
              type="text"
              name="patient.medicalInfo.otherInterventions"
              placeholder="Enter Other Interventions"
            />
          </StyledBox>
          <StyledBox error={errors.patient?.medicalInfo?.orthotics}>
            Orthotics:
            <Field
              type="text"
              name="patient.medicalInfo.orthotics"
              placeholder="Enter Orthotics Details"
            />
          </StyledBox>
          <StyledBox error={errors.patient?.medicalInfo?.vision}>
            Vision:
            <Field
              name="patient.medicalInfo.vision"
              render={({ field }) => (
                <SelectDropDown
                  options={visionOptions}
                  placeholder="Select Vision Condition"
                  field={field}
                  setFieldTouched={setFieldTouched}
                />
              )}
            />
          </StyledBox>
          <StyledBox error={errors.patient?.medicalInfo?.hearing}>
            Hearing:
            <Field
              name="patient.medicalInfo.hearing"
              render={({ field }) => (
                <SelectDropDown
                  options={hearingOptions}
                  placeholder="Select Hearing Condition"
                  field={field}
                  setFieldTouched={setFieldTouched}
                />
              )}
            />
          </StyledBox>
        </Grid>

        </Box>

      </Box>
    );
}

export default PatientDetails;
