const initialValues = {
    bookingID: "",
    therapistID: "",
    atClinic: true,
    patient: {
      personalInfo: {
        gender: "",
        lastName: "",
        firstName: "",
        dob: "",
      },
      medicalInfo: {
        diagnosis: "",
        otherMedicalConcerns: "",
        pastSurgery: "",
        futureSurgery: "",
        otherInterventions: "",
        orthotics: "",
        vision: "",
        hearing: "",
      },
    },
    currentSeating: {
      pelvis: {
        tilt: "",
        obliquity: "",
        rotation: "",
      },
      trunk: {
        antPosterior: "",
        scoliosis: "",
        rotation: "",
      },
      hips: {
        thighTrunkAngle: {
          leftAngle: "",
          rightAngle: "",
        },
        position: {
          condition: "",
          rotation: "",
        },
        windswept: "",
      },
      kneesFeet: {
        thighLowerLegAngle: {
          leftAngle: "",
          rightAngle: "",
        },
        lowerLegFootAngle: {
          leftAngle: "",
          leftFlexion: "",
          rightAngle: "",
          rightFlexion: "",
        },
        footPosition: {
          leftPosition: "",
          rightPosition: "",
        },
      },
      headNeck: {
        cervicalCurve: "",
        neckPosition: "",
        control: "",
      },
      upperLimbs: {
        shoulderPosition: "",
        elbowForearmPosition: "",
        wristHandgrip: "",
      },
      comments: "",
    },
    supine: {
      pelvis: {
        tilt: {
          condition: "",
          flexibility: "",
        },
        obliquity: {
          condition: "",
          flexibility: "",
        },
        rotation: {
          condition: "",
          flexibility: "",
        },
      },
      trunk: {
        antPosterior: {
          condition: "",
          flexibility: "",
        },
        scoliosis: {
          condition: "",
          flexibility: "",
        },
        rotation: {
          condition: "",
          flexibility: "",
        },
      },
      lowerExtremities: {
        trunkThighAngle: {
          leftAngle: "",
          rightAngle: "",
          observation: "",
        },
        thighLowLegAngle: {
          leftAngle: "",
          rightAngle: "",
          observation: "",
        },
        lowerLegFootAngle: {
          leftAngle: "",
          rightAngle: "",
          observation: "",
        },
        hipDuction: "",
        hipRotation: "",
        footInEversion: "",
      },
      headNeck: {
        cervicalCurve: "",
        lateralFlexion: {
          condition: "",
          flexibility: "",
        },
        rotation: {
          condition: "",
          flexibility: "",
        },
      },
      upperLimbs: {
        shoulderPROM: "",
        elbowForearmPROM: "",
        wristHand: "",
      },
      comments: "",
    },
    sitting: {
      balance: "",
      pelvis: {
        tilt: "",
        obliquity: "",
        rotation: "",
      },
      trunk: {
        antPosterior: {
          condition: "",
          flexibility: "",
        },
        scoliosis: {
          condition: "",
          flexibility: "",
        },
        rotation: "",
      },
      lowerExtremities: {
        initialSittingAngles: {
          thighTrunk: "",
          thighLowerLeg: "",
        },
        position: {
          condition: "",
          rotation: "",
        },
        windswept: "",
      },
      headNeck: {
        cervicalCurve: "",
        neckPosition: "",
        control: "",
      },
      upperLimbs: {
        shoulderPosition: {
          condition: "",
          description: "",
        },
        elbowForearmPosition: "",
        handWristPosition: "",
      },
      comments: "",
    },
  };
  

export default initialValues;