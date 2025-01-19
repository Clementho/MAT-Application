import React from "react";
import {
  Box,
  Modal,
  List,
  ListItem,
  Button,
  Grid,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import PersonIcon from "@mui/icons-material/Person";
import CurrentSeatIcon from "@mui/icons-material/Accessible";
import SupineIcon from "@mui/icons-material/AirlineSeatFlat";
import SittingIcon from "@mui/icons-material/AirlineSeatLegroomNormal";
import ReviewIcon from "@mui/icons-material/Assignment";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

import useMediaQuery from '@mui/material/useMediaQuery';

const MATSteps = [
  { key: "patient", icon: <PersonIcon />, text: "Client Details" },
  { key: "currentSeating", icon: <CurrentSeatIcon />, text: "Current Seating" },
  { key: "supine", icon: <SupineIcon />, text: "Supine" },
  { key: "sitting", icon: <SittingIcon />, text: "Sitting" },
  { icon: <ReviewIcon />, text: "Review" },
];

const Sidebar = ({ currentStep, setInMat, values, errors, validateForm, updateCurrentStep }) => {
  const [visitedSteps, setVisitedSteps] = useState([]); // visited steps
  const [completedSteps, setCompletedSteps] = useState([]); // steps completed, no empties
  const [stepsContinued, setStepsContinued] = useState([]); // steps not completed but 'continued' in modal
  const [invalidSteps, setInvalidSteps] = useState([]); // steps with invalid values
  const [initialMount, setInitialMount] = useState(true); //initialize or not

  const [stepInvalids, setStepInvalids] = useState({}); // error messages present for a given step
  const [invalidModalMessage, setInvalidModalMessage] = useState(""); // formatted invalid error messages to display in modal

  const [nextStepIndex, setNextStepIndex] = useState(-1);
  const [showNextButton, setShowNextButton] = useState(false);

  const currentStepKey = MATSteps[currentStep].key; //access key for step values

  const isSmallScreen = useMediaQuery('(max-height:600px)');

  // *GET EMPTY VALUES IN FORMIK VALUES*
  const findEmptyValues = (values, path) => {
    const emptyValueKeys = [];

    const findEmptyFields = (obj, prefix = "") => {
      for (const key in obj) {
        const fullPath = prefix ? `${prefix}.${key}` : key;
        const fieldPath = path ? `${path}.${key}` : key;

        if (typeof obj[key] === "object") {
          findEmptyFields(obj[key], fullPath); // Recursively search nested objects
        } else if (obj[key] === "") {
          emptyValueKeys.push(fieldPath); // Collect keys with empty string values
        }
      }
    };
    findEmptyFields(values);

    return emptyValueKeys;
  };

  // *GET NON-EMPTY VALUES IN FORMIK VALUES*
  const findNonEmptyValues = (values, path) => {
    const nonEmptyValueKeys = [];

    const findNonEmptyFields = (obj, prefix = "") => {
      for (const key in obj) {
        const fullPath = prefix ? `${prefix}.${key}` : key;
        const fieldPath = path ? `${path}.${key}` : key;

        if (typeof obj[key] === "object") {
          findNonEmptyFields(obj[key], fullPath); // Recursively search nested objects
        } else if (obj[key] !== "") {
          nonEmptyValueKeys.push(fieldPath); // Collect keys with non-empty values
        }
      }
    };
    findNonEmptyFields(values);

    return nonEmptyValueKeys;
  };

  // *GET INVALID VALUES IN FORMIK VALUES*
  const findInvalidValues = (errors, path) => {
    const invalidValueKeys = [];

    const findInvalidField = (obj, prefix = "") => {
      for (const key in obj) {
        const fullPath = prefix ? `${prefix}.${key}` : key;
        const fieldPath = path ? `${path}.${key}` : key;

        if (typeof obj[key] === "object") {
          findInvalidField(obj[key], fullPath); // Recursively search nested objects
        } else if (obj[key] !== "") {
          invalidValueKeys.push(fieldPath); // Collect keys with invalid values
        }
      }
    }

    findInvalidField(errors);

    return invalidValueKeys;
  }

  // *GET ERROR MESSAGES IN FORMIK ERRORS*
  const getErrorMessages = (errors) => {
    const valueKeyToTabName = {
      "pelvis": "Pelvis",
      "trunk": 'Trunk',
      "hips": 'Hips',
      "kneesFeet": "Knees and Feet",
      "headNeck": "Head and Neck",
      "upperLimbs": "Upper Limbs",
      "lowerExtremities": "Lower Extremities",
      "personalInfo": "Personal Info",
      "medicalInfo": "Medical Info"
    };

    // VALUES ARE STORED AS OBJECTS WITH ARRAYS CONTAINING EACH TAB'S ERROR MESSAGE OBJECT
    const errorValueKeys = {}

    // *GET AND FORMAT ERROR MESSAGES, CATEGORIES AND PATHNAMES*
    const getErrorValues = (obj, prefix = "") => {
      for(const key in obj){
        const fullPath = prefix ? `${prefix}.${key}` : key;

        if(typeof obj[key] === 'object'){
          getErrorValues(obj[key], fullPath);

        }else{
          const fields = fullPath.split(".")
          const fieldTab = valueKeyToTabName[fields[0]];

          if(!Object.keys(errorValueKeys).includes(fieldTab)) errorValueKeys[fieldTab] = []
          
          const capitalisedKeys = (fields.slice(1)).map(key => key.charAt(0).toUpperCase() + key.slice(1))

          const errorField = {
            errorPath: `${capitalisedKeys.join(" - ")}`,
            errorMessage: `${obj[key]}`
          }

          errorValueKeys[fieldTab].push(errorField);
        }
  
      }
    }

    getErrorValues(errors[currentStepKey]);
    setStepInvalids(errorValueKeys);
  }
  

  // *SIDEBAR* click handler
  const handleStepClick = (stepIndex) => {
    if (stepIndex === currentStep) return; // same step, do nothing

    // Validate form every time a different step is clicked
    validateForm().then(() => {
      // Check if the current step is completed based on empty & invalid values
      const emptyValues = findEmptyValues(values[currentStepKey]);
      const invalidValues = findInvalidValues(errors[currentStepKey]);

      if (
        (emptyValues.length === 0 &&
        invalidValues.length === 0) ||
        completedSteps.includes(currentStep) ||
        stepsContinued.includes(currentStep)
      ) {
        // If completed or no empties/invalids, go to new step
        updateCurrentStep(stepIndex);
      } else {
        // Open confirm modal
        setNextStepIndex(stepIndex);
        //console.log("Opening modal. nextStepIndex:", stepIndex);
      }
      setShowNextButton(false);
    });

  };

  // *STEP COMPLETION CHECK* check if a step is complete (no empties & no invalids)
  const isStepComplete = (stepIndex) => {
    const stepValues = values[MATSteps[stepIndex].key];
    const stepErrors = errors[MATSteps[stepIndex].key];

    // exclude 'comments'
    const stepValuesWithoutComments = { ...stepValues };
    delete stepValuesWithoutComments.comments;

    const stepEmptyValues = findEmptyValues(stepValuesWithoutComments);
    const stepInvalidValues = findInvalidValues(stepErrors);

    return stepEmptyValues.length === 0 && stepInvalidValues.length === 0;
  };

  // *STEP VISITATION CHECK* check if a step is visited (has non-empty values)
  const isStepVisited = (stepIndex) => {
    const stepValues = values[MATSteps[stepIndex].key];
    // exclude 'comments'
    const stepValuesWithoutComments = { ...stepValues };
    delete stepValuesWithoutComments.comments;

    const stepEmptyValues = findNonEmptyValues(stepValuesWithoutComments);

    return stepEmptyValues.length > 0;
  };

  // *STEP INVALID CHECK* check if a step contains invalids
  const isStepInvalid = (stepIndex) => {
    const stepErrors = errors[MATSteps[stepIndex].key];

    const stepInvalidValues = findInvalidValues(stepErrors);

    return stepInvalidValues.length > 0;
  }

  // *INITIALIZE* set complete/visited based on the initial form values
  useEffect(() => {
    const initializeFormState  = async () => {
      const initialCompletedSteps = [];
      const initialVisitedSteps = [];
      const initialInvalidSteps = [];

      // Validate form upon first initialisation
      await validateForm().then(() => {
      
        // Iterate through each step (exclude Review page) and check for completed/incomplete/invalid steps
        // If true, add the step to the respective initial step status array
        for (let stepIndex = 0; stepIndex < 4; stepIndex++) {
          if (isStepComplete(stepIndex)) {
            initialCompletedSteps.push(stepIndex);
          }
          if (isStepVisited(stepIndex)) {
            initialVisitedSteps.push(stepIndex);
          }
          if (isStepInvalid(stepIndex)) {
            initialInvalidSteps.push(stepIndex);
          }
        }

        if (initialVisitedSteps.length > 0) {
          // Add index 4 manually (review step)
          initialVisitedSteps.push(4);
        } else {
          initialVisitedSteps.push(currentStep);
        }

        setCompletedSteps(initialCompletedSteps);
        setInvalidSteps(initialInvalidSteps);
        setVisitedSteps(initialVisitedSteps);
        setInitialMount(false); // Set initial mount to false after the first render
      })
    }

    initializeFormState();
  }, []);

  // *DEBUG* check steps arrays
  useEffect(() => {
    // This will run whenever completedSteps, visitedSteps, invalidSteps or stepInvalids changes
    // console.log("visitedSteps updated: ", visitedSteps);
    // console.log("completedSteps updated: ", completedSteps);
    // console.log("invalidSteps updated:", invalidSteps);
    // console.log("stepInvalids updated:", stepInvalids)
  }, [completedSteps, visitedSteps, invalidSteps, stepInvalids]);

  // *SIDEBAR* complete/incomplete/invalid handler
  useEffect(() => {
    if (!initialMount) {
      handleInvalidSteps();
      handleCompletedSteps();
      handleVisitedSteps();

      getErrorMessages(errors);
      const modalMessage = createInvalidModalMessage();
      setInvalidModalMessage(modalMessage);
    }
  }, [values, errors, currentStep, invalidSteps, completedSteps, visitedSteps, initialMount]);
  
  // Function to handle invalid steps
  const handleInvalidSteps = () => {
    // If current step is invalid & not recorded in invalidSteps array
    // Add current step to invalidSteps array & hide next button
    if (isStepInvalid(currentStep) && !invalidSteps.includes(currentStep)) {
      setInvalidSteps([...invalidSteps, currentStep]);
      setShowNextButton(false);

    // Otherwise remove current step from invalidSteps array
    } else if (!isStepInvalid(currentStep) && invalidSteps.includes(currentStep)) {
      const updatedInvalidSteps = invalidSteps.filter(step => step !== currentStep);
      setInvalidSteps(updatedInvalidSteps);
    }
  };
  
  // Function to handle completed steps
  const handleCompletedSteps = () => {
    // If current step is complete & not recorded in completedSteps array & is not the Review page
    // Add current step to completedSteps array & show next button
    if (isStepComplete(currentStep) && !completedSteps.includes(currentStep) && currentStep !== 4) {
      setCompletedSteps([...completedSteps, currentStep]);
      setShowNextButton(true);

    // Otherwise remove current step from completedSteps array & hide next button
    } else if (!isStepComplete(currentStep) && completedSteps.includes(currentStep)) {
      const updatedCompletedSteps = completedSteps.filter(step => step !== currentStep);
      setCompletedSteps(updatedCompletedSteps);
      setShowNextButton(false);
    }
  };
  
  // Function to handle visited steps
  const handleVisitedSteps = () => {
    if (!visitedSteps.includes(currentStep)) {
      setVisitedSteps([...visitedSteps, currentStep]);
    }
  };

  // *NEXT BUTTON* handler, button rendered on completion
  const handleNextClick = () => {
    if (currentStep < MATSteps.length - 1) {
      // Check if it's not the last step
      const nextStep = currentStep + 1;
      updateCurrentStep(nextStep);
      setShowNextButton(false);
    }
  };

  // *CONFIRM MODAL* handlers
  const handleConfirmNavigation = () => {
    if (nextStepIndex !== -1) {
      // Mark the current step as completed if it's not already completed
      if (!stepsContinued.includes(currentStep)) {
        // Add the current step to the stepsContinued array
        setStepsContinued([...stepsContinued, currentStep]);
      }
      // Navigate to the new step
      updateCurrentStep(nextStepIndex);
    }
    // Reset the next step index
    setNextStepIndex(-1);
  };

  // Function to create messages to inform user of invalid values for a given step
  // Message presented in a list format, categorised by tabs (Hips, Pelvis, etc)
  const createInvalidModalMessage = () => {
    const invalidTabs = Object.keys(stepInvalids);

    return (
      <>
        {invalidTabs.map((tab) => (
          <>
            <Typography 
              key={tab}
              sx={{
                fontWeight: "bold",
                fontSize: "0.9em",
                marginTop: "20px"
              }}>{tab}</Typography>
            <ul>
              {stepInvalids[tab].map((error, errorIndex) => (
                <>
                <li style={{ fontSize: "0.8em"}} key={errorIndex}>{error.errorPath}:</li>
                <Typography sx={{
                  marginBottom: "15px",
                  color: "#ED8221"
                }}>{error.errorMessage}</Typography>
                </>
              ))}
            </ul>
          </>
          )
        )}
      </>
    )
  }

  const handleCloseModal = () => {
    setNextStepIndex(-1); // Reset the next step index
    setInvalidModalMessage("");
  };

  // *EXIT MODAL* handlers
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleExitMat = () => {
    setInMat(false);
    navigate("/");
  };

  // *CIRCLE ICON* handler, prioritise 'Invalid'
  const getColorForStep = (stepIndex) => {
    const isInVisitedSteps = visitedSteps.includes(stepIndex);
    const isInCompletedSteps = completedSteps.includes(stepIndex);
    const isInInvalidSteps = invalidSteps.includes(stepIndex);

    if (isInInvalidSteps) {
      return "#FF1800"; // Invalid color
    } else if (isInCompletedSteps) {
      return "#A6C933"; // Completed color
    } else if (isInVisitedSteps) {
      return "#ef8f37"; // Incomplete color
    } else {
      return "inherit"; // Default color
    }
  };

  return (
    <Grid item xs={2}>
      <Grid
        item
        xs={2}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "20%",
          backgroundColor: "#39A9E0",
          zIndex: -1,
        }}
      />

      <Grid
        item
        xs={2}
        sx={{
          display: "flex",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <List disablePadding style={{ width: "100%" }}>
          <Grid
            container
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                margin: isSmallScreen ? "20vh 0 2vh" : "10vh 0 5vh",
                columnGap: "10px",
                fontSize: isSmallScreen ? "1vw" : "1.2vw",
                fontWeight: "bold",
                borderRadius: "10px",
                bgcolor: "#E72971",
                "&:hover": {
                  bgcolor: "#e6407f",
                },
              }}
            >
              <ArrowCircleLeftRoundedIcon fontSize= {isSmallScreen ? "small" : "large"}/>
              Exit MAT
            </Button>

            {MATSteps.map((step, index) => (
              <ListItem
                key={index}
                className={currentStep === index ? "active" : ""}
                onClick={() => {
                  handleStepClick(index);
                }}
                sx={{
                  height: "10vh",
                  padding: "7% 0% 7% 6%",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#007DBB",
                  },
                  "&.active": {
                    bgcolor: "#1D4D93",
                  },
                }}
              >
                <Grid item textAlign="center" xs={2}>
                  <Typography
                    sx={{ marginBottom: "-3px", "& svg": { fontSize: isSmallScreen ? "1.5vw" : "2vw" } }}
                  >
                    {step.icon}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      fontSize: isSmallScreen ? "1vw" : "1.3vw",
                      fontWeight: "bold",
                      padding: "0 10px",
                    }}
                  >
                    {step.text}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{
                    "& svg": {
                      fontSize: "15px",
                      color: getColorForStep(index),
                    },
                  }}
                >
                  <CircleIcon />
                </Grid>
              </ListItem>
            ))}
          </Grid>

          {/*Modal for Exiting MAT Confirmation */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                textAlign: "center",
                bgcolor: "background.paper",
                border: "2px solid #1D4D93",
                borderRadius: "15px",
                boxShadow: 24,
                padding: "50px 40px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.8em",
                  fontWeight: "bold",
                }}
              >
                Exit MAT Assessment?
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.1em",
                  fontWeight: "500",
                  color: "#A6C933",
                }}
              >
                Your progress has been saved
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  marginTop: "30px",
                }}
              >
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.1em",
                    borderRadius: "15px",
                    padding: "10px 50px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleExitMat}
                  variant="contained"
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.1em",
                    bgcolor: "#1C4D91",
                    color: "#FFFFFF",
                    borderRadius: "15px",
                    padding: "10px 50px",
                  }}
                >
                  Save & Exit MAT
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Modal for confirming navigation when section is invalid */}
          <Modal
            open={
              nextStepIndex !== -1 &&
              Object.entries(stepInvalids).length !== 0
            }
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                bgcolor: "background.paper",
                border: "2px solid #1D4D93",
                borderRadius: "15px",
                boxShadow: 24,
                padding: "20px 40px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.4em",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#FF1800",
                }}
              >
                Invalid Values Found!
              </Typography>

              <Box sx={{
                overflow: "auto",
                maxHeight: 400,
                margin: "10px 0"
              }}>
              <Typography
                sx={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                }}
              >
                {invalidModalMessage}
              </Typography>
              </Box>

              <Box textAlign="center">
              <Typography
                sx={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                }}
              >
                Continue anyway?
              </Typography>

              <Typography
                sx={{
                  fontSize: "1em",
                  fontWeight: "500",
                  marginTop: "10px",
                }}
              >
                You can still go back if you need to
              </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  marginTop: "20px",
                }}
              >
                <Button
                  onClick={handleCloseModal}
                  variant="outlined"
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.1em",
                    borderRadius: "15px",
                    padding: "10px 50px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmNavigation}
                  variant="contained"
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.1em",
                    bgcolor: "#1C4D91",
                    color: "#FFFFFF",
                    borderRadius: "15px",
                    padding: "10px 50px",
                  }}
                >
                  Continue
                </Button>
              </Box>
              
            </Box>
          </Modal>
          
          {/* Modal for confirming navigation when section is incomplete */}
          <Modal
            open={
              nextStepIndex !== -1 &&
              Object.entries(stepInvalids).length === 0
            }
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                textAlign: "center",
                bgcolor: "background.paper",
                border: "2px solid #1D4D93",
                borderRadius: "15px",
                boxShadow: 24,
                padding: "20px 40px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                }}
              >
                This section is missing values.
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                }}
              >
                Continue anyway?
              </Typography>

              <Typography
                sx={{
                  fontSize: "1em",
                  fontWeight: "500",
                  marginTop: "10px",
                }}
              >
                You can still go back if you need to
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  marginTop: "20px",
                }}
              >
                <Button
                  onClick={handleCloseModal}
                  variant="outlined"
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.1em",
                    borderRadius: "15px",
                    padding: "10px 50px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmNavigation}
                  variant="contained"
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.1em",
                    bgcolor: "#1C4D91",
                    color: "#FFFFFF",
                    borderRadius: "15px",
                    padding: "10px 50px",
                  }}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Modal>

          

          {/* Conditionally render the "Next" button */}
          {showNextButton && (
            <Button
              variant="contained"
              onClick={handleNextClick}
              sx={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                columnGap: "10px",
                fontSize: "1.2vw",
                fontWeight: "bold",
                borderRadius: "10px",
                bgcolor: "#38A6DE",
                "&:hover": {
                  bgcolor: "#007DBB",
                },
                zIndex: 1, // Ensure the button is above other content
              }}
            >
              <ArrowCircleRightRoundedIcon fontSize="large" />
              Next
            </Button>
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default Sidebar;