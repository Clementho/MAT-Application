import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { Formik, Form } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import throttle from "lodash/throttle";
import axios from "axios";
import { Grid, Button, CircularProgress } from "@mui/material";

import Sidebar from "../../Components/Sidebar";
import PatientDetails from "./PatientDetails";
import CurrentSeating from "./CurrentSeating";
import Supine from "./Supine";
import Sitting from "./Sitting";
import Review from "./Review";

import initialValues from "../../FormikUtils/initialValues";
import validationSchema from "../../FormikUtils/validationSchema";

import SnackBar from "../../Components/SnackBar";

const transformGetSaveMatToFormikValues = (getSaveMatData) => {
  const transformedValues = {
    bookingID: getSaveMatData.mat.bookingID || "",
    therapistID: getSaveMatData.mat.therapistID || "",
    atClinic: getSaveMatData.mat.atClinic || false,
    patient: {
      personalInfo: {
        gender: getSaveMatData.mat.patient.personalInfo.gender || "",
        lastName: getSaveMatData.mat.patient.personalInfo.lastName || "",
        firstName: getSaveMatData.mat.patient.personalInfo.firstName || "",
        dob: getSaveMatData.mat.patient.personalInfo.dob || "",
      },
      medicalInfo: {
        diagnosis: getSaveMatData.mat.patient.medicalInfo.diagnosis || "",
        otherMedicalConcerns:
          getSaveMatData.mat.patient.medicalInfo.otherMedicalConcerns || "",
        pastSurgery: getSaveMatData.mat.patient.medicalInfo.pastSurgery || "",
        futureSurgery:
          getSaveMatData.mat.patient.medicalInfo.futureSurgery || "",
        otherInterventions:
          getSaveMatData.mat.patient.medicalInfo.otherInterventions || "",
        orthotics: getSaveMatData.mat.patient.medicalInfo.orthotics || "",
        vision: getSaveMatData.mat.patient.medicalInfo.vision || "",
        hearing: getSaveMatData.mat.patient.medicalInfo.hearing || "",
      },
    },
    currentSeating: {
      pelvis: {
        tilt: getSaveMatData.mat.currentSeating.pelvis.tilt || "",
        obliquity: getSaveMatData.mat.currentSeating.pelvis.obliquity || "",
        rotation: getSaveMatData.mat.currentSeating.pelvis.rotation || "",
      },
      trunk: {
        antPosterior:
          getSaveMatData.mat.currentSeating.trunk.antPosterior || "",
        scoliosis: getSaveMatData.mat.currentSeating.trunk.scoliosis || "",
        rotation: getSaveMatData.mat.currentSeating.trunk.rotation || "",
      },
      hips: {
        thighTrunkAngle: {
          leftAngle:
            getSaveMatData.mat.currentSeating.hips.thighTrunkAngle.leftAngle ||
            0,
          rightAngle:
            getSaveMatData.mat.currentSeating.hips.thighTrunkAngle.rightAngle ||
            0,
        },
        position: {
          condition:
            getSaveMatData.mat.currentSeating.hips.position.condition || "",
          rotation:
            getSaveMatData.mat.currentSeating.hips.position.rotation || "",
        },
        windswept: getSaveMatData.mat.currentSeating.hips.windswept || "",
      },
      kneesFeet: {
        thighLowerLegAngle: {
          leftAngle:
            getSaveMatData.mat.currentSeating.kneesFeet.thighLowerLegAngle
              .leftAngle || 0,
          rightAngle:
            getSaveMatData.mat.currentSeating.kneesFeet.thighLowerLegAngle
              .rightAngle || 0,
        },
        lowerLegFootAngle: {
          leftAngle:
            getSaveMatData.mat.currentSeating.kneesFeet.lowerLegFootAngle
              .leftAngle || 0,
          leftFlexion:
            getSaveMatData.mat.currentSeating.kneesFeet.lowerLegFootAngle
              .leftFlexion || "",
          rightAngle:
            getSaveMatData.mat.currentSeating.kneesFeet.lowerLegFootAngle
              .rightAngle || 0,
          rightFlexion:
            getSaveMatData.mat.currentSeating.kneesFeet.lowerLegFootAngle
              .rightFlexion || "",
        },
        footPosition: {
          leftPosition:
            getSaveMatData.mat.currentSeating.kneesFeet.footPosition
              .leftPosition || "",
          rightPosition:
            getSaveMatData.mat.currentSeating.kneesFeet.footPosition
              .rightPosition || "",
        },
      },
      headNeck: {
        cervicalCurve:
          getSaveMatData.mat.currentSeating.headNeck.cervicalCurve || "",
        neckPosition:
          getSaveMatData.mat.currentSeating.headNeck.neckPosition || "",
        control: getSaveMatData.mat.currentSeating.headNeck.control || "",
      },
      upperLimbs: {
        shoulderPosition:
          getSaveMatData.mat.currentSeating.upperLimbs.shoulderPosition || "",
        elbowForearmPosition:
          getSaveMatData.mat.currentSeating.upperLimbs.elbowForearmPosition ||
          "",
        wristHandgrip:
          getSaveMatData.mat.currentSeating.upperLimbs.wristHandgrip || "",
      },
      comments: getSaveMatData.mat.currentSeating.comments || "",
    },
    supine: {
      pelvis: {
        tilt: {
          condition: getSaveMatData.mat.supine.pelvis.tilt.condition || "",
          flexibility: getSaveMatData.mat.supine.pelvis.tilt.flexibility || "",
        },
        obliquity: {
          condition: getSaveMatData.mat.supine.pelvis.obliquity.condition || "",
          flexibility:
            getSaveMatData.mat.supine.pelvis.obliquity.flexibility || "",
        },
        rotation: {
          condition: getSaveMatData.mat.supine.pelvis.rotation.condition || "",
          flexibility:
            getSaveMatData.mat.supine.pelvis.rotation.flexibility || "",
        },
      },
      trunk: {
        antPosterior: {
          condition:
            getSaveMatData.mat.supine.trunk.antPosterior.condition || "",
          flexibility:
            getSaveMatData.mat.supine.trunk.antPosterior.flexibility || "",
        },
        scoliosis: {
          condition: getSaveMatData.mat.supine.trunk.scoliosis.condition || "",
          flexibility:
            getSaveMatData.mat.supine.trunk.scoliosis.flexibility || "",
        },
        rotation: {
          condition: getSaveMatData.mat.supine.trunk.rotation.condition || "",
          flexibility:
            getSaveMatData.mat.supine.trunk.rotation.flexibility || "",
        },
      },
      lowerExtremities: {
        trunkThighAngle: {
          leftAngle:
            getSaveMatData.mat.supine.lowerExtremities.trunkThighAngle
              .leftAngle || 0,
          rightAngle:
            getSaveMatData.mat.supine.lowerExtremities.trunkThighAngle
              .rightAngle || 0,
          observation:
            getSaveMatData.mat.supine.lowerExtremities.trunkThighAngle
              .observation || "",
        },
        thighLowLegAngle: {
          leftAngle:
            getSaveMatData.mat.supine.lowerExtremities.thighLowLegAngle
              .leftAngle || 0,
          rightAngle:
            getSaveMatData.mat.supine.lowerExtremities.thighLowLegAngle
              .rightAngle || 0,
          observation:
            getSaveMatData.mat.supine.lowerExtremities.thighLowLegAngle
              .observation || "",
        },
        lowerLegFootAngle: {
          leftAngle:
            getSaveMatData.mat.supine.lowerExtremities.lowerLegFootAngle
              .leftAngle || 0,
          rightAngle:
            getSaveMatData.mat.supine.lowerExtremities.lowerLegFootAngle
              .rightAngle || 0,
          observation:
            getSaveMatData.mat.supine.lowerExtremities.lowerLegFootAngle
              .observation || "",
        },
        hipDuction: getSaveMatData.mat.supine.lowerExtremities.hipDuction || "",
        hipRotation:
          getSaveMatData.mat.supine.lowerExtremities.hipRotation || "",
        footInEversion:
          getSaveMatData.mat.supine.lowerExtremities.footInEversion || "",
      },
      headNeck: {
        cervicalCurve: getSaveMatData.mat.supine.headNeck.cervicalCurve || "",
        lateralFlexion: {
          condition:
            getSaveMatData.mat.supine.headNeck.lateralFlexion.condition || "",
          flexibility:
            getSaveMatData.mat.supine.headNeck.lateralFlexion.flexibility || "",
        },
        rotation: {
          condition:
            getSaveMatData.mat.supine.headNeck.rotation.condition || "",
          flexibility:
            getSaveMatData.mat.supine.headNeck.rotation.flexibility || "",
        },
      },
      upperLimbs: {
        shoulderPROM: getSaveMatData.mat.supine.upperLimbs.shoulderPROM || "",
        elbowForearmPROM:
          getSaveMatData.mat.supine.upperLimbs.elbowForearmPROM || 0,
        wristHand: getSaveMatData.mat.supine.upperLimbs.wristHand || "",
      },
      comments: getSaveMatData.mat.supine.comments || "",
    },
    sitting: {
      balance: getSaveMatData.mat.sitting.balance || "",
      pelvis: {
        tilt: getSaveMatData.mat.sitting.pelvis.tilt || "",
        obliquity: getSaveMatData.mat.sitting.pelvis.obliquity || "",
        rotation: getSaveMatData.mat.sitting.pelvis.rotation || "",
      },
      trunk: {
        antPosterior: {
          condition:
            getSaveMatData.mat.sitting.trunk.antPosterior.condition || "",
          flexibility:
            getSaveMatData.mat.sitting.trunk.antPosterior.flexibility || "",
        },
        scoliosis: {
          condition: getSaveMatData.mat.sitting.trunk.scoliosis.condition || "",
          flexibility:
            getSaveMatData.mat.sitting.trunk.scoliosis.flexibility || "",
        },
        rotation: getSaveMatData.mat.sitting.trunk.rotation || "",
      },
      lowerExtremities: {
        initialSittingAngles: {
          thighTrunk:
            getSaveMatData.mat.sitting.lowerExtremities.initialSittingAngles
              .thighTrunk || 0,
          thighLowerLeg:
            getSaveMatData.mat.sitting.lowerExtremities.initialSittingAngles
              .thighLowerLeg || 0,
        },
        position: {
          condition:
            getSaveMatData.mat.sitting.lowerExtremities.position.condition ||
            "",
          rotation:
            getSaveMatData.mat.sitting.lowerExtremities.position.rotation || "",
        },
        windswept: getSaveMatData.mat.sitting.lowerExtremities.windswept || "",
      },
      headNeck: {
        cervicalCurve: getSaveMatData.mat.sitting.headNeck.cervicalCurve || "",
        neckPosition: getSaveMatData.mat.sitting.headNeck.neckPosition || "",
        control: getSaveMatData.mat.sitting.headNeck.control || "",
      },
      upperLimbs: {
        shoulderPosition: {
          condition:
            getSaveMatData.mat.sitting.upperLimbs.shoulderPosition.condition ||
            "",
          description:
            getSaveMatData.mat.sitting.upperLimbs.shoulderPosition
              .description || "",
        },
        elbowForearmPosition:
          getSaveMatData.mat.sitting.upperLimbs.elbowForearmPosition || "",
        handWristPosition:
          getSaveMatData.mat.sitting.upperLimbs.handWristPosition || "",
      },
      comments: getSaveMatData.mat.sitting.comments || "",
    },
  };

  return transformedValues;
};

const MyForm = ({ setInMat }) => {
  setInMat(true);

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState("");
  const [countdown, setCountdown] = useState(5);
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const { bookingId } = useParams();
  initialValues.bookingID = bookingId;

  const { state } = useAuthContext();
  initialValues.therapistID = state.user.userId;

  const [getSaveMatData, setGetSaveMatData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //Scroll to top of page whenever a different form section is rendered
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    axios
      .get(`/api/save/getSave/${bookingId}`, { headers })
      .then((response) => {
        const data = response.data;
        const formikValues = transformGetSaveMatToFormikValues(data);
        formikValues.patient.personalInfo.dob = formikValues.patient.personalInfo.dob.split("T")[0]
        setGetSaveMatData(formikValues);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching getSaveMat details:", error);
        console.log("GET request failed");

        setIsLoading(false);
      });
  }, []);

  const handleClick = (step) => {
    setCurrentStep(step);

    localStorage.setItem("currentStep", JSON.stringify(step));
  };

  const throttledAutoSave = throttle((values) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    axios
      .post(`/api/save/autoSave/${bookingId}`, values, { headers })
      .then((response) => {
        // console.log("Auto-save successful:", response.data);
      })
      .catch((error) => {
        console.error("Auto-save error:", error);
      });
  }, 1000);

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post("/api/mat/matUpload", values, {
        headers,
      });

      await axios.put(`/api/admin/updateIsComplete/${bookingId}`, {
        isComplete: true
      }, { headers });

      axios
        .delete(`/api/save/deleteSave/${bookingId}`, { headers })
        .then((response) => {
          console.log("DELETE request successful:", response.data);
        })
        .catch((error) => {
          console.error("DELETE request error:", error);
        });

      setSubmitting(false);

      // Show the success Snackbar with countdown timer
      setShowSuccessSnackbar(true);

      // Start the countdown timer
      let timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Redirect to the homepage after the countdown
      setTimeout(() => {
        clearInterval(timer);
        setShowSuccessSnackbar(false);
        resetForm();
        setCurrentStep(0);
        setInMat(false);
        navigate("/");
      }, countdown * 1000);

    } catch (error) {
      // Validation error occurred, set the error message
      setErrorSnackbar("Submission Failed...");

      console.error("Error creating MAT:", error);
      setSubmitting(false);
    }
  };

  const handleChange = (values, isSubmitting) => {
    if (!isSubmitting) {
      throttledAutoSave(values);
    } 
  };

  return isLoading ? (
    <CircularProgress sx={{position:"absolute", top:"50%", left:"50%"}} />
  ) : (
    <Grid container xs={12}>
      <Formik
        initialValues={getSaveMatData || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isValid, isSubmitting, values, errors, handleSubmit, validateForm }) => (
          <>
            <Grid item xs={2}>
              <Sidebar
                currentStep={currentStep}
                setInMat={setInMat}
                values={values}
                errors={errors}
                validateForm={validateForm}
                updateCurrentStep={handleClick}
              />
            </Grid>

            <Grid
              item
              xs={10}
              sx={{ overflowY: "auto", height: "calc(100vh - 64px)" }}
            >
              {" "}
              {/* test contain scroll within form */}
              <Form
                onChange={handleChange(values, isSubmitting)}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                  // validateForm().then((errors) => {
                  //   if(Object.entries(errors).length === 0){
                      
                  //   } else{
                  //     handleInvalidAlert(errors);
                  //   }
                  // })
                  
                }}
              >
                {currentStep === 0 && (
                  <PatientDetails errors={errors} values={values.patient} />
                )}
                {currentStep === 1 && (
                  <CurrentSeating errors={errors.currentSeating ?? null} values={values.currentSeating} />
                )}
                {currentStep === 2 && <Supine errors={errors.supine ?? null} values={values.supine} />}
                {currentStep === 3 && <Sitting errors={errors.sitting ?? null} values={values.sitting} />}

                {currentStep === 4 && (
                  <>
                    <Review values={values} />

                    <SnackBar
                      message={
                        isSubmitting ? "Submitting MAT Assessment..." : ""
                      }
                      severity="info"
                    />

                    <SnackBar
                      message={
                        showSuccessSnackbar
                          ? `MAT Assessment submitted successfully! Redirecting to home page in ${countdown} seconds`
                          : errorSnackbar
                      }
                      severity={
                        showSuccessSnackbar
                          ? "success"
                          : errorSnackbar
                          ? "error"
                          : "success"
                      }
                    />

                    <SnackBar
                      message={isValid ? "" : "Missing or Invalid Form Values"}
                      severity="error"
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting || !isValid}
                      sx={{
                        bgcolor: "#A6C933",
                        fontWeight: "bold",
                        fontSize: "1.1em",
                        letterSpacing: "2px",
                        borderRadius: "15px",
                        padding: "5px 40px",
                        position: "fixed",
                        bottom: "30px",
                        right: "30px",
                        "&:hover": {
                          bgcolor: "#59db25",
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </>
                )}
              </Form>
            </Grid>
          </>
        )}
      </Formik>
    </Grid>
  );
};

export default MyForm;