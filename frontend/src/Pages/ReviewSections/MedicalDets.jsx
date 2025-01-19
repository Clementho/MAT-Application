import React from 'react';
import { styled, Modal, Box, Grid, Typography, Button } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { useState } from 'react';

import styles from '../../Styles/reviewStyles.module.css';

import EditButton from '../../Components/EditButton';
import SelectDropDown from "../../Components/SelectDropDown";

const visionOptions = ['Blind', 'Impaired w/correction', 'Within normal limits']; 
const hearingOptions = ['Deaf', 'Impaired w/correction', 'Within normal limits']; 

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


const MedicalDetsReview = ({ values,type }) => {
  const { setFieldTouched } = useFormikContext();
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({...values.patient.medicalInfo});

  const handleOpen = () => {
      setOpen(true);
  };

  // Reset form to its initial values when the user cancels
  const handleCancel = () => {
      values.patient.medicalInfo = initialFormData;
      setOpen(false);
  };

  const handleSave = () => {
      //Update initial edit form data to new values
      setInitialFormData({...values.patient.medicalInfo})
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
  return (
    <>
      <Box>
        <Edit type={type} />
        <p><b>Diagnoses:</b> {values.patient.medicalInfo.diagnosis}</p>
        <p><b>Other Medical Concerns:</b> {values.patient.medicalInfo.otherMedicalConcerns}</p>
        <p><b>Past Surgery:</b> {values.patient.medicalInfo.pastSurgery}</p>
        <p><b>Future Surgery:</b> {values.patient.medicalInfo.futureSurgery}</p>
        <p><b>Other Interventions:</b> {values.patient.medicalInfo.otherInterventions}</p>
        <p><b>Orthotics:</b> {values.patient.medicalInfo.orthotics}</p>
        <p><b>Vision:</b> {values.patient.medicalInfo.vision}</p>
        <p><b>Hearing:</b> {values.patient.medicalInfo.hearing}</p>
      </Box>
      <Modal open={open}>
        <Grid container id={styles['modal-main-grid']}>

          <Grid item xs={12} id={styles['modal-header-grid']}>
          <Typography id={styles['modal-header-title']}>
              Edit: Medical Info
          </Typography>

          <Box>
              <Button onClick={handleCancel} variant='outlined' id={styles['modal-header-cancelBtn']}>Cancel</Button>
              <Button onClick={handleSave} variant='contained' id={styles['modal-header-confirmBtn']}>Confirm</Button>
          </Box>
          </Grid>

          <Grid container xs={12} id={styles['modal-edit-grid-listStyle']}>
            <StyledBox>
              Diagnosis:
              <Field type="text" name="patient.medicalInfo.diagnosis" />
            </StyledBox>
            <StyledBox>
              Other Medical Concerns:
              <Field type="text" name="patient.medicalInfo.otherMedicalConcerns" />
            </StyledBox>
            <StyledBox>
              Past Surgery:
              <Field type="text" name="patient.medicalInfo.pastSurgery" />
            </StyledBox>
            <StyledBox>
              Future Surgery:
              <Field type="text" name="patient.medicalInfo.futureSurgery" />
            </StyledBox>
            <StyledBox>
              Other Interventions:
              <Field type="text" name="patient.medicalInfo.otherInterventions" />
            </StyledBox>
            <StyledBox>
              Orthotics:
              <Field type="text" name="patient.medicalInfo.orthotics" />
            </StyledBox>
            <StyledBox>
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
            <StyledBox>
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

        </Grid>
      </Modal>
    </>
  );
};

export default MedicalDetsReview;