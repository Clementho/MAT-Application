import React from "react";
import { Field } from "formik";
import { Box, Typography, Grid, styled } from "@mui/material";
import MatTabs from "../../Components/MatTabs";
import ThreeItemCheckBox from "../../Components/ThreeItemCheckBox";
import ThreeItemCheckBox2 from "../../Components/ThreeItemCheckBox2";
import LeftRightAngle from "../../Components/LeftRightAngle";
import MatPageHeaders from "../../Components/MatPageHeaders";
import LRBlockRadio from "../../Components/LRBlockRadio";
import MATComments from "../../Components/MATComments";
import BlockRadio from "../../Components/BlockRadio";
import DescriptionField from "../../Components/DescriptionField";
import ResponsiveText from "../../Components/ResponsiveText";
import LRThreeItemCheckBox from "../../Components/LRThreeItemCheckBox";

const GridContainer = styled(Grid)({
  "& > div:nth-child(2)": {
    borderWidth: "3px 0"
  }
})

const FieldGrid = styled(Grid)({
  border: "3px solid #1D4D93",
  padding: "20px 10px",
})

const StyledLabel = styled("label")({
  display: "flex",
  alignItems: "center",
  width: "90%",
  margin: "auto",
})

const tabs = [
  {
    label: "Pelvis",
    Component: (  
      <GridContainer container>
        <FieldGrid item xs={4}>
          <MatPageHeaders title="Tilt (Side view)"/>
          <ThreeItemCheckBox
            item="PelvisTilt"
            page="currentSeating.pelvis.tilt"
          />
        </FieldGrid>

        <FieldGrid item xs={4}>
          <MatPageHeaders title="Obliquity (Frontal View)"/>
          <ThreeItemCheckBox
            item="PelvisObliquity"
            page="currentSeating.pelvis.obliquity"
          />
        </FieldGrid>

        <FieldGrid item xs={4}>
        <MatPageHeaders title="Rotation (Top View)"/>
          <ThreeItemCheckBox
            item="PelvisRotation"
            page="currentSeating.pelvis.rotation"
          />
        </FieldGrid>
        
        <MATComments title="Current Seating Comments" commentName="currentSeating.comments" />
      </GridContainer>
    ),
  },
  {
    label: "Trunk",
    Component: (
      <GridContainer container >
        <FieldGrid item xs={4}>
        <MatPageHeaders title="Anterior/Posterior"/>
          <ThreeItemCheckBox
            item="TrunkAnterior/Posterior"
            page="currentSeating.trunk.antPosterior"
          />
        </FieldGrid>

        <FieldGrid item xs={4}>
        <MatPageHeaders title="Scoliosis (Frontal View)"/>
          <ThreeItemCheckBox
            item="TrunkScoliosis"
            page="currentSeating.trunk.scoliosis"
          ></ThreeItemCheckBox>
        </FieldGrid>

        <FieldGrid item xs={4}>
        <MatPageHeaders title="Rotation (Top View)"/>

          <ThreeItemCheckBox
            item="TrunkRotation"
            page="currentSeating.trunk.rotation"
          ></ThreeItemCheckBox>
        </FieldGrid>

        <MATComments title="Current Seating Comments" commentName="currentSeating.comments" />
      </GridContainer>
    ),
  },
  {
    label: "Hips",
    Component: (
      <GridContainer container >
        <FieldGrid item xs={4} >
        <MatPageHeaders title="Thigh to Trunk Angle"/>
          <Grid container>
            <LeftRightAngle
              name="currentSeating.hips.thighTrunkAngle.leftAngle"
              type="Left"
            />
            <LeftRightAngle
              name="currentSeating.hips.thighTrunkAngle.rightAngle"
              type="Right"
            />
          </Grid>
        </FieldGrid>

        <FieldGrid item xs={4} >
        <MatPageHeaders title="Position (Frontal View)"/>
        
          <LRThreeItemCheckBox 
            imgItem="Position"
            item="PositionABDuction"
            page="currentSeating.hips.position.condition"
          />

          <LRBlockRadio item="HipsPosition_Rotation" page="currentSeating.hips.position.rotation" />
        </FieldGrid>

        <FieldGrid item xs={4} >
        <MatPageHeaders title="Windswept (Frontal View)"/>

          <ThreeItemCheckBox
            item="Windswept"
            page="currentSeating.hips.windswept"
          ></ThreeItemCheckBox>
        </FieldGrid>

        <MATComments title="Current Seating Comments" commentName="currentSeating.comments" />
      </GridContainer>
    ),
  },
  {
    label: "Knees and Feet",
    Component: (
      <GridContainer container >
        <FieldGrid item xs={4} >
          <MatPageHeaders title="Thigh-Lower Leg Angle"/>
          <Grid container>
            <LeftRightAngle
              name="currentSeating.kneesFeet.thighLowerLegAngle.leftAngle"
              type="Left"
            />
            <LeftRightAngle
              name="currentSeating.kneesFeet.thighLowerLegAngle.rightAngle"
              type="Right"
            />
          </Grid>
        </FieldGrid>

        <FieldGrid item xs={4} >
        <MatPageHeaders title="Lower Leg Foot Angle"/>
          <Grid container>
            <LeftRightAngle
              name="currentSeating.kneesFeet.lowerLegFootAngle.leftAngle"
              type="Left"
            />
            <LeftRightAngle
              name="currentSeating.kneesFeet.lowerLegFootAngle.rightAngle"
              type="Right"
            />
            <Grid container marginTop={1}>
              <Grid xs={6}>
                <BlockRadio item="LowerLegFootFlexion" page="currentSeating.kneesFeet.lowerLegFootAngle.leftFlexion" />
              </Grid>

              <Grid item xs={6}>
              <BlockRadio item="LowerLegFootFlexion" page="currentSeating.kneesFeet.lowerLegFootAngle.rightFlexion" />
              </Grid>
            </Grid>

          </Grid>
        </FieldGrid>

        <FieldGrid item xs={4} >
        <MatPageHeaders title="Foot Position"/>
          <Grid container>

            <Grid item xs={6}>
              <Typography sx={{ fontWeight: "bold" }}>Left:</Typography>
              <BlockRadio item="FootPosition" page="currentSeating.kneesFeet.footPosition.leftPosition" />
            </Grid>

            <Grid item xs={6}>
              <Typography sx={{ fontWeight: "bold" }}>Right:</Typography>
              <BlockRadio item="FootPosition" page="currentSeating.kneesFeet.footPosition.rightPosition" />
            </Grid>
          </Grid>
        </FieldGrid>
        
        <MATComments title="Current Seating Comments" commentName="currentSeating.comments" />
      </GridContainer>
    ),
  },
  {
    label: "Head and Neck",
    Component: (
      <GridContainer container >
        <FieldGrid item xs={4} >
          <MatPageHeaders title="Cervical curve (Side View)"/>
          <BlockRadio item="HeadNeckCervicalCurve" page="currentSeating.headNeck.cervicalCurve" />
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title=" Neck Position (Frontal View)"/>
          <StyledLabel>
              <Field 
                  type="radio"
                  name="currentSeating.headNeck.neckPosition"
                  value="Midline" 
                  style={{ 
                      width: "15px", 
                      height: "15px",
                      marginBottom: "0",
                      marginRight: "2%",
                  }}
              />
              <ResponsiveText label="Midline" />
          </StyledLabel>
          <LRBlockRadio item="NeckPosition_Partial" page="currentSeating.headNeck.neckPosition" />
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Control"/>
          <BlockRadio item="Control" page="currentSeating.headNeck.control" />
        </FieldGrid>

        <MATComments title="Current Seating Comments" commentName="currentSeating.comments" />

      </GridContainer>
    ),
  },
  {
    label: "Upper Limbs",
    Component: (
      <GridContainer container>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Shoulder Positioning"/>
          <ThreeItemCheckBox2
            item="UpperLimbsShoulderPositioning"
            page="currentSeating.upperLimbs.shoulderPosition"
          ></ThreeItemCheckBox2>
        </FieldGrid>

        <FieldGrid item xs={4} >
        <MatPageHeaders title="Elbow and Forearm Position"/>
  
          <ThreeItemCheckBox2
            item="UpperLimbsElbowandForearmPosition"
            page="currentSeating.upperLimbs.elbowForearmPosition"
          ></ThreeItemCheckBox2>
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Wrist and Handgrip"/>
          <DescriptionField title="Describe:" page="currentSeating.upperLimbs.wristHandgrip" />
        </FieldGrid>

        <MATComments title="Current Seating Comments" commentName="currentSeating.comments" />

      </GridContainer>
    ),
  },
];

const CurrentSeating = ({values, errors}) => {

  return (
    <Box width="95%" margin="30px auto" bgcolor="#FFFFFF" borderRadius="10px">
      <Grid item xs={12}
        sx={{
          bgcolor: "#CCD2D3", 
          padding:"5px 0",
          borderRadius: "10px 10px 0px 0px",
          textAlign:"center"
      }}>
        <Typography fontSize="2.5rem" fontWeight="bold" color="#1D4D93">Current Seating</Typography>
      </Grid>
      <Box padding="30px">
        <MatTabs tabs={tabs} values={values} errors={errors}/>
      </Box>
    </Box>
  );
};

export default CurrentSeating;
