import React from 'react';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { useState } from 'react';

import styles from '../../../Styles/reviewStyles.module.css';

import BlockRadio from '../../../Components/BlockRadio';
import LeftRightAngle from '../../../Components/LeftRightAngle';
import MatPageHeaders from '../../../Components/MatPageHeaders';
import EditButton from '../../../Components/EditButton';
import MATComments from '../../../Components/MATComments';

const KneesFeetReview = ({ values ,type}) => {
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({...values.currentSeating.kneesFeet});

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
    values.currentSeating.kneesFeet = initialFormData;
    setOpen(false);
  };

  const handleSave = () => {
    //Update initial edit form data to new values
    setInitialFormData({...values.currentSeating.kneesFeet})
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Edit type={type}/>
        <p><b>Thigh to Lower Leg Angle:</b> Left Angle - {values.currentSeating.kneesFeet.thighLowerLegAngle.leftAngle}&#176; | Right Angle - {values.currentSeating.kneesFeet.thighLowerLegAngle.rightAngle}&#176;</p>
        <p><b>Lower Leg to Foot Angle:</b> Left Angle - {values.currentSeating.kneesFeet.lowerLegFootAngle.leftAngle}&#176; | Left Flexion - {values.currentSeating.kneesFeet.lowerLegFootAngle.leftFlexion} | Right Angle - {values.currentSeating.kneesFeet.lowerLegFootAngle.rightAngle}&#176; | Right Flexion - {values.currentSeating.kneesFeet.lowerLegFootAngle.rightFlexion}</p>
        <p><b>Foot Position:</b> Left Position - {values.currentSeating.kneesFeet.footPosition.leftPosition} | Right Position - {values.currentSeating.kneesFeet.footPosition.rightPosition}</p>
      </Box>

      <Modal open={open}>
        <Grid container id={styles['modal-main-grid']}>

          <Grid item xs={12} id={styles['modal-header-grid']}>
            <Typography id={styles['modal-header-title']}>
              Edit: Current Seating - Kness & Feet
            </Typography>

            <Box>
              <Button onClick={handleCancel} variant='outlined' id={styles['modal-header-cancelBtn']}>Cancel</Button>
              <Button onClick={handleSave} variant='contained' id={styles['modal-header-confirmBtn']}>Confirm</Button>
            </Box>
          </Grid>

          <Grid container xs={12} id={styles['modal-edit-grid']}>
            <Grid item xs={4}>
              <MatPageHeaders title="Thigh-Lower Leg Angle"/>
              <Grid container>
                <LeftRightAngle
                  name="currentSeating.kneesFeet.thighLowerLegAngle.leftAngle"
                  type="Left"
                />
                <LeftRightAngle
                  name="currentSeating.kneesFeet.thighLowerLegAngle.rightAngle"
                  type="Right"
                />
              </Grid>
            </Grid>

              <Grid item xs={4}>
                <MatPageHeaders title="Lower Leg Foot Angle"/>
                <Grid container>
                  <LeftRightAngle
                    name="currentSeating.kneesFeet.lowerLegFootAngle.leftAngle"
                    type="Left"
                  />
                  <LeftRightAngle
                    name="currentSeating.kneesFeet.lowerLegFootAngle.rightAngle"
                    type="Right"
                  />
                  <Grid container marginTop={1}>
                    <Grid xs={6}>
                      <BlockRadio item="LowerLegFootFlexion" page="currentSeating.kneesFeet.lowerLegFootAngle.leftFlexion" />
                    </Grid>

                    <Grid item xs={6}>
                      <BlockRadio item="LowerLegFootFlexion" page="currentSeating.kneesFeet.lowerLegFootAngle.rightFlexion" />
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>


              <Grid item xs={4}>
              <MatPageHeaders title="Foot Position"/>
            <Grid container>

              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold" }}>Left:</Typography>
                <BlockRadio item="FootPosition" page="currentSeating.kneesFeet.footPosition.leftPosition" />
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold" }}>Right:</Typography>
                <BlockRadio item="FootPosition" page="currentSeating.kneesFeet.footPosition.rightPosition" />
              </Grid>
            </Grid>
            </Grid>

            <MATComments title="Current Seating Comments" commentName="currentSeating.comments" />
          </Grid>

        </Grid>
      </Modal>
    </>
  );
};

export default KneesFeetReview;
