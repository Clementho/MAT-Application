import React from "react";

import PersonalDets from '../ReviewSections/PersonalDets';
import MedicalDets from '../ReviewSections/MedicalDets';

import PelvisCurr from '../ReviewSections/CurrentSeatingSystem/Pelvis';
import TrunkCurr from '../ReviewSections/CurrentSeatingSystem/Trunk';
import HipsCurr from '../ReviewSections/CurrentSeatingSystem/Hips';
import KneesFeetCurr from '../ReviewSections/CurrentSeatingSystem/KneesFeet';
import HeadNeckCurr from '../ReviewSections/CurrentSeatingSystem/HeadNeck';
import UpLimbsCurr from '../ReviewSections/CurrentSeatingSystem/UpperLimbs';

import PelvisSup from '../ReviewSections/Supine/Pelvis';
import TrunkSup from '../ReviewSections/Supine/Trunk';
import LowerExSup from '../ReviewSections/Supine/LowerEx';
import HeadNeckSup from '../ReviewSections/Supine/HeadNeck';
import UpLimbsSup from '../ReviewSections/Supine/UpperLimbs';

import PelvisSit from '../ReviewSections/Seated/Pelvis';
import TrunkSit from '../ReviewSections/Seated/Trunk';
import LowerExSit from '../ReviewSections/Seated/LowerEx';
import HeadNeckSit from '../ReviewSections/Seated/HeadNeck';
import UpLimbsSit from '../ReviewSections/Seated/UpperLimbs';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Typography, Grid, Box, Divider, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

const Review = ({ values, type }) => {

    const sections = [
      {
        title: "Client Details",
        content: [
          {
            title: "Personal Info",
            component: <PersonalDets values={values} type={type} />,
          },
          {
            title: "Medical Info",
            component: <MedicalDets values={values} type={type}/>,
          },
        ],
      },
      {
        title: "Current Seating Assessment",
        content: [
          {
            title: "Pelvis",
            component: <PelvisCurr values={values} type={type} />,
          },
          {
            title: "Trunk",
            component: <TrunkCurr values={values} type={type}/>,
          },
          {
            title: "Hips",
            component: <HipsCurr values={values} type={type}/>,
          },
          {
            title: "Knees and Feet",
            component: <KneesFeetCurr values={values} type={type}/>,
          },
          {
            title: "Head and Neck",
            component: <HeadNeckCurr values={values} type={type}/>,
          },
          {
            title: "Upper Limbs",
            component: <UpLimbsCurr values={values} type={type}/>,
          },
        ],
        comments: values.currentSeating.comments,
      },
      {
        title: "Supine Assessment",
        content: [
          {
            title: "Pelvis",
            component: <PelvisSup values={values} type={type}/>,
          },
          {
            title: "Trunk",
            component: <TrunkSup values={values} type={type} />,
          },
          {
            title: "Lower Extremities",
            component: <LowerExSup values={values} type={type}/>,
          },
          {
            title: "Head and Neck",
            component: <HeadNeckSup values={values} type={type}/>,
          },
          {
            title: "Upper Limbs",
            component: <UpLimbsSup values={values} type={type}/>,
          },
        ],
        comments: values.supine.comments,
      },
      {
        title: "Sitting Assessment",
        content: [
          {
            title: "Pelvis",
            component: <PelvisSit values={values} type={type}/>,
          },
          {
            title: "Trunk",
            component: <TrunkSit values={values} type={type}/>,
          },
          {
            title: "Lower Extremities",
            component: <LowerExSit values={values} type={type} />,
          },
          {
            title: "Head and Neck",
            component: <HeadNeckSit values={values} type={type}/>,
          },
          {
            title: "Upper Limbs",
            component: <UpLimbsSit values={values} type={type}/>,
          },
        ],
        comments: values.sitting.comments,
      },
    ];
  
    return (
        <Box width="95%" margin="30px auto" bgcolor="#FFFFFF" borderRadius="10px">
          <Grid item xs={12}
            sx={{
                bgcolor: "#CCD2D3", 
                padding:"5px 0",
                borderRadius: "10px 10px 0px 0px",
                textAlign:"center"
            }}>
          <Typography fontSize="2rem" fontWeight="bold" color="#1D4D93">MAT Evaluation Review</Typography>
        </Grid>
    
          <Grid item xs={12} padding="10px">
            {sections.map((section, index) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{color:"#FFFFFF", fontSize: "2em"}}/>}
                  sx={{
                    bgcolor: "#38A6DE",
                    color: "#FFFFFF",
                    padding: "10px 20px",
                  }}
                >
                  <Typography
                  variant="h5"
                  sx={{
                      fontWeight: "bold",
                      fontSize: "1.6em",
                      letterSpacing: "1px",
                      textAlign: "center",
                  }}
                  >{section.title}</Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    fontSize: "1.2em",
                    padding: "30px",
                  }}
                >
                   {section.content.map((subSection) => (
                    <>
                    <Typography 
                        variant="h6"
                        sx={{
                            fontWeight: "bolder",
                            fontSize: "1.2em",
                        }}
                    >{subSection.title}</Typography>
                    {subSection.component}
                    <Divider 
                      sx={{ 
                        border: "2px solid #B1ACAC",
                        margin: "25px 0",
                    }}/>
                    </>
                ))}
                {section.title !== sections[0].title && (
                    <>
                      <Typography 
                      sx={{ 
                        fontSize: "1.2em",
                        fontWeight: "bold",
                      }}>
                        {section.title} Comments
                      </Typography>
                      <Typography sx={{
                        fontSize: "1.1em",
                        margin: "15px 0",
                      }}>
                        {section.comments}
                      </Typography>
                    </>
                )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Box>
      );
  };
  

export default Review;