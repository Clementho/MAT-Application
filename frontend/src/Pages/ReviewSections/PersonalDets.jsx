import React from 'react';
import { styled, Modal, Box, Grid, Typography, Button } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { useState } from 'react';

import styles from '../../Styles/reviewStyles.module.css';

import EditButton from '../../Components/EditButton';
import SelectDropDown from "../../Components/SelectDropDown";

const genderOptions = ['Male', 'Female']; 

const StyledBox = styled(Box)(({error}) => ({
  width: "90%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  margin: "20px auto",
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

const PersonalDetsReview = ({values,type}) => {
  const { setFieldTouched } = useFormikContext();
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({...values.patient.personalInfo});

  const handleOpen = () => {
      setOpen(true);
  };

  // Reset form to its initial values when the user cancels
  const handleCancel = () => {
      values.patient.personalInfo = initialFormData;
      setOpen(false);
  };

  const handleSave = () => {
      //Update initial edit form data to new values
      setInitialFormData({...values.patient.personalInfo})
      setOpen(false);
  };
  function Edit({type}){
    if(type!=="view"){
      return <EditButton setOpen={handleOpen} />
    }
    else{
      return <></>
    }
  }

  function formatDateDisplay(isoDate) {
    const date = new Date(isoDate);
    const options = {day: "numeric", month: "long", year: "numeric"}
    const formattedDate = date.toLocaleDateString('en-ZA', options)

    return formattedDate;
  }

  return (
    <>
      <Box>
        <Edit type={type}/>
        <p><b>First Name:</b> {values.patient.personalInfo.firstName}</p>
        <p><b>Last Name:</b> {values.patient.personalInfo.lastName}</p>
        <p><b>Gender:</b> {values.patient.personalInfo.gender}</p>
        <p><b>Date of Birth:</b> {formatDateDisplay(values.patient.personalInfo.dob)}</p>
      </Box>
      <Modal open={open}>
        <Grid container id={styles['modal-main-grid']}>

          <Grid item xs={12} id={styles['modal-header-grid']}>
          <Typography id={styles['modal-header-title']}>
              Edit: Personal Info
          </Typography>

          <Box>
              <Button onClick={handleCancel} variant='outlined' id={styles['modal-header-cancelBtn']}>Cancel</Button>
              <Button onClick={handleSave} variant='contained' id={styles['modal-header-confirmBtn']}>Confirm</Button>
          </Box>
          </Grid>

          <Grid container xs={12} id={styles['modal-edit-grid-listStyle']}>
            <StyledBox>
              First Name:
              <Field type="text" name="patient.personalInfo.firstName" />
            </StyledBox>

            <StyledBox>
              Last Name:
              <Field type="text" name="patient.personalInfo.lastName" />
            </StyledBox>

            <StyledBox>
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
            </StyledBox>

            <StyledBox>
              Date of Birth:
              <Field type="date" name="patient.personalInfo.dob" />
            </StyledBox>
          </Grid>

        </Grid>
      </Modal>
    </>
  );
};

export default PersonalDetsReview;