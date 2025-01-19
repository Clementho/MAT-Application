import React from "react";
import { Modal, Box, Grid, Typography, Button } from "@mui/material";
import { useState } from "react";

import styles from "../../../Styles/reviewStyles.module.css";

import MatPageHeaders from "../../../Components/MatPageHeaders";
import EditButton from "../../../Components/EditButton";
import MATComments from "../../../Components/MATComments";
import DescriptionField from "../../../Components/DescriptionField";

const HeadNeckReview = ({ values, type }) => {
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({
    ...values.sitting.headNeck,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  // Reset form to its initial values when the user cancels
  const handleCancel = () => {
    values.sitting.headNeck = initialFormData;
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
    setInitialFormData({ ...values.sitting.headNeck });
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Edit type={type} />
        <p>
          <b>Cervical Curve (Side View):</b>{" "}
          {values.sitting.headNeck.cervicalCurve}
        </p>
        <p>
          <b>Neck Position (Frontal View):</b>{" "}
          {values.sitting.headNeck.neckPosition}
        </p>
        <p>
          <b>Control:</b> {values.sitting.headNeck.control}
        </p>
      </Box>

      <Modal open={open}>
        <Grid container id={styles["modal-main-grid"]}>
          <Grid item xs={12} id={styles["modal-header-grid"]}>
            <Typography id={styles["modal-header-title"]}>
              Edit: Sitting - Head & Neck
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
              <MatPageHeaders title="Cervical curve (Side View)" />
              <DescriptionField title="Describe:" page="sitting.headNeck.cervicalCurve" />
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Neck Position (Frontal View)" />
              <DescriptionField title="Describe:" page="sitting.headNeck.neckPosition" />
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Control" />
              <DescriptionField title="Describe:" page="sitting.headNeck.control" />
            </Grid>

            <MATComments title="Sitting Comments" commentName="sitting.comments" />

          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default HeadNeckReview;
