import React from 'react';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { useState } from 'react';

import styles from '../../../Styles/reviewStyles.module.css';

import ThreeItemCheckBox from '../../../Components/ThreeItemCheckBox';
import MatPageHeaders from '../../../Components/MatPageHeaders';
import EditButton from '../../../Components/EditButton';
import MATComments from '../../../Components/MATComments';
import BlockRadio from '../../../Components/BlockRadio';

const PelvisReview = ({ values,type }) => {
    const [open, setOpen] = useState(false);

    // Store the initial values for cancel
    const [initialFormData, setInitialFormData] = useState({...values.supine.pelvis});

    const handleOpen = () => {
        setOpen(true);
    };

    // Reset form to its initial values when the user cancels
    const handleCancel = () => {
        values.supine.pelvis = initialFormData;
        setOpen(false);
    };

    const handleSave = () => {
        //Update initial edit form data to new values
        setInitialFormData({...values.supine.pelvis})
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
            <p><b>Tilt:</b> {values.supine.pelvis.tilt.condition} - {values.supine.pelvis.tilt.flexibility}</p>
            <p><b>Obliquity:</b> {values.supine.pelvis.obliquity.condition} - {values.supine.pelvis.obliquity.flexibility}</p>
            <p><b>Rotation:</b> {values.supine.pelvis.rotation.condition} - {values.supine.pelvis.rotation.flexibility}</p>
        </Box>

        <Modal open={open}>
        <Grid container id={styles['modal-main-grid']}>

            <Grid item xs={12} id={styles['modal-header-grid']}>
            <Typography id={styles['modal-header-title']}>
                Edit: Supine - Pelvis
            </Typography>

            <Box>
                <Button onClick={handleCancel} variant='outlined' id={styles['modal-header-cancelBtn']}>Cancel</Button>
                <Button onClick={handleSave} variant='contained' id={styles['modal-header-confirmBtn']}>Confirm</Button>
            </Box>
            </Grid>

            <Grid container xs={12} id={styles['modal-edit-grid']}>
                <Grid item xs={4}>
                    <MatPageHeaders title="Tilt" />
                    <ThreeItemCheckBox
                        item="PelvisTilt_Supine"
                        page="supine.pelvis.tilt.condition"
                    />
                    <Box style={{padding: '5%' }}>
                        <BlockRadio 
                        item="Flexibility"
                        page="supine.pelvis.tilt.flexibility"
                        />
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <MatPageHeaders title="Obliquity" />
                    <ThreeItemCheckBox 
                        item="PelvisObliquity"
                        page="supine.pelvis.obliquity.condition"
                    />

                    <Box style={{padding: '5%' }}>
                        <BlockRadio 
                        item="Flexibility"
                        page="supine.pelvis.obliquity.flexibility"
                        />
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <MatPageHeaders title="Rotation" />
                    <ThreeItemCheckBox
                        item="PelvisRotation"
                        page="supine.pelvis.rotation.condition"
                    />

                    <Box style={{padding: '5%' }}>
                        <BlockRadio 
                        item="Flexibility"
                        page="supine.pelvis.rotation.flexibility"
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

export default PelvisReview;
