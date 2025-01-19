import React from 'react';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { useState } from 'react';

import styles from '../../../Styles/reviewStyles.module.css';

import ThreeItemCheckBox from '../../../Components/ThreeItemCheckBox';
import MatPageHeaders from '../../../Components/MatPageHeaders';
import EditButton from '../../../Components/EditButton';
import MATComments from '../../../Components/MATComments';
import BlockRadio from '../../../Components/BlockRadio';

const TrunkReview = ({ values,type }) => {
    const [open, setOpen] = useState(false);

    // Store the initial values for cancel
    const [initialFormData, setInitialFormData] = useState({...values.supine.trunk});

    const handleOpen = () => {
        setOpen(true);
    };

    // Reset form to its initial values when the user cancels
    const handleCancel = () => {
        values.supine.trunk = initialFormData;
        setOpen(false);
    };

    const handleSave = () => {
        //Update initial edit form data to new values
        setInitialFormData({...values.supine.trunk})
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
          <p><b>Anterior/Posterior:</b> {values.supine.trunk.antPosterior.condition} - {values.supine.trunk.antPosterior.flexibility}</p>
            <p><b>Scoliosis (Frontal View):</b> {values.supine.trunk.scoliosis.condition} - {values.supine.trunk.scoliosis.flexibility}</p>
            <p><b>Rotation (Top View):</b> {values.supine.trunk.rotation.condition} - {values.supine.trunk.rotation.flexibility}</p>
        </Box>
  
        <Modal open={open}>
          <Grid container id={styles['modal-main-grid']}>
  
            <Grid item xs={12} id={styles['modal-header-grid']}>
              <Typography id={styles['modal-header-title']}>
                Edit: Supine - Trunk
              </Typography>
  
              <Box>
                <Button onClick={handleCancel} variant='outlined' id={styles['modal-header-cancelBtn']}>Cancel</Button>
                <Button onClick={handleSave} variant='contained' id={styles['modal-header-confirmBtn']}>Confirm</Button>
              </Box>
            </Grid>
  
            <Grid container xs={12} id={styles['modal-edit-grid']}>
              <Grid item xs={4}>
                <MatPageHeaders title="Anterior/Posterior" />

                <ThreeItemCheckBox
                  item="TrunkAnterior/Posterior_Supine"
                  page="supine.trunk.antPosterior.condition"
                />

                <Box style={{padding: '5%' }}>
                  <BlockRadio 
                    item="Flexibility"
                    page="supine.trunk.antPosterior.flexibility"
                  />
                </Box>
              </Grid>
  
              <Grid item xs={4}>
                <MatPageHeaders title="Scoliosis" />

                <ThreeItemCheckBox
                  item="TrunkScoliosis"
                  page="supine.trunk.scoliosis.condition"
                />

                <Box style={{padding: '5%' }}>
                  <BlockRadio 
                    item="Flexibility"
                    page="supine.trunk.scoliosis.flexibility"
                  />
                </Box>
              </Grid>
  
              <Grid item xs={4}>
                <MatPageHeaders title="Rotation" />
                <ThreeItemCheckBox
                  item="TrunkRotation_Supine"
                  page="supine.trunk.rotation.condition"
                />

                <Box style={{padding: '5%' }}>
                  <BlockRadio 
                    item="Flexibility"
                    page="supine.trunk.rotation.flexibility"
                  />
                </Box>
              </Grid>
  
              <MATComments title="Supine Comments" commentName="supine.comments" />
            </Grid>
  
          </Grid>
        </Modal>
      </>
    );
};

export default TrunkReview;
