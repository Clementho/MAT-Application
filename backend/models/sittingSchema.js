const mongoose = require('mongoose');

// This schema is used to capture the SITTING section of the MAT assessment
// Created with reference to the basic MAT form by ACI NSW
// https://aci.health.nsw.gov.au/__data/assets/pdf_file/0004/312745/ACI-SSCIS-assessment-form-AF2.3-basic-MAT-assessment.pdf

// Structure of sittingSchema:
//  -   Balance
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

const sittingSchema = new mongoose.Schema({
    balance: {
        type: String,
        enum: ['', 'Hands-free sitter', 'Hands dependant sitter', 'Dependant sitter'],
        default: '',
        trim: true,
    },
    pelvis: {
        tilt: {
            type: String,
            enum: ['', 'Neutral', 'Posterior', 'Anterior'],
            default: '',
            trim: true,
        },
        obliquity: {
            type: String,
            enum: ['', 'Neutral', 'Left Lower', 'Right Lower'],
            default: '',
            trim: true,
        },
        rotation: {
            type: String,
            enum: ['', 'Neutral', 'Left Forward', 'Right Forward'],
            default: '',
            trim: true,
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
            type: String,
            enum: ['', 'Neutral', 'Left Forward', 'Right Forward'],
            default: '',
            trim: true,
        }
    },
    lowerExtremities: {
        initialSittingAngles: {
            thighTrunk: {
                type: Number,
                min: 0,
                max: 180,
            },
            thighLowerLeg: {
                type: Number,
                min: 0,
                max: 180,
            }
        },
        position: {
            condition: {
                type: String,
                enum: ['', 'Neutral', 'ABduct-L', 'ABduct-R', 'ADduct-L', 'ADduct-R'],
                default: '',
                trim: true,
            },
            rotation: {
                type: String,
                enum: ['', 'External Rotation-L', 'External Rotation-R', 'Internal Rotation-L', 'Internal Rotation-R'],
                default: '',
                trim: true,
            },
        },
        windswept: {
            type: String,
            enum: ['', 'Neutral', 'Left', 'Right'],
            default: '',
            trim: true,
        }
    },
    headNeck: {
        cervicalCurve: {
            type: String,
            default: '',
            trim: true,
        },
        neckPosition: {
            type: String,
            default: '',
            trim: true,
        },
        control: {
            type: String,
            default: '',
            trim: true,
        }
    },
    upperLimbs: {
        shoulderPosition: {
            condition: {
                type: String,
                enum: ['', 'Level', 'Asymmetry'],
                default: '',
                trim: true,
            },
            description: {
                type: String,
                default: '',
                trim: true,
            }
        },
        elbowForearmPosition: {
            type: String,
            default: '',
            trim: true,
        },
        handWristPosition: {
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

module.exports = sittingSchema;

