import React from "react";
import { Modal, Box, Grid, Typography, Button } from "@mui/material";
import { useState } from "react";

import styles from "../../../Styles/reviewStyles.module.css";

import ThreeItemCheckBox from "../../../Components/ThreeItemCheckBox";
import MatPageHeaders from "../../../Components/MatPageHeaders";
import EditButton from "../../../Components/EditButton";
import MATComments from "../../../Components/MATComments";

const PelvisReview = ({ values, type }) => {
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({
    ...values.sitting.pelvis,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  // Reset form to its initial values when the user cancels
  const handleCancel = () => {
    values.sitting.pelvis = initialFormData;
    setOpen(false);
  };

  const handleSave = () => {
    //Update initial edit form data to new values
    setInitialFormData({ ...values.sitting.pelvis });
    setOpen(false);
  };

  function Edit({ type }) {
    if (type !== "view") {
      return <EditButton setOpen={handleOpen} />;
    } else {
      return <></>;
    }
  }

  return (
    <>
      <Box>
        <Edit type={type} />
        <p>
          <b>Tilt (Side View):</b> {values.sitting.pelvis.tilt}
        </p>
        <p>
          <b>Obliquity (Frontal View):</b> {values.sitting.pelvis.obliquity}
        </p>
        <p>
          <b>Rotation (Top View):</b> {values.sitting.pelvis.rotation}
        </p>
      </Box>

      <Modal open={open}>
        <Grid container id={styles["modal-main-grid"]}>
          <Grid item xs={12} id={styles["modal-header-grid"]}>
            <Typography id={styles["modal-header-title"]}>
              Edit: Sitting - Pelvis
            </Typography>

            <Box>
              <Button
                onClick={handleCancel}
                variant="outlined"
                id={styles["modal-header-cancelBtn"]}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                id={styles["modal-header-confirmBtn"]}
              >
                Confirm
              </Button>
            </Box>
          </Grid>

          <Grid container xs={12} id={styles["modal-edit-grid"]}>
            <Grid item xs={4}>
              <MatPageHeaders title="Tilt (Side view)" />
              <ThreeItemCheckBox
                item="PelvisTilt"
                page="sitting.pelvis.tilt"
              ></ThreeItemCheckBox>
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Obliquity (Frontal View)" />
              <ThreeItemCheckBox
                item="PelvisObliquity"
                page="sitting.pelvis.obliquity"
              ></ThreeItemCheckBox>
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Rotation (Top View)" />
              <ThreeItemCheckBox
                item="PelvisRotation"
                page="sitting.pelvis.rotation"
              ></ThreeItemCheckBox>
            </Grid>

            <MATComments title="Sitting Comments" commentName="sitting.comments" />

          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default PelvisReview;
