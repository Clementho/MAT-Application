import React from "react";
import { Box, Typography, Grid, styled } from "@mui/material";
import MatTabs from "../../Components/MatTabs";
import ThreeItemCheckBox from "../../Components/ThreeItemCheckBox";
import ThreeItemCheckBox2 from "../../Components/ThreeItemCheckBox2";
import HorizontalAngle2 from "../../Components/HorizontalAngle2";
import MatPageHeaders from "../../Components/MatPageHeaders";
import MATComments from "../../Components/MATComments";
import BlockRadio from "../../Components/BlockRadio";
import DescriptionField from "../../Components/DescriptionField";
import ResponsiveText from "../../Components/ResponsiveText";

const GridContainer = styled(Grid)({
  "& > div:nth-child(2)": {
    borderWidth: "3px 0"
  }
})

const FieldGrid = styled(Grid)({
  border: "3px solid #1D4D93",
  padding: "20px 10px",
})

const tabs = [
  {
    label: "Pelvis",
    Component: (
      <GridContainer container spacing={1} >      
        <FieldGrid item xs={4} >
          <MatPageHeaders title="Tilt" />
          <ThreeItemCheckBox
            item="PelvisTilt_Supine"
            page="supine.pelvis.tilt.condition"
          />
          <Box style={{padding: '5%' }}>
            <BlockRadio 
              item="Flexibility"
              page="supine.pelvis.tilt.flexibility"
            />
          </Box>
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Obliquity" />
          <ThreeItemCheckBox 
            item="PelvisObliquity"
            page="supine.pelvis.obliquity.condition"
          />

          <Box style={{padding: '5%' }}>
            <BlockRadio 
              item="Flexibility"
              page="supine.pelvis.obliquity.flexibility"
            />
          </Box>
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Rotation" />
          <ThreeItemCheckBox
            item="PelvisRotation"
            page="supine.pelvis.rotation.condition"
          />

          <Box style={{padding: '5%' }}>
            <BlockRadio 
              item="Flexibility"
              page="supine.pelvis.rotation.flexibility"
            />
          </Box>
        </FieldGrid>

        <MATComments title="Supine Comments" commentName="supine.comments" />
      </GridContainer>
      
    ),
  },
  {
    label: "Trunk",
    Component: (
      <GridContainer container spacing={1}>
        <FieldGrid item xs={4} >
          <MatPageHeaders title="Anterior/Posterior" />

          <ThreeItemCheckBox
            item="TrunkAnterior/Posterior_Supine"
            page="supine.trunk.antPosterior.condition"
          />

          <Box style={{padding: '5%' }}>
            <BlockRadio 
              item="Flexibility"
              page="supine.trunk.antPosterior.flexibility"
            />
          </Box>
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Scoliosis" />

          <ThreeItemCheckBox
            item="TrunkScoliosis"
            page="supine.trunk.scoliosis.condition"
          />

          <Box style={{padding: '5%' }}>
            <BlockRadio 
              item="Flexibility"
              page="supine.trunk.scoliosis.flexibility"
            />
          </Box>
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Rotation" />
          <ThreeItemCheckBox
            item="TrunkRotation_Supine"
            page="supine.trunk.rotation.condition"
          />

          <Box style={{padding: '5%' }}>
            <BlockRadio 
              item="Flexibility"
              page="supine.trunk.rotation.flexibility"
            />
          </Box>
        </FieldGrid>
        
        <MATComments title="Supine Comments" commentName="supine.comments" />
      </GridContainer>
    ),
  },

  {
    label: "Lower Extremities",
    Component: (
      <GridContainer container spacing={1} >
        <FieldGrid item xs={12}>
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

        </FieldGrid>

        <MATComments title="Supine Comments" commentName="supine.comments" />
        
      </GridContainer>
    ),
  },

  
  {
    label: "Head and Neck",
    Component: (
      <GridContainer container spacing={1}>
        <FieldGrid item xs={4} >
          <MatPageHeaders title="Cervical Curve" />

          <label style={{padding: '2%', fontSize: "1.2em", fontWeight: "500"}}>Resting Posture: </label>
          <Box marginTop="20px">
            <BlockRadio 
              item="HeadNeckCervicalCurve_Supine"
              page="supine.headNeck.cervicalCurve"
            />
          </Box>
        </FieldGrid>

        <FieldGrid item xs={4} >
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
        </FieldGrid>

        <FieldGrid item xs={4} >
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
        </FieldGrid>

        <MATComments title="Supine Comments" commentName="supine.comments" />
      </GridContainer>
    ),
  },
  {
    label: "Upper Limbs",
    Component: (
      <GridContainer container spacing={1}>
        <FieldGrid item xs={4} >
          <MatPageHeaders title="Shoulder PROM" />

          <ThreeItemCheckBox2
            item="UpperLimbsShoulderPROM"
            page="supine.upperLimbs.shoulderPROM"
          />
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Elbow and Forearm PROM" />
          <DescriptionField title="Description: " page="supine.upperLimbs.elbowForearmPROM" />       
        </FieldGrid>

        <FieldGrid item xs={4} >
          <MatPageHeaders title="Wrist and Hand" />
          <DescriptionField title="Description: " page="supine.upperLimbs.wristHand" />         
        </FieldGrid>

        <MATComments title="Supine Comments" commentName="supine.comments" />
      
      </GridContainer>
      
    ),
    
  },
];
const Supine = ({values, errors}) => {

  return (
    <Box width="95%" margin="30px auto" bgcolor="#FFFFFF" borderRadius="10px">
       <Grid item xs={12}
          sx={{
            bgcolor: "#CCD2D3", 
            padding:"5px 0",
            borderRadius: "10px 10px 0px 0px",
            textAlign:"center"
        }}>
          <Typography fontSize="2rem" fontWeight="bold" color="#1D4D93">Supine</Typography>
        </Grid>
      <Box padding='30px'>
      <MatTabs tabs={tabs} values={values} errors={errors}/>
      </Box>
      
    </Box>
  );
};

            
export default Supine;
