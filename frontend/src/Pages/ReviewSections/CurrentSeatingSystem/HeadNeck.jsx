import React from 'react';
import { styled, Modal, Box, Grid, Typography, Button } from '@mui/material';
import { Field } from 'formik';
import { useState } from 'react';

import styles from '../../../Styles/reviewStyles.module.css';

import MatPageHeaders from '../../../Components/MatPageHeaders';
import EditButton from '../../../Components/EditButton';
import ResponsiveText from '../../../Components/ResponsiveText';
import BlockRadio from '../../../Components/BlockRadio';
import MATComments from '../../../Components/MATComments';
import LRBlockRadio from '../../../Components/LRBlockRadio';

const StyledLabel = styled("label")({
  display: "flex",
  alignItems: "center",
  width: "90%",
  margin: "auto",
})

const HeadNeckReview = ({values , type}) => {
  const [open, setOpen] = useState(false);
  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({...values.currentSeating.headNeck});
  const [initialCommentsData, setInitialCommentsData] = useState(values.currentSeating.comments);

  const handleOpen = () => {
    setOpen(true);
  };

  function Edit({type}){
    if(type!=="view"){
      return <EditButton setOpen={handleOpen} />
    }
    else{
      return <></>
    }
  }
  // Reset form to its initial values when the user cancels
  const handleCancel = () => {
    values.currentSeating.headNeck = initialFormData;
    values.currentSeating.comments = initialCommentsData; //still got issues here (come back later)
    setOpen(false);
  };

  const handleSave = () => {
    //Update initial edit form data to new values
    setInitialFormData({...values.currentSeating.headNeck});
    setInitialCommentsData(values.currentSeating.comments);
    console.log(values.currentSeating.comments);
    console.log(initialCommentsData);
    setOpen(false);
  };

  return (
    <>
      <Box>
        {/* <EditButton setOpen={handleOpen} /> */}
        <Edit type={type}/>
        <p><b>Cervical Curve (Side View):</b> {values.currentSeating.headNeck.cervicalCurve}</p>
        <p><b>Neck Position (Frontal View):</b> {values.currentSeating.headNeck.neckPosition}</p>
        <p><b>Control:</b> {values.currentSeating.headNeck.control}</p>
      </Box>

      <Modal open={open}>
        <Grid container id={styles['modal-main-grid']}>

          <Grid item xs={12} id={styles['modal-header-grid']}>
            <Typography id={styles['modal-header-title']}>
              Edit: Current Seating - Head & Neck
            </Typography>

            <Box>
              <Button onClick={handleCancel} variant='outlined' id={styles['modal-header-cancelBtn']}>Cancel</Button>
              <Button onClick={handleSave} variant='contained' id={styles['modal-header-confirmBtn']}>Confirm</Button>
            </Box>
          </Grid>

          <Grid container xs={12} id={styles['modal-edit-grid']}>
            <Grid item xs={4}>
              <MatPageHeaders title="Cervical curve (Side View)"/>
              <BlockRadio item="HeadNeckCervicalCurve" page="currentSeating.headNeck.cervicalCurve" />
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title=" Neck Position (Frontal View)"/>
              <StyledLabel>
                  <Field 
                      type="radio"
                      name="currentSeating.headNeck.neckPosition"
                      value="Midline" 
                      style={{ 
                          width: "15px", 
                          height: "15px",
                          marginBottom: "0",
                          marginRight: "2%",
                      }}
                  />
                  <ResponsiveText label="Midline" />
              </StyledLabel>
              <LRBlockRadio item="NeckPosition_Partial" page="currentSeating.headNeck.neckPosition" />
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Control"/>
              <BlockRadio item="Control" page="currentSeating.headNeck.control" />
            </Grid>

            <MATComments title="Current Seating Comments" commentName="currentSeating.comments" />
          </Grid>

        </Grid>
      </Modal>
    </>
  );
};

export default HeadNeckReview;
