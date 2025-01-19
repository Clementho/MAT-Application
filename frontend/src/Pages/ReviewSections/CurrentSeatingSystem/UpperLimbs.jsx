import React from "react";
import { Modal, Box, Grid, Typography, Button } from "@mui/material";
import { useState } from "react";

import styles from "../../../Styles/reviewStyles.module.css";

import ThreeItemCheckBox2 from "../../../Components/ThreeItemCheckBox2";
import MatPageHeaders from "../../../Components/MatPageHeaders";
import EditButton from "../../../Components/EditButton";
import MATComments from "../../../Components/MATComments";
import DescriptionField from "../../../Components/DescriptionField";

const UpLimbsReview = ({ values, type }) => {
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({
    ...values.currentSeating.upperLimbs,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  // Reset form to its initial values when the user cancels
  const handleCancel = () => {
    values.currentSeating.upperLimbs = initialFormData;
    setOpen(false);
  };
  function Edit({ type }) {
    if (type !== "view") {
      return <EditButton setOpen={handleOpen} />;
    } else {
      return <></>;
    }
  }
  const handleSave = () => {
    //Update initial edit form data to new values
    setInitialFormData({ ...values.currentSeating.upperLimbs });
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Edit type={type} />
        <p>
          <b>Shoulder Positioning:</b>{" "}
          {values.currentSeating.upperLimbs.shoulderPosition}
        </p>
        <p>
          <b>Elbow and Forearm Position:</b>{" "}
          {values.currentSeating.upperLimbs.elbowForearmPosition}
        </p>
        <p>
          <b>Wrist and Handgrip:</b>{" "}
          {values.currentSeating.upperLimbs.wristHandgrip}
        </p>
      </Box>

      <Modal open={open}>
        <Grid container id={styles["modal-main-grid"]}>
          <Grid item xs={12} id={styles["modal-header-grid"]}>
            <Typography id={styles["modal-header-title"]}>
              Edit: Current Seating - Upper Limbs
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
                page="currentSeating.upperLimbs.shoulderPosition"
              />
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Elbow and Forearm Position" />
              <ThreeItemCheckBox2
                item="UpperLimbsElbowandForearmPosition"
                page="currentSeating.upperLimbs.elbowForearmPosition"
              />
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Wrist and Handgrip"/>
              <DescriptionField title="Describe:" page="currentSeating.upperLimbs.wristHandgrip" />
            </Grid>

            <MATComments title="Current Seating Comments" commentName="currentSeating.comments" />

          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default UpLimbsReview;
