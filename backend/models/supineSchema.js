const mongoose = require('mongoose');

// This schema is used to capture the SUPINE section of the MAT assessment
// Created with reference to the basic MAT form by ACI NSW
// https://aci.health.nsw.gov.au/__data/assets/pdf_file/0004/312745/ACI-SSCIS-assessment-form-AF2.3-basic-MAT-assessment.pdf

// Structure of supineSchema:
//  -   Pelvis
//  -   Trunk
//  -   Lower Extermities
//  -   Head and Neck
//  -   Upper Limbs
//  -   Comments (Aggregated, i.e., no individual comment fields/properties inside each measurement field, only a combined field for the entirety of one MAT assessment phase)

// Note:
//  -   Fields of type "Number" must have min/max range
//  -   Fields of type "String" without enum values indicate free-form comments
//  -   Enum values indicate specific options for each field.
//  -   The dash character "-" is reserved to indicate extensions/additions to measurement values.
//  -   For example, if the therapist selects "External Rotation" for Hips' Position, they must provide an additional value indicating the rotation direction (L/R)
//  -   Hence, the string value "External Rotation" with be concatenated with the direction character "L" or "R", forming "External Rotation-L" or "External Rotation-R"
//  -   Some fields may be required ONLY if a specific value was selected for a related field, these are indicated by required: function(){ ... }

const supineSchema = new mongoose.Schema({
    pelvis: {
        tilt: {
            condition: {
                type: String,
                enum: ['', 'Neutral', 'Posterior', 'Anterior'],
                default: '',
                trim: true,
            },
            flexibility: {
                type: String,
                enum: ['', 'Fixed', 'Flexible', 'Corrects with Effort'],
                default: '',
                trim: true,
            }
        },
        obliquity: {
            condition: {
                type: String,
                enum: ['', 'Neutral', 'Left Lower', 'Right Lower'],
                default: '',
                trim: true,
            },
            flexibility: {
                type: String,
                enum: ['', 'Fixed', 'Flexible', 'Corrects with Effort'],
                default: '',
                trim: true,
            }
        },
        rotation: {
            condition: {
                type: String,
                enum: ['', 'Neutral', 'Left Forward', 'Right Forward'],
                default: '',
                trim: true,
            },
            flexibility: {
                type: String,
                enum: ['', 'Fixed', 'Flexible', 'Corrects with Effort'],
                default: '',
                trim: true,
            }
        }
    },
    trunk: {
        antPosterior: {
            condition: {
                type: String,
                enum: ['', 'Neutral', 'Thoracic Kyphosis', 'Lumbar Lordosis', 'Lumbar C-Curve Flattening'],
                default: '',
                trim: true,
            },
            flexibility: {
                type: String,
                enum: ['', 'Fixed', 'Flexible', 'Corrects with Effort'],
                default: '',
                trim: true,
            }
        },
        scoliosis: {
            condition: {
                type: String,
                enum: ['', 'Neutral', 'Convex Left', 'Convex Right'],
                default: '',
                trim: true,
            },
            flexibility: {
                type: String,
                enum: ['', 'Fixed', 'Flexible', 'Corrects with Effort'],
                default: '',
                trim: true,
            }
        },
        rotation: {
            condition: {
                type: String,
                enum: ['', 'Neutral', 'Left Forward', 'Right Forward'],
                default: '',
                trim: true,
            },
            flexibility: {
                type: String,
                enum: ['', 'Fixed', 'Flexible', 'Corrects with Effort'],
                default: '',
                trim: true,
            }
        }
    },
    lowerExtremities: {
        trunkThighAngle: {
            leftAngle: {
                type: Number,
                min: 0,
                max: 90,
            },
            rightAngle: {
                type: Number,
                min: 0,
                max: 90,
            },
            observation: {
                type: String,
                default: '',
                trim: true,
            }
        },
        thighLowLegAngle: {
            leftAngle: {
                type: Number,
                min: 30,
                max: 180,
            },
            rightAngle: {
                type: Number,
                min: 30,
                max: 180,
            },
            observation: {
                type: String,
                default: '',
                trim: true,
            }
        },
        lowerLegFootAngle: {
            leftAngle: {
                type: Number,
                min: 30,
                max: 135,
            },
            rightAngle: {
                type: Number,
                min: 30,
                max: 135,
            },
            observation: {
                type: String,
                default: '',
                trim: true,
            }
        },
        hipDuction: {
            type: String,
            default: '',
            trim: true,
        },
        hipRotation: {
            type: String,
            default: '',
            trim: true,
        },
        footInEversion: {
            type: String,
            default: '',
            trim: true,
        }
    },
    headNeck: {
        cervicalCurve: {
            type: String,
            enum: ['', 'Neutral', 'Cervical Flexion', 'Cervical Hyperextension'],
            default: '',
            trim: true,
        },
        lateralFlexion: {
            condition: {
                type: String,
                enum: ['', 'Neutral', 'Left', 'Right'],
                default: '',
                trim: true,
            },
            flexibility: {
                type: String,
                enum: ['', 'Fixed', 'Flexible', 'Corrects with Effort'],
                default: '',
                trim: true,
            }
        },
        rotation: {
            condition: {
                type: String,
                enum: ['', 'Neutral', 'Left', 'Right'],
                default: '',
                trim: true,
            },
            flexibility: {
                type: String,
                enum: ['', 'Fixed', 'Flexible', 'Corrects with Effort'],
                default: '',
                trim: true,
            }
        }
    },
    upperLimbs: {
        shoulderPROM: {
            type: String,
            enum: ['', 'Level', 'Asymmetry'],
            default: '',
            trim: true,
        },
        elbowForearmPROM: {
            type: String,
            default: '',
            trim: true,
        },
        wristHand: {
            type: String,
            default: '',
            trim: true,
        }
    },
    comments: {
        type: String,
        default: '',
        trim: true,
    }
})

module.exports = supineSchema;

