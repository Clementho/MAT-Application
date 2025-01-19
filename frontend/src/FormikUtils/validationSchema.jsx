import * as Yup from "yup";

const currentDate = new Date().toISOString().split('T')[0];

const validationSchema = Yup.object().shape({
    therapistID: Yup.string().required("Required"),
  
    atClinic: Yup.string().required("Required"),
  
    patient: Yup.object().shape({
      personalInfo: Yup.object().shape({
        gender: Yup.string().required("Client gender required"),
        lastName: Yup.string().required("Client last name required"),
        firstName: Yup.string().required("Client first name required"),
        dob: Yup.date().max(currentDate,"Invalid client date of birth").required("Client date of birth required"),
      }),
      medicalInfo: Yup.object().shape({
        diagnosis: Yup.string(),
        otherMedicalConcerns: Yup.string(),
        pastSurgery: Yup.string(),
        futureSurgery: Yup.string(),
        otherInterventions: Yup.string(),
        orthotics: Yup.string(),
        vision: Yup.string(),
        hearing: Yup.string(),
      }),
    }),
  
    currentSeating: Yup.object().shape({
      pelvis: Yup.object().shape({
        tilt: Yup.string(),
        obliquity: Yup.string(),
        rotation: Yup.string(),
      }),
      trunk: Yup.object().shape({
        antPosterior: Yup.string(),
        scoliosis: Yup.string(),
        rotation: Yup.string(),
      }),
      hips: Yup.object().shape({
        thighTrunkAngle: Yup.object().shape({
          leftAngle: Yup.number()
            .min(0, 'Angle must be greater than or equal to 0')
            .max(180, 'Angle must be less than or equal to 180'),
          rightAngle: Yup.number()
            .min(0, 'Angle must be greater than or equal to 0')
            .max(180, 'Angle must be less than or equal to 180'),
        }),
        position: Yup.object().shape({
          condition: Yup.string(),
          rotation: Yup.string(),
        }),
        windswept: Yup.string(),
      }),
      kneesFeet: Yup.object().shape({
        thighLowerLegAngle: Yup.object().shape({
          leftAngle: Yup.number()
          .min(0, 'Angle must be greater than or equal to 0')
          .max(180, 'Angle must be less than or equal to 180'),
          rightAngle: Yup.number()
          .min(0, 'Angle must be greater than or equal to 0')
          .max(180, 'Angle must be less than or equal to 180'),
        }),
        lowerLegFootAngle: Yup.object().shape({
          leftAngle: Yup.number()
          .min(0, 'Angle must be greater than or equal to 0')
          .max(180, 'Angle must be less than or equal to 180'),
          leftFlexion: Yup.string(),
          rightAngle: Yup.number()
          .min(0, 'Angle must be greater than or equal to 0')
          .max(180, 'Angle must be less than or equal to 180'),
          rightFlexion: Yup.string(),
        }),
        footPosition: Yup.object().shape({
          leftPosition: Yup.string(),
          rightPosition: Yup.string(),
        }),
      }),
      headNeck: Yup.object().shape({
        cervicalCurve: Yup.string(),
        neckPosition: Yup.string(),
        control: Yup.string(),
      }),
      upperLimbs: Yup.object().shape({
        shoulderPosition: Yup.string(),
        elbowForearmPosition: Yup.string(),
        wristHandgrip: Yup.string(),
      }),
      comments: Yup.string(),
    }),
  
    supine: Yup.object().shape({
      pelvis: Yup.object().shape({
        tilt: Yup.object().shape({
            condition: Yup.string(),
            flexibility: Yup.string(),
        }),
        obliquity: Yup.object().shape({
            condition: Yup.string(),
            flexibility: Yup.string(),
        }),
        rotation: Yup.object().shape({
            condition: Yup.string(),
            flexibility: Yup.string(),
        }),
      }),
      trunk: Yup.object().shape({
        antPosterior: Yup.object().shape({
            condition: Yup.string(),
            flexibility: Yup.string(),
        }),
        scoliosis: Yup.object().shape({
            condition: Yup.string(),
            flexibility: Yup.string(),
        }),
        rotation: Yup.object().shape({
            condition: Yup.string(),
            flexibility: Yup.string(),
        }),
      }),
      lowerExtremities: Yup.object().shape({
        trunkThighAngle: Yup.object().shape({
          leftAngle: Yup.number()
          .min(0, 'Angle must be greater than or equal to 0')
          .max(90, 'Angle must be less than or equal to 90'),
          rightAngle: Yup.number()
          .min(0, 'Angle must be greater than or equal to 0')
          .max(90, 'Angle must be less than or equal to 90'),
          observation: Yup.string(),
        }),
        thighLowLegAngle: Yup.object().shape({
          leftAngle: Yup.number()
          .min(30, 'Angle must be greater than or equal to 30')
          .max(180, 'Angle must be less than or equal to 180'),
          rightAngle: Yup.number()
          .min(30, 'Angle must be greater than or equal to 30')
          .max(180, 'Angle must be less than or equal to 180'),
          observation: Yup.string(),
        }),
        lowerLegFootAngle: Yup.object().shape({
          leftAngle: Yup.number()
          .min(30, 'Angle must be greater than or equal to 30')
          .max(135, 'Angle must be less than or equal to 135'),
          rightAngle: Yup.number()
          .min(30, 'Angle must be greater than or equal to 30')
          .max(135, 'Angle must be less than or equal to 135'),
          observation: Yup.string(),
        }),
        hipDuction: Yup.string(),
        hipRotation: Yup.string(),
        footInEversion: Yup.string(),
      }),
      headNeck: Yup.object().shape({
        cervicalCurve: Yup.string(),
        lateralFlexion: Yup.object().shape({
            condition: Yup.string(),
            flexibility: Yup.string(),
        }),
        rotation: Yup.object().shape({
            condition: Yup.string(),
            flexibility: Yup.string(),
        }),
      }),
      upperLimbs: Yup.object().shape({
        shoulderPROM: Yup.string(),
        elbowForearmPROM: Yup.string(),
        wristHand: Yup.string(),
      }),
      comments: Yup.string(),
    }),
    
    sitting: Yup.object().shape({
      balance: Yup.string(),
      pelvis: Yup.object().shape({
        tilt: Yup.string(),
        obliquity: Yup.string(),
        rotation: Yup.string(),
      }),
      trunk: Yup.object().shape({
        antPosterior: Yup.object().shape({
            condition: Yup.string(),
            flexibility: Yup.string(),
        }),
        scoliosis: Yup.object().shape({
            condition: Yup.string(),
            flexibility: Yup.string(),
        }),
        rotation: Yup.string(),
      }),
      lowerExtremities: Yup.object().shape({
        initialSittingAngles: Yup.object().shape({
          thighTrunk: Yup.number()
          .min(0, 'Angle must be greater than or equal to 0')
          .max(180, 'Angle must be less than or equal to 180'),
          thighLowerLeg: Yup.number()
          .min(0, 'Angle must be greater than or equal to 0')
          .max(180, 'Angle must be less than or equal to 180'),
        }),
        position: Yup.object().shape({
            condition: Yup.string(),
            rotation: Yup.string(),
        }),
        windswept: Yup.string(),
      }),
      headNeck: Yup.object().shape({
        cervicalCurve: Yup.string(),
        neckPosition: Yup.string(),
        control: Yup.string(),
      }),
      upperLimbs: Yup.object().shape({
        shoulderPosition: Yup.object().shape({
            condition: Yup.string(),
            description: Yup.string()
        }),
        elbowForearmPosition: Yup.string(),
        handWristPosition: Yup.string(),
      }),
      comments: Yup.string(),
    }),
  });


export default validationSchema;