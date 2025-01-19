import React from "react";
import { Field, useFormikContext } from "formik";
import MatTabs from "../../Components/MatTabs";
import { Box, Grid, Typography, styled } from "@mui/material";
import ThreeItemCheckBox from "../../Components/ThreeItemCheckBox";
import sittingAngles from "../../Images/sittingAngles.png";
import MatPageHeaders from "../../Components/MatPageHeaders";
import MATComments from "../../Components/MATComments";
import BlockRadio from "../../Components/BlockRadio";
import ThreeItemCheckBox2 from "../../Components/ThreeItemCheckBox2";
import DescriptionField from "../../Components/DescriptionField";
import LeftRightAngle from "../../Components/LeftRightAngle";
import SelectDropDown from "../../Components/SelectDropDown";
import LRBlockRadio from "../../Components/LRBlockRadio";
import LRThreeItemCheckBox from "../../Components/LRThreeItemCheckBox";

const StyledBox = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: "10px",
  fontSize: "1.3rem",
  fontWeight: "bold",
  "& .MuiSelect-select": {
    border: "2px solid #B1ACAC",
    borderRadius: "10px",
    padding: "10px",
  }
});

const GridContainer = styled(Grid)({
  "& > div:nth-child(3)": {
    borderWidth: "3px 0"
  }
})

const FieldGrid = styled(Grid)({
  border: "3px solid #1D4D93",
  padding: "20px 10px",
  margin: "10px 0",
})

const balanceOptions = ['Hands-free sitter', 'Hands dependant sitter', 'Dependant sitter'];
const tabs = [
  {
    label: "Pelvis",
    Component: (
      <GridContainer container spacing={1}>
        <FieldGrid item xs={12}>
          <StyledBox>
            Client Sitting Balance:
            <Field
              name="sitting.balance"
              render={({ field }) => (
                <SelectDropDown
                  options={balanceOptions}
                  placeholder="Select Client's Balance Condition"
                  field={field}
                  setFieldTouched={useFormikContext().setFieldTouched}
                />
              )}
            />
          </StyledBox>
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Tilt (Side view)" />
          <ThreeItemCheckBox
            item="PelvisTilt"
            page="sitting.pelvis.tilt"
          />
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Obliquity (Frontal View)" />
          <ThreeItemCheckBox
            item="PelvisObliquity"
            page="sitting.pelvis.obliquity"
          />
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Rotation (Top View)" />
          <ThreeItemCheckBox
            item="PelvisRotation"
            page="sitting.pelvis.rotation"
          />
        </FieldGrid>

        <MATComments title="Sitting Comments" commentName="sitting.comments" />

      </GridContainer>
    ),
  },
  {
    label: "Trunk",
    Component: (
      <GridContainer container spacing={1}>
        <FieldGrid item xs={12}>
          <StyledBox>
            Client Sitting Balance:
            <Field
              name="sitting.balance"
              render={({ field }) => (
                <SelectDropDown
                  options={balanceOptions}
                  placeholder="Select Client's Balance Condition"
                  field={field}
                  setFieldTouched={useFormikContext().setFieldTouched}
                />
              )}
            />
          </StyledBox>
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Anterior /Posterior" />
          <ThreeItemCheckBox
            item="TrunkAnterior/Posterior"
            page="sitting.trunk.antPosterior.condition"
          />
          <BlockRadio item="Flexibility" page="sitting.trunk.antPosterior.flexibility" />
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Scoliosis (Frontal View)" />
          <ThreeItemCheckBox
            item="TrunkScoliosis"
            page="sitting.trunk.scoliosis.condition"
          />
          <BlockRadio item="Flexibility" page="sitting.trunk.scoliosis.flexibility" />
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Rotation (Top View)" />
          <ThreeItemCheckBox
            item="TrunkRotation"
            page="sitting.trunk.rotation"
          />
        </FieldGrid>

        <MATComments title="Sitting Comments" commentName="sitting.comments" />

      </GridContainer>
    ),
  },
  {
    label: "Lower Extremities",
    Component: (
      <GridContainer container spacing={1}>
        <FieldGrid item xs={12}>
          <StyledBox>
            Client Sitting Balance:
            <Field
              name="sitting.balance"
              render={({ field }) => (
                <SelectDropDown
                  options={balanceOptions}
                  placeholder="Select Client's Balance Condition"
                  field={field}
                  setFieldTouched={useFormikContext().setFieldTouched}
                />
              )}
            />
          </StyledBox>
        </FieldGrid>

        <FieldGrid item xs={4} >
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
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Position (Frontal View)" />
          
          <LRThreeItemCheckBox 
            imgItem="Position"
            item="PositionABDuction"
            page="sitting.lowerExtremities.position.condition"
          />
          <LRBlockRadio item="HipsPosition_Rotation" page="sitting.lowerExtremities.position.rotation" />
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Windswept (Frontal View)" />
          <ThreeItemCheckBox
            item="Windswept"
            page="sitting.lowerExtremities.windswept"
          />
        </FieldGrid>
        
        <MATComments title="Sitting Comments" commentName="sitting.comments" />
      </GridContainer>
    ),
  },
  {
    label: "Head and Neck",
    Component: (
      <GridContainer container spacing={1}>
        <FieldGrid item xs={12}>
          <StyledBox>
            Client Sitting Balance:
            <Field
              name="sitting.balance"
              render={({ field }) => (
                <SelectDropDown
                  options={balanceOptions}
                  placeholder="Select Client's Balance Condition"
                  field={field}
                  setFieldTouched={useFormikContext().setFieldTouched}
                />
              )}
            />
          </StyledBox>
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Cervical curve (Side View)" />
          <DescriptionField title="Describe:" page="sitting.headNeck.cervicalCurve" />
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Neck Position (Frontal View)" />
          <DescriptionField title="Describe:" page="sitting.headNeck.neckPosition" />
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Control" />
          <DescriptionField title="Describe:" page="sitting.headNeck.control" />
        </FieldGrid>

        <MATComments title="Sitting Comments" commentName="sitting.comments" />
      </GridContainer>
    ),
  },
  {
    label: "Upper Limbs",
    Component: (
      <GridContainer container spacing={1}>
        <FieldGrid item xs={12}>
          <StyledBox>
            Client Sitting Balance:
            <Field
              name="sitting.balance"
              render={({ field }) => (
                <SelectDropDown
                  options={balanceOptions}
                  placeholder="Select Client's Balance Condition"
                  field={field}
                  setFieldTouched={useFormikContext().setFieldTouched}
                />
              )}
            />
          </StyledBox>
        </FieldGrid>
        
        <FieldGrid item xs={4} >
          <MatPageHeaders title="Shoulder Positioning" />
          <ThreeItemCheckBox2
            item="UpperLimbsShoulderPositioning"
            page="sitting.upperLimbs.shoulderPosition.condition"
          />
          <DescriptionField title="Describe:" page="sitting.upperLimbs.shoulderPosition.description" />
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Elbow and Forearm Position" />
          <DescriptionField title="Describe:" page="sitting.upperLimbs.elbowForearmPosition" />
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title=" Hand and Wrist Positioning" />
          <DescriptionField title="Describe:" page="sitting.upperLimbs.handWristPosition" />
        </FieldGrid>
        
        <MATComments title="Sitting Comments" commentName="sitting.comments" />
      </GridContainer>
    ),
  },
];

const Sitting = ({values, errors}) => {
  return (
    <Box width="95%" margin="30px auto" bgcolor="#FFFFFF" borderRadius="10px">
        <Grid item xs={12}
          sx={{
            bgcolor: "#CCD2D3", 
            padding:"5px 0",
            borderRadius: "10px 10px 0px 0px",
            textAlign:"center"
        }}>
          <Typography fontSize="2.5rem" fontWeight="bold" color="#1D4D93">Sitting</Typography>
        </Grid>
      <Box padding="30px">
        <MatTabs tabs={tabs} values={values} errors={errors}/>
      </Box>
    </Box>
  );
};

export default Sitting;
