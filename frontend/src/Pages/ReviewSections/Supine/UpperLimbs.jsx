import React from 'react';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { useState } from 'react';

import styles from '../../../Styles/reviewStyles.module.css';

import ThreeItemCheckBox2 from '../../../Components/ThreeItemCheckBox2';
import MatPageHeaders from '../../../Components/MatPageHeaders';
import EditButton from '../../../Components/EditButton';
import MATComments from '../../../Components/MATComments';
import DescriptionField from '../../../Components/DescriptionField';

const UpLimbsReview = ({values, type}) => {
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({...values.supine.upperLimbs});

  const handleOpen = () => {
      setOpen(true);
  };

  // Reset form to its initial values when the user cancels
  const handleCancel = () => {
      values.supine.upperLimbs = initialFormData;
      setOpen(false);
  };

  const handleSave = () => {
      //Update initial edit form data to new values
      setInitialFormData({...values.supine.upperLimbs})
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
          <p><b>Shoulder PROM:</b> {values.supine.upperLimbs.shoulderPROM}</p>
          <p><b>Elbow and Forearm PROM:</b> {values.supine.upperLimbs.elbowForearmPROM}</p>
          <p><b>Wrist and Hand:</b> {values.supine.upperLimbs.wristHand}</p>
        </Box>

        <Modal open={open}>
        <Grid container id={styles['modal-main-grid']}>

            <Grid item xs={12} id={styles['modal-header-grid']}>
            <Typography id={styles['modal-header-title']}>
                Edit: Supine - Upper Limbs
            </Typography>

            <Box>
                <Button onClick={handleCancel} variant='outlined' id={styles['modal-header-cancelBtn']}>Cancel</Button>
                <Button onClick={handleSave} variant='contained' id={styles['modal-header-confirmBtn']}>Confirm</Button>
            </Box>
            </Grid>

            <Grid container xs={12} id={styles['modal-edit-grid']}>
              <Grid item xs={4}>
                <MatPageHeaders title="Shoulder PROM" />

                <ThreeItemCheckBox2
                  item="UpperLimbsShoulderPROM"
                  page="supine.upperLimbs.shoulderPROM"
                ></ThreeItemCheckBox2>
              </Grid>

              <Grid item xs={4}>
                <MatPageHeaders title="Elbow and Forearm PROM" />
                <DescriptionField title="Description: " page="supine.upperLimbs.elbowForearmPROM" />    
              </Grid>

              <Grid item xs={4}>
                <MatPageHeaders title="Wrist and Hand" />
                <DescriptionField title="Description: " page="supine.upperLimbs.wristHand" />    
              </Grid>

              <MATComments title="Supine Comments" commentName="supine.comments" />
            </Grid>

        </Grid>
        </Modal>
        </>
    );
};

export default UpLimbsReview;
