import React from "react";
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";

import styles from "../../../Styles/reviewStyles.module.css";

import sittingAngles from "../../../Images/sittingAngles.png";

import ThreeItemCheckBox from "../../../Components/ThreeItemCheckBox";
import MatPageHeaders from "../../../Components/MatPageHeaders";
import EditButton from "../../../Components/EditButton";
import MATComments from "../../../Components/MATComments";
import LRBlockRadio from "../../../Components/LRBlockRadio";
import LeftRightAngle from "../../../Components/LeftRightAngle";
import LRThreeItemCheckBox from "../../../Components/LRThreeItemCheckBox";

const LowerExReview = ({ values, type }) => {
  const [open, setOpen] = useState(false);

  // Store the initial values for cancel
  const [initialFormData, setInitialFormData] = useState({
    ...values.sitting.lowerExtremities,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  // Reset form to its initial values when the user cancels
  const handleCancel = () => {
    values.sitting.lowerExtremities = initialFormData;
    setOpen(false);
  };

  const handleSave = () => {
    //Update initial edit form data to new values
    setInitialFormData({ ...values.sitting.lowerExtremities });
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
          <b>Initial Sitting Angles:</b> Thigh to Trunk -{" "}
          {values.sitting.lowerExtremities.initialSittingAngles.thighTrunk}
          &#176; | Thigh to Lower Leg -{" "}
          {values.sitting.lowerExtremities.initialSittingAngles.thighLowerLeg}
          &#176;
        </p>
        <p>
          <b>Position (Frontal View):</b> Condition -{" "}
          {values.sitting.lowerExtremities.position.condition} | Rotation -{" "}
          {values.sitting.lowerExtremities.position.rotation}
        </p>
        <p>
          <b>Windswept (Frontal View):</b>{" "}
          {values.sitting.lowerExtremities.windswept}
        </p>
      </Box>

      <Modal open={open}>
        <Grid container id={styles["modal-main-grid"]}>
          <Grid item xs={12} id={styles["modal-header-grid"]}>
            <Typography id={styles["modal-header-title"]}>
              Edit: Sitting - Lower Extremities
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
              <Grid item xs={12}>
              <Typography variant="caption" sx={{ textDecoration: "underline", fontSize: "1.2em" }}>
                  Initial Seating Angles:
                </Typography>
                <Box style={{ textAlign: "center", margin: "20px auto"}}>
                  <img src={sittingAngles} alt="img" style={{width: "60%"}}/>
                </Box>
              </Grid>

              <Grid container>
                <LeftRightAngle
                  name="sitting.lowerExtremities.initialSittingAngles.thighTrunk"
                  type="Thigh-Trunk Angle"
                />
                <LeftRightAngle
                  name="sitting.lowerExtremities.initialSittingAngles.thighLowerLeg"
                  type="Thigh-Lower Leg Angle"
                />
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Position (Frontal View)" />
              
              <LRThreeItemCheckBox 
                imgItem="Position"
                item="PositionABDuction"
                page="sitting.lowerExtremities.position.condition"
              />
              <LRBlockRadio item="HipsPosition_Rotation" page="sitting.lowerExtremities.position.rotation" />
            </Grid>

            <Grid item xs={4}>
              <MatPageHeaders title="Windswept (Frontal View)" />
              <ThreeItemCheckBox
                item="Windswept"
                page="sitting.lowerExtremities.windswept"
              ></ThreeItemCheckBox>
            </Grid>

            <MATComments title="Sitting Comments" commentName="sitting.comments" />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default LowerExReview;
