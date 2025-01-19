const mongoose = require("mongoose");

const PatientSchema = require("./patientSchema.js");
const CurrentSeatingSchema = require("./currentSeatingSchema.js");
const SupineSchema = require("./supineSchema.js");
const SittingSchema = require("./sittingSchema.js");

// Note: Decided to embed the various sub-schemas instead of creating references
// https://stackoverflow.com/questions/5373198/mongodb-relationships-embed-or-reference

const MATSchema = new mongoose.Schema(
  {
    bookingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    therapistID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    atClinic: {
      type: Boolean,
      required: true,
    },
    patient: {
      type: PatientSchema,
      required: true,
      default: {},
    },
    currentSeating: {
      type: CurrentSeatingSchema,
      required: true,
      default: {},
    },
    supine: {
      type: SupineSchema,
      required: true,
      default: {},
    },
    sitting: {
      type: SittingSchema,
      required: true,
      default: {},
    },
  },
  { timestamps: true }
);

const SaveMATSchema = new mongoose.Schema(
  {
    bookingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    therapistID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    atClinic: {
      type: Boolean,
      required: true,
    },
    patient: {
      type: PatientSchema,
      required: true,
      default: {},
    },
    currentSeating: {
      type: CurrentSeatingSchema,
      required: true,
      default: {},
    },
    supine: {
      type: SupineSchema,
      required: true,
      default: {},
    },
    sitting: {
      type: SittingSchema,
      required: true,
      default: {},
    },
  },
  { timestamps: true }
);

const DeleteMatSchema = new mongoose.Schema(
  {
    bookingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    therapistID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    atClinic: {
      type: Boolean,
      required: true,
    },
    patient: {
      type: PatientSchema, // Make sure you have the PatientSchema defined
      required: true,
      default: {},
    },
    currentSeating: {
      type: CurrentSeatingSchema, // Make sure you have the CurrentSeatingSchema defined
      required: true,
      default: {},
    },
    supine: {
      type: SupineSchema, // Make sure you have the SupineSchema defined
      required: true,
      default: {},
    },
    sitting: {
      type: SittingSchema, // Make sure you have the SittingSchema defined
      required: true,
      default: {},
    },
  },
  { timestamps: true }
);

//Patient wheelchair schema excluded for now

MATSchema.statics.upload = async function (
  bookingID,
  therapistID,
  atClinic,
  patient,
  currentSeating,
  supine,
  sitting
) {
  // if(!therapistID || !atClinic || !patient || !currentSeating || !supine || !sitting){

  //     throw Error("All MAT assessment fields must be filled");
  // }

  const mat = await this.create({
    bookingID,
    therapistID,
    atClinic,
    patient,
    currentSeating,
    supine,
    sitting,
  });

  return mat;
};

DeleteMatSchema.statics.upload = async function (
  bookingID,
  therapistID,
  atClinic,
  patient,
  currentSeating,
  supine,
  sitting
) {
  // if(!therapistID || !atClinic || !patient || !currentSeating || !supine || !sitting){

  //     throw Error("All MAT assessment fields must be filled");
  // }

  const mat = await this.create({
    bookingID,
    therapistID,
    atClinic,
    patient,
    currentSeating,
    supine,
    sitting,
  });

  return mat;
};

MATSchema.statics.retrieve = async function (recordID) {
  if (!recordID) {
    throw Error("Record ID must be provided");
  }

  const mat = await this.findById(recordID).populate("therapistID");

  if (!mat) {
    throw Error(`MAT record ID:${recordID} does not exist`);
  }

  return mat;
};

MATSchema.statics.update = async function (recordID, updatedData) {
  try {
    const updatedMAT = await this.findByIdAndUpdate(recordID, updatedData, {
      new: true,
    });

    if (!updatedMAT) {
      throw new Error(`MAT document ID: ${recordID} does not exist`);
    }

    return updatedMAT;
  } catch (error) {
    throw error;
  }
};

DeleteMatSchema.statics.delete = async function (recordID) {
  try {
    const deletedMAT = await this.findByIdAndDelete(recordID);
    if (!deletedMAT) {
      throw new Error(`MAT document ID: ${recordID} does not exist`);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  MAT: mongoose.model("MAT", MATSchema),
  SaveMAT: mongoose.model("SaveMAT", SaveMATSchema),
  DeleteMAT: mongoose.model("DeleteMAT", DeleteMatSchema),
};
