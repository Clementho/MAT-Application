import React from 'react';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { useState } from 'react';

import styles from '../../../Styles/reviewStyles.module.css';

import ThreeItemCheckBox from '../../../Components/ThreeItemCheckBox';
import MatPageHeaders from '../../../Components/MatPageHeaders';
import EditButton from '../../../Components/EditButton';
import MATComments from '../../../Components/MATComments';

const PelvisReview = ({ values,type }) => {
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({...values.currentSeating.pelvis});
  function Edit({type}){
    if(type!=="view"){
      return <EditButton setOpen={handleOpen} />
    }
    else{
      return <></>
    }
  }
  const handleOpen = () => {
    setOpen(true);
  };

  // Reset form to its initial values when the user cancels
  const handleCancel = () => {
    values.currentSeating.pelvis = initialFormData;
    setOpen(false);
  };

  const handleSave = () => {
    //Update initial edit form data to new values
    setInitialFormData({...values.currentSeating.pelvis})
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Edit type={type} />
        <p><b>Tilt (Side View):</b> {values.currentSeating.pelvis.tilt}</p>
        <p><b>Obliquity (Frontal View):</b> {values.currentSeating.pelvis.obliquity}</p>
        <p><b>Rotation (Top View):</b> {values.currentSeating.pelvis.rotation}</p>
      </Box>

      <Modal open={open}>
        <Grid container id={styles['modal-main-grid']}>

          <Grid item xs={12} id={styles['modal-header-grid']}>
            <Typography id={styles['modal-header-title']}>
              Edit: Current Seating - Pelvis
            </Typography>

            <Box>
              <Button onClick={handleCancel} variant='outlined' id={styles['modal-header-cancelBtn']}>Cancel</Button>
              <Button onClick={handleSave} variant='contained' id={styles['modal-header-confirmBtn']}>Confirm</Button>
            </Box>
          </Grid>

          <Grid container xs={12} id={styles['modal-edit-grid']}>
            <Grid item xs={4}>
              <MatPageHeaders title="Tilt (Side view)"/>
              <ThreeItemCheckBox
                item="PelvisTilt"
                page="currentSeating.pelvis.tilt"
              ></ThreeItemCheckBox>
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Obliquity (Frontal View)" />
              <ThreeItemCheckBox item="PelvisObliquity" page="currentSeating.pelvis.obliquity"/>
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Rotation (Top View)" />
              <ThreeItemCheckBox item="PelvisRotation" page="currentSeating.pelvis.rotation"/>
            </Grid>

            <MATComments title="Current Seating Comments" commentName="currentSeating.comments" />
          </Grid>

        </Grid>
      </Modal>
    </>
  );
};

export default PelvisReview;
