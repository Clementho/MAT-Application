import React from "react";
import { Modal, Box, Grid, Typography, Button } from "@mui/material";
import { useState } from "react";

import styles from "../../../Styles/reviewStyles.module.css";

import ThreeItemCheckBox from "../../../Components/ThreeItemCheckBox";
import MatPageHeaders from "../../../Components/MatPageHeaders";
import EditButton from "../../../Components/EditButton";
import BlockRadio from "../../../Components/BlockRadio";
import MATComments from "../../../Components/MATComments";

const TrunkReview = ({ values, type }) => {
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({
    ...values.sitting.trunk,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  // Reset form to its initial values when the user cancels
  const handleCancel = () => {
    values.sitting.trunk = initialFormData;
    setOpen(false);
  };

  const handleSave = () => {
    //Update initial edit form data to new values
    setInitialFormData({ ...values.sitting.trunk });
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
          <b>Anterior/Posterior:</b>{" "}
          {values.sitting.trunk.antPosterior.condition} -{" "}
          {values.sitting.trunk.antPosterior.flexibility}
        </p>
        <p>
          <b>Scoliosis:</b> {values.sitting.trunk.scoliosis.condition} -{" "}
          {values.sitting.trunk.scoliosis.flexibility}
        </p>
        <p>
          <b>Rotation:</b> {values.sitting.trunk.rotation}
        </p>
      </Box>

      <Modal open={open}>
        <Grid container id={styles["modal-main-grid"]}>
          <Grid item xs={12} id={styles["modal-header-grid"]}>
            <Typography id={styles["modal-header-title"]}>
              Edit: Sitting - Trunk
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
              <MatPageHeaders title="Anterior /Posterior" />
              <ThreeItemCheckBox
                item="TrunkAnterior/Posterior"
                page="sitting.trunk.antPosterior.condition"
              />
              <BlockRadio item="Flexibility" page="sitting.trunk.antPosterior.flexibility" />
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Scoliosis (Frontal View)" />
              <ThreeItemCheckBox
                item="TrunkScoliosis"
                page="sitting.trunk.scoliosis.condition"
              />
              <BlockRadio item="Flexibility" page="sitting.trunk.scoliosis.flexibility" />
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Rotation (Top View)" />
              <ThreeItemCheckBox
                item="TrunkRotation"
                page="sitting.trunk.rotation"
              ></ThreeItemCheckBox>
            </Grid>

            <MATComments title="Sitting Comments" commentName="sitting.comments" />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default TrunkReview;
