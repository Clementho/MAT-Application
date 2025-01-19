import React from 'react';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { useState } from 'react';

import styles from '../../../Styles/reviewStyles.module.css';

import MatPageHeaders from '../../../Components/MatPageHeaders';
import EditButton from '../../../Components/EditButton';
import ThreeItemCheckBox from '../../../Components/ThreeItemCheckBox';
import MATComments from '../../../Components/MATComments';

const TrunkReview = ({ values,type }) => {
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({...values.currentSeating.trunk});
  const [initialCommentsData, setInitialCommentsData] = useState(values.currentSeating.comments);

  const handleOpen = () => {
    setOpen(true);
  };

  // Reset form to its initial values when the user cancels
  const handleCancel = () => {
    values.currentSeating.trunk = initialFormData;
    values.currentSeating.comments = initialCommentsData; //still got issues here (come back later)
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
  const handleSave = () => {
    //Update initial edit form data to new values
    setInitialFormData({...values.currentSeating.trunk});
    setInitialCommentsData(values.currentSeating.comments);
    console.log(values.currentSeating.comments);
    console.log(initialCommentsData);
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Edit type={type}/>
        <p><b>Anterior/Posterior:</b> {values.currentSeating.trunk.antPosterior}</p>
        <p><b>Scoliosis (Frontal View):</b> {values.currentSeating.trunk.scoliosis}</p>
        <p><b>Rotation (Top View):</b> {values.currentSeating.trunk.rotation}</p>
      </Box>
      <Modal open={open}>
        <Grid container id={styles['modal-main-grid']}>

          <Grid item xs={12} id={styles['modal-header-grid']}>
            <Typography id={styles['modal-header-title']}>
              Edit: Current Seating - Trunk
            </Typography>

            <Box>
              <Button onClick={handleCancel} variant='outlined' id={styles['modal-header-cancelBtn']}>Cancel</Button>
              <Button onClick={handleSave} variant='contained' id={styles['modal-header-confirmBtn']}>Confirm</Button>
            </Box>
          </Grid>

          <Grid container xs={12} id={styles['modal-edit-grid']}>
            <Grid item xs={4}>
              <MatPageHeaders title="Anterior/Posterior"/>
              <ThreeItemCheckBox
                item="TrunkAnterior/Posterior"
                page="currentSeating.trunk.antPosterior"
              ></ThreeItemCheckBox>
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Scoliosis (Frontal View)"/>
              <ThreeItemCheckBox
                item="TrunkScoliosis"
                page="currentSeating.trunk.scoliosis"
              ></ThreeItemCheckBox>
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Rotation (Top View)" />
              <ThreeItemCheckBox
                item="TrunkRotation"
                page="currentSeating.trunk.rotation"
              ></ThreeItemCheckBox>
            </Grid>

            <MATComments title="Current Seating Comments" commentName="currentSeating.comments" />
          </Grid>

        </Grid>
      </Modal>
    </>
  );
};

export default TrunkReview;
