import React from 'react';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { useState } from 'react';

import styles from '../../../Styles/reviewStyles.module.css';

import ThreeItemCheckBox2 from '../../../Components/ThreeItemCheckBox2';
import MatPageHeaders from '../../../Components/MatPageHeaders';
import EditButton from '../../../Components/EditButton';
import BlockRadio from '../../../Components/BlockRadio';
import MATComments from '../../../Components/MATComments';

const HeadNeckReview = ({ values,type }) => {
    const [open, setOpen] = useState(false);

    // Store the initial values for cancel
    const [initialFormData, setInitialFormData] = useState({...values.supine.headNeck});

    const handleOpen = () => {
        setOpen(true);
    };

    // Reset form to its initial values when the user cancels
    const handleCancel = () => {
        values.supine.headNeck = initialFormData;
        setOpen(false);
    };

    const handleSave = () => {
        //Update initial edit form data to new values
        setInitialFormData({...values.supine.headNeck})
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
            <p><b>Cervical Curve:</b> {values.supine.headNeck.cervicalCurve}</p>
            <p><b>Lateral Flexion:</b> {values.supine.headNeck.lateralFlexion.condition} - {values.supine.headNeck.lateralFlexion.flexibility}</p>
            <p><b>Rotation:</b> {values.supine.headNeck.rotation.condition} - {values.supine.headNeck.rotation.flexibility}</p>
        </Box>

        <Modal open={open}>
        <Grid container id={styles['modal-main-grid']}>

            <Grid item xs={12} id={styles['modal-header-grid']}>
            <Typography id={styles['modal-header-title']}>
                Edit: Supine - Head & Neck
            </Typography>

            <Box>
                <Button onClick={handleCancel} variant='outlined' id={styles['modal-header-cancelBtn']}>Cancel</Button>
                <Button onClick={handleSave} variant='contained' id={styles['modal-header-confirmBtn']}>Confirm</Button>
            </Box>
            </Grid>

            <Grid container xs={12} id={styles['modal-edit-grid']}>
                <Grid item xs={4}>
                    <MatPageHeaders title="Cervical Curve" />

                    <label style={{padding: '2%', fontSize: "1.2em", fontWeight: "500"}}>Resting Posture: </label>
                    <Box marginTop="20px">
                    <BlockRadio 
                        item="HeadNeckCervicalCurve_Supine"
                        page="supine.headNeck.cervicalCurve"
                    />
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <MatPageHeaders title="Lateral Flexion" />

                    <Grid container>
                    <label style={{padding: '2%', fontSize: "1.2em", fontWeight: "500"}}>Resting Posture: </label>
                    <ThreeItemCheckBox2
                    item="HeadNeckLateralFlexion"
                    page="supine.headNeck.lateralFlexion.condition"
                    />
                    <ThreeItemCheckBox2
                    item="Flexibility"
                    page="supine.headNeck.lateralFlexion.flexibility"
                    />

                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <MatPageHeaders title="Rotation" />

                    <Grid container>
                    <label style={{padding: '2%', fontSize: "1.2em", fontWeight: "500"}}>Resting Posture: </label>
                    <ThreeItemCheckBox2
                    item="HeadNeckRotation"
                    page="supine.headNeck.rotation.condition"
                    />
                    <ThreeItemCheckBox2
                    item="Flexibility"
                    page="supine.headNeck.rotation.flexibility"
                    />

                    </Grid>
                </Grid>

                <MATComments title="Supine Comments" commentName="supine.comments" />
            </Grid>

        </Grid>
        </Modal>
        </>
    );
};

export default HeadNeckReview;
