import React from "react";
import { Modal, Box, Grid, Typography, Button } from "@mui/material";
import { useState } from "react";

import styles from "../../../Styles/reviewStyles.module.css";


import MATComments from "../../../Components/MATComments";
import MatPageHeaders from "../../../Components/MatPageHeaders";
import EditButton from "../../../Components/EditButton";
import ThreeItemCheckBox2 from "../../../Components/ThreeItemCheckBox2";
import DescriptionField from "../../../Components/DescriptionField";

const UpLimbsReview = ({ values, type }) => {
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({
    ...values.sitting.upperLimbs,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  // Reset form to its initial values when the user cancels
  const handleCancel = () => {
    values.sitting.upperLimbs = initialFormData;
    setOpen(false);
  };

  const handleSave = () => {
    //Update initial edit form data to new values
    setInitialFormData({ ...values.sitting.upperLimbs });
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
          <b>Shoulder Positioning:</b>{" "}
          {values.sitting.upperLimbs.shoulderPosition.condition} -{" "}
          {values.sitting.upperLimbs.shoulderPosition.description}
        </p>
        <p>
          <b>Elbow and Forearm Position:</b>{" "}
          {values.sitting.upperLimbs.elbowForearmPosition}
        </p>
        <p>
          <b>Hand and Wrist Positioning:</b>{" "}
          {values.sitting.upperLimbs.handWristPosition}
        </p>
      </Box>

      <Modal open={open}>
        <Grid container id={styles["modal-main-grid"]}>
          <Grid item xs={12} id={styles["modal-header-grid"]}>
            <Typography id={styles["modal-header-title"]}>
              Edit: Sitting - Upper Limbs
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
              <MatPageHeaders title="Shoulder Positioning" />
              <ThreeItemCheckBox2
                item="UpperLimbsShoulderPositioning"
                page="sitting.upperLimbs.shoulderPosition.condition"
              />
              <DescriptionField title="Describe:" page="sitting.upperLimbs.shoulderPosition.description" />
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Elbow and Forearm Position" />
              <DescriptionField title="Describe:" page="sitting.upperLimbs.elbowForearmPosition" />
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title=" Hand and Wrist Positioning" />
              <DescriptionField title="Describe:" page="sitting.upperLimbs.handWristPosition" />
            </Grid>

            <MATComments title="Sitting Comments" commentName="sitting.comments" />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default UpLimbsReview;
