import React from 'react';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { useState } from 'react';

import styles from '../../../Styles/reviewStyles.module.css';

import HorizontalAngle2 from '../../../Components/HorizontalAngle2';
import MatPageHeaders from '../../../Components/MatPageHeaders';
import EditButton from '../../../Components/EditButton';
import ResponsiveText from '../../../Components/ResponsiveText';
import MATComments from '../../../Components/MATComments';
import DescriptionField from '../../../Components/DescriptionField';

const LowerExReview = ({ values,type }) => {
    const [open, setOpen] = useState(false);

    // Store the initial values for cancel
    const [initialFormData, setInitialFormData] = useState({...values.supine.lowerExtremities});

    const handleOpen = () => {
        setOpen(true);
    };

    // Reset form to its initial values when the user cancels
    const handleCancel = () => {
        values.supine.lowerExtremities = initialFormData;
        setOpen(false);
    };

    const handleSave = () => {
        //Update initial edit form data to new values
        setInitialFormData({...values.supine.lowerExtremities})
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
            <p><b>Trunk-Thigh Angle:</b> Left Angle - {values.supine.lowerExtremities.trunkThighAngle.leftAngle}&#176; |  Right Angle - {values.supine.lowerExtremities.trunkThighAngle.rightAngle}&#176; | Observation - {values.supine.lowerExtremities.trunkThighAngle.observation}</p>
            <p><b>Thigh Low-Leg Angle:</b> Left Angle - {values.supine.lowerExtremities.thighLowLegAngle.leftAngle}&#176; |  Right Angle - {values.supine.lowerExtremities.thighLowLegAngle.rightAngle}&#176; | Observation - {values.supine.lowerExtremities.thighLowLegAngle.observation}</p>
            <p><b>Lower Leg-Foot Angle:</b> Left Angle - {values.supine.lowerExtremities.lowerLegFootAngle.leftAngle}&#176; |  Right Angle - {values.supine.lowerExtremities.lowerLegFootAngle.rightAngle}&#176; | Observation - {values.supine.lowerExtremities.lowerLegFootAngle.observation}</p>
            <p><b>Hip Abduction/Adduction:</b> {values.supine.lowerExtremities.hipDuction}</p>
            <p><b>Hip External/Internal Rotation:</b> {values.supine.lowerExtremities.hipRotation}</p>
            <p><b>Foot Inversion/Eversion:</b> {values.supine.lowerExtremities.footInEversion}</p>
        </Box>

        <Modal open={open}>
        <Grid container id={styles['modal-main-grid']}>

            <Grid item xs={12} id={styles['modal-header-grid']}>
            <Typography id={styles['modal-header-title']}>
                Edit: Supine - Lower Extremities
            </Typography>

            <Box>
                <Button onClick={handleCancel} variant='outlined' id={styles['modal-header-cancelBtn']}>Cancel</Button>
                <Button onClick={handleSave} variant='contained' id={styles['modal-header-confirmBtn']}>Confirm</Button>
            </Box>
            </Grid>

            <Grid container xs={12} id={styles['modal-edit-grid-lowerExSupine']}>
                <Grid item xs={12}>
                    <MatPageHeaders title="Range of Motion" />
                        
                    <Box sx={{ 
                        display: 'grid',
                        alignItems: "center",
                        gridTemplateColumns: '2fr 1fr 1fr 1fr 2fr',
                        marginTop: '20px',
                        "& .MuiTypography-root": {
                        fontWeight: "bold",
                        fontSize: "1.1em",
                        }
                    }}>
                        <ResponsiveText label="Angles" />
                        <ResponsiveText label="Left" />
                        <ResponsiveText label="Right" />
                        <ResponsiveText label="Normal ROM" />
                        <ResponsiveText label="Fixed/Flexible/Corrects with effort, Tone/Spasm that may impact on seating posture:" />
                    </Box>
                    
                    <HorizontalAngle2 type2 ="Trunk-Thigh Angle:" desc= "Flex hip to 90 or a lesser angle till ASIS rolls/pelvis tilts" name1="supine.lowerExtremities.trunkThighAngle.leftAngle" name2="supine.lowerExtremities.trunkThighAngle.rightAngle" type3='0 - 90' name3='supine.lowerExtremities.trunkThighAngle.observation'></HorizontalAngle2>

                    <HorizontalAngle2 type2 ="Thigh-Low Leg Angle:"  desc ="With hip flex at 90 or the trunk to thigh angle, extended knee from flexion till pelvis tilt/ASIS rolls." name1="supine.lowerExtremities.thighLowLegAngle.leftAngle" name2="supine.lowerExtremities.thighLowLegAngle.rightAngle" type3='30 - 180' name3='supine.lowerExtremities.thighLowLegAngle.observation'></HorizontalAngle2>

                    <HorizontalAngle2 type2 ="Lower-Leg Foot Angle:" desc=" "  name1="supine.lowerExtremities.lowerLegFootAngle.leftAngle" name2="supine.lowerExtremities.lowerLegFootAngle.rightAngle" type3='30 - 135' name3='supine.lowerExtremities.lowerLegFootAngle.observation'></HorizontalAngle2>

                    <Box sx={{ marginTop: '3%', marginBottom: '2%', display: 'grid', gridTemplateColumns: '1fr  1fr 1fr' }}>

                    <DescriptionField title="Hip Abduction/Adduction:" page="supine.lowerExtremities.hipDuction" />
                    <DescriptionField title="Hip External/Internal Rotation:" page="supine.lowerExtremities.hipRotation" />
                    <DescriptionField title="Hip Inversion/Eversion:" page="supine.lowerExtremities.footInEversion" />
                    
                    </Box>

                    <Box style={{textAlign: 'center', marginTop: '3%'}}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/mat-image.appspot.com/o/image.png?alt=media&token=e70c5482-8d54-4964-85ed-d68ed1853595" alt="" />
                    </Box>

                </Grid>

                <MATComments title="Supine Comments" commentName="supine.comments" />
            </Grid>

        </Grid>
        </Modal>
        </>
    );
};

export default LowerExReview;