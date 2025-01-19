const mongoose = require('mongoose');

// This schema is used to capture the CURRENT SEATING section of the MAT assessment
// Created with reference to the basic MAT form by ACI NSW
// https://aci.health.nsw.gov.au/__data/assets/pdf_file/0004/312745/ACI-SSCIS-assessment-form-AF2.3-basic-MAT-assessment.pdf

// Structure of currentSeatingSchema:
//  -   Pelvis
//  -   Trunk
//  -   Knees and Feet
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

const currentSeatingSchema = new mongoose.Schema({
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
            type: String,
            enum: ['', 'Neutral', 'Thoracic Kyphosis', 'Lumbar Lordosis', 'Lumbar C-Curve Flattening'],
            default: '',
            trim: true,
        },
        scoliosis: {
            type: String,
            enum: ['', 'Neutral', 'Convex Left', 'Convex Right'],
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
    hips: {
        thighTrunkAngle: {
            leftAngle: {
                type: Number,
                min: 0,
                max: 180,
            },
            rightAngle: {
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
    kneesFeet: {
        thighLowerLegAngle: {
            leftAngle: {
                type: Number,
                min: 0,
                max: 180,
            },
            rightAngle: {
                type: Number,
                min: 0,
                max: 180,
            }
        },
        lowerLegFootAngle: {
            leftAngle: {
                type: Number,
                min: 0,
                max: 180,
            },
            leftFlexion: {
                type: String,
                enum: ['', 'Plantar-flex', 'Dorsi-flex'],
                default: '',
                trim: true,
            },
            rightAngle: {
                type: Number,
                min: 0,
                max: 180,
            },
            rightFlexion: {
                type: String,
                enum: ['', 'Plantar-flex', 'Dorsi-flex'],
                default: '',
                trim: true,
            },
        },
        footPosition: {
            leftPosition: {
                type: String,
                enum: ['', 'Neutral', 'Inversion', 'Eversion'],
                default: '',
                trim: true,
            },
            rightPosition: {
                type: String,
                enum: ['', 'Neutral', 'Inversion', 'Eversion'],
                default: '',
                trim: true,
            }
        }
    },
    headNeck: {
        cervicalCurve: {
            type: String,
            enum: ['', 'Neutral', 'Flexion', 'Extension', 'Cervical Hyperextension'],
            default: '',
            trim: true,
        },
        neckPosition: {
            type: String,
            enum: ['', 'Midline', 'Lateral Flexion-L', 'Lateral Flexion-R', 'Rotation-L', 'Rotation-R'],
            default: '',
            trim: true,
        },
        control: {
            type: String,
            enum: ['', 'Independent Head Control and Full ROM', 'Restricted Head Control', 'Restricted ROM', 'Absent Head Control'],
            default: '',
            trim: true,
        }
    },
    upperLimbs: {
        shoulderPosition: {
            type: String,
            enum: ['', 'Level', 'Asymmetry'],
            default: '',
            trim: true,
        },
        elbowForearmPosition: {
            type: String,
            enum: ['', 'Arm Support', 'No Support'],
            default: '',
            trim: true,
        },
        wristHandgrip: {
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
});

module.exports = currentSeatingSchema;


