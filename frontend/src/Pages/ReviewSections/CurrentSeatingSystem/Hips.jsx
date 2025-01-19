import React from 'react';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { useState } from 'react';

import styles from '../../../Styles/reviewStyles.module.css';

import ThreeItemCheckBox from '../../../Components/ThreeItemCheckBox';
import LeftRightAngle from '../../../Components/LeftRightAngle';
import MatPageHeaders from '../../../Components/MatPageHeaders';
import MATComments from '../../../Components/MATComments';
import EditButton from '../../../Components/EditButton';
import LRBlockRadio from '../../../Components/LRBlockRadio';
import LRThreeItemCheckBox from '../../../Components/LRThreeItemCheckBox';

const HipsReview = ({ values,type }) => {
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({...values.currentSeating.hips});

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
    values.currentSeating.hips = initialFormData;
    setOpen(false);
  };

  const handleSave = () => {
    //Update initial edit form data to new values
    setInitialFormData({...values.currentSeating.hips})
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Edit type={type}/>
        <p><b>Thigh to Trunk Angle:</b> Left Angle - {values.currentSeating.hips.thighTrunkAngle.leftAngle}&#176; | Right Angle - {values.currentSeating.hips.thighTrunkAngle.rightAngle}&#176;</p>
        <p><b>Position (Frontal View):</b> Condition - {values.currentSeating.hips.position.condition} | Rotation - {values.currentSeating.hips.position.rotation} </p>
        <p><b>Windswept (Frontal View):</b> {values.currentSeating.hips.windswept}</p>
      </Box>

      <Modal open={open}>
      <Grid container id={styles['modal-main-grid']}>

        <Grid item xs={12} id={styles['modal-header-grid']}>
          <Typography id={styles['modal-header-title']}>
            Edit: Current Seating - Hips
          </Typography>

          <Box>
            <Button onClick={handleCancel} variant='outlined' id={styles['modal-header-cancelBtn']}>Cancel</Button>
            <Button onClick={handleSave} variant='contained' id={styles['modal-header-confirmBtn']}>Confirm</Button>
          </Box>
        </Grid>

        <Grid container xs={12} id={styles['modal-edit-grid']}>
          <Grid item xs={4}>
            <MatPageHeaders title="Thigh to Trunk Angle"/>
            <Grid container>
              <LeftRightAngle
                name="currentSeating.hips.thighTrunkAngle.leftAngle"
                type="Left"
              />
              <LeftRightAngle
                name="currentSeating.hips.thighTrunkAngle.rightAngle"
                type="Right"
              />
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <MatPageHeaders title="Position (Frontal View)"/>
            <LRThreeItemCheckBox 
              imgItem="Position"
              item="PositionABDuction"
              page="currentSeating.hips.position.condition"
            />

            <LRBlockRadio item="HipsPosition_Rotation" page="currentSeating.hips.position.rotation" />
          </Grid>

          <Grid item xs={4}>
            <MatPageHeaders title="Windswept (Frontal View)"/>

            <ThreeItemCheckBox
              item="Windswept"
              page="currentSeating.hips.windswept"
            ></ThreeItemCheckBox>
          </Grid>

          <MATComments title="Current Seating Comments" commentName="currentSeating.comments" />
        </Grid>

        </Grid>
      </Modal>
    </>
  );
};

export default HipsReview;
