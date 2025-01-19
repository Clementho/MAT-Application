const mongoose = require('mongoose');

// This schema is used to capture the Patient's Information (Personal & Medical) in the MAT assessment
// Created with reference to the GoKids Initial Wheelchair Asessment Form provided by Scope
// Referenced page 1

// Structure of currentSeatingSchema:
//  -   Personal Information
//  -   Medical Information

const patientSchema = new mongoose.Schema({
    personalInfo: {
        gender: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        }
    },
    medicalInfo: {
        diagnosis: {
            type: String,
            default: '',
            trim: true,
        },
        otherMedicalConcerns: {
            type: String,
            default: '',
            trim: true,
        },
        pastSurgery: {
            type: String,
            default: '',
            trim: true,
        },
        futureSurgery: {
            type: String,
            default: '',
            trim: true,
        },
        otherInterventions: {
            type: String,
            default: '',
            trim: true,
        },
        orthotics: {
            type: String,
            default: '',
            trim: true,
        },
        vision: {
            type: String,
            enum: ['', 'Blind', 'Impaired w/correction', 'Within normal limits'],
            default: '',
            trim: true,
        },
        hearing: {
            type: String,
            enum: ['', 'Deaf', 'Impaired w/correction', 'Within normal limits'],
            default: '',
            trim: true,
        }
    }
})

module.exports = patientSchema;