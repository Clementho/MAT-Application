import React from "react";
import { useState, useEffect } from "react";

import {
    Box,
    Typography,
    Modal,
    IconButton
} from "@mui/material";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ErrorModal = ({values, errors, showErrorModal, setShowErrorModal, validateForm}) => {
    const [invalidModalMessage, setInvalidModalMessage] = useState(""); // formatted invalid error messages to display in modal

    const handleCloseModal = () => {
        setInvalidModalMessage("");
        setShowErrorModal(false);
    };

    // *GET ERROR MESSAGES IN FORMIK ERRORS*
    const getErrorMessages = (errors) => {
        const sectionKeyToName = {
            "patient": "Client Details",
            "currentSeating":  "Current Seating",
            "supine": "Supine",
            "sitting": "Sitting"
        }

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
            const fieldSection = sectionKeyToName[fields[0]];
            const fieldSubsection = valueKeyToTabName[fields[1]];

            if(!Object.keys(errorValueKeys).includes(fieldSection)) {
                errorValueKeys[fieldSection] = {};
            }

            if(!Object.keys(errorValueKeys[fieldSection]).includes(fieldSubsection)) {
                errorValueKeys[fieldSection][fieldSubsection] = [];
            }

            const capitalisedKeys = (fields.slice(2)).map(key => key.charAt(0).toUpperCase() + key.slice(1))

            const errorField = {
                errorPath: `${capitalisedKeys.join(" - ")}`,
                errorMessage: `${obj[key]}`
            }

            errorValueKeys[fieldSection][fieldSubsection].push(errorField);
            }
    
        }
        }

        getErrorValues(errors);
        
        return createInvalidModalMessage(errorValueKeys);
    }

    // Function to create messages to inform user of invalid values for the whole form
    // Message presented in a list format, categorised by tabs (Hips, Pelvis, etc)
    const createInvalidModalMessage = (errorValueKeys) => {
        return (
        <>
            {Object.keys(errorValueKeys).map((section) => (
            <>
            <p style={{textDecoration:"underline", textAlign:"center"}}>{section}</p>
            {Object.keys(errorValueKeys[section]).map((subsection) => (
                <>
                <Typography 
                key={section}
                sx={{
                fontWeight: "bold",
                fontSize: "0.9em",
                marginTop: "20px"
                }}>{subsection}</Typography>
                <ul>
                {errorValueKeys[section][subsection].map((error, errorIndex) => (
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
            ))}
            
            
            </>
            ))}

        </>
        )
    }

    useEffect(() => {
        console.log("FORM ERRORS:", errors)

        validateForm().then(() => {
            const modalMessage = getErrorMessages(errors);
            setInvalidModalMessage(modalMessage);
        })
    }, [values, errors, showErrorModal])

    return (
        <Modal
            open={showErrorModal}
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
                width: "50%",
                bgcolor: "background.paper",
                border: "2px solid #1D4D93",
                borderRadius: "15px",
                boxShadow: 24,
                padding: "30px 0",
            }}
            >
                <Box sx={{display:"flex", alignItems:"center", position:"relative"}}>
                    <IconButton onClick={handleCloseModal} sx={{position:"absolute", left: "5%"}}>
                        <CloseRoundedIcon sx={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "black",
                        }} />
                    </IconButton>
                    
                    <Typography
                        sx={{
                        fontSize: "1.4em",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#FF1800",
                        margin: "auto",
                        }}
                    >
                        Invalid Values Found!
                    </Typography>
                </Box>

                <Box sx={{
                    overflow: "auto",
                    maxHeight: 400,
                    margin: "20px 20px",
                    padding: "0 20px",
                }}>
                    <Box width="90%" margin="auto">
                    <Typography
                        sx={{
                        fontSize: "1.2em",
                        fontWeight: "bold",
                        }}
                    >
                        {invalidModalMessage}
                    </Typography>
                    </Box>
                </Box>
            
            </Box>
      </Modal>
    )
}

export default ErrorModal;