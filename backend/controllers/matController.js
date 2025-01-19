const { MAT } = require("../models/matModel");
const { DeleteMAT } = require("../models/matModel");
const { PassThrough } = require("stream");
const { generatePDF } = require("../utils/pdfGenerator");

// create MAT assessment record (incomplete, , just basic functionality)
// Note: Duplicate entry creation not accounted for yet
const uploadMAT = async (req, res) => {
  const {
    bookingID,
    therapistID,
    atClinic,
    patient,
    currentSeating,
    supine,
    sitting,
  } = req.body;

  try {
    const mat = await MAT.upload(
      bookingID,
      therapistID,
      atClinic,
      patient,
      currentSeating,
      supine,
      sitting
    );

    res.status(201).json({ message: "MAT recorded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve MAT assessment record
const retrieveMAT = async (req, res) => {
  const { recordID } = req.params;

  try {
    const mat = await MAT.retrieve(recordID);
    mat.therapistID = mat.therapistID._id;

    res.status(200).json(mat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMAT = async (req, res) => {
  const { recordID } = req.params;
  const updatedData = req.body;

  console.log("In Update MAT", updatedData)

  try {
    const mat = await MAT.update(recordID, updatedData);

    res.status(200).json({
      message: `MAT record updated successfully at ObjectID: ${recordID}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create PDF File from MAT assessment record
const createMATPDF = async (req, res) => {
  const { recordID } = req.params;

  try {
    const matData = await MAT.retrieve(recordID);

    if (matData) {
      // const doc = await renderPDF();

      const dateToday = new Date();
      
      const extractDate = dateToday.toISOString().split("T")[0];
      const patientName = `${matData.patient.personalInfo.firstName}${matData.patient.personalInfo.lastName}`

      const pdfBuffer = await generatePDF(matData);

      // Create a readable stream from the PDF buffer
      const pdfStream = new PassThrough();
      pdfStream.end(pdfBuffer);

      // Set response headers to suggest a filename and specify attachment
      res.set({
        "Content-Disposition": `attachment; filename=MAT-Assessment-${patientName}-${extractDate}`,
        "Content-Type": "application/pdf",
      });

      // Pipe the writable stream to the response object
      pdfStream.pipe(res);
    } else {
      res.status(404).json({ message: "MAT assessment record not found" });
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
};

const getAllMat = async (req, res) => {
  try {
    const mat = await MAT.find().populate("therapistID");

    res.status(200).json(mat);
  } catch (error) {
    console.error("Error fetching MAT assessments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMat = async (req, res) => {
  const { recordID } = req.params;
  console.log(`ID: ${recordID}`);
  try {
    const deleteMAT = await DeleteMAT.delete(recordID);
    res.status(200).json({
      message: `MAT record deleted successfully at ObjectID: ${recordID}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postDeletedMat = async (req, res) => {
  const { recordID } = req.params; // Get the MAT ID from the request parameters

  try {
    // Find the MAT record by ID in the mat collection
    const matRecord = await MAT.findById(recordID);

    if (!matRecord) {
      return res.status(404).json({ error: "MAT record not found" });
    }

    // Create a new DeletedMat record based on the MAT data
    const deletedMatRecord = new DeleteMAT({
      bookingID: matRecord.bookingID,
      therapistID: matRecord.therapistID,
      atClinic: matRecord.atClinic,
      patient: matRecord.patient,
      currentSeating: matRecord.currentSeating,
      supine: matRecord.supine,
      sitting: matRecord.sitting,
    });

    // Save the new DeletedMat record
    await deletedMatRecord.save();
    await MAT.deleteOne({ _id: recordID });

    // Optionally, you can also delete the MAT record from the mat collection

    res
      .status(201)
      .json({ message: "MAT record moved to deletedMat successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all deleted MAT assessment records
const getAllDeletedMats = async (req, res) => {
  try {
    const deletedMats = await DeleteMAT.find().populate("therapistID");

    res.status(200).json(deletedMats);
  } catch (error) {
    console.error("Error fetching deleted MAT assessments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve a deleted MAT assessment record by its ID
const getDeletedMatById = async (req, res) => {
  const { recordID } = req.params;

  try {
    const deletedMat = await DeleteMAT.findById(recordID);
    console.log("GET DELETED MAT", deletedMat)

    if (!deletedMat) {
      return res
        .status(404)
        .json({ message: "Deleted MAT assessment record not found" });
    }

    res.status(200).json(deletedMat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const restoreDeletedMat = async (req, res) => {
  const { recordID } = req.params;

  try {
    const deletedMatRecord = await DeleteMAT.findById(recordID);

    if (!deletedMatRecord) {
      return res.status(404).json({ error: "Deleted MAT record not found" });
    }

    const matRecord = new MAT({
      bookingID: deletedMatRecord.bookingID,
      therapistID: deletedMatRecord.therapistID,
      atClinic: deletedMatRecord.atClinic,
      patient: deletedMatRecord.patient,
      currentSeating: deletedMatRecord.currentSeating,
      supine: deletedMatRecord.supine,
      sitting: deletedMatRecord.sitting,
    });

    await matRecord.save();

    await DeleteMAT.deleteOne({ _id: recordID });

    res
      .status(201)
      .json({ message: "Deleted MAT record restored successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create PDF File from *Archived* MAT assessment record
const createArchivedMATPDF = async (req, res) => {
  const { recordID } = req.params;

  try {
    const archivedMATData = await DeleteMAT.findById(recordID);

    if (archivedMATData) {
      // const doc = await renderPDF();

      const dateToday = new Date();
      
      const extractDate = dateToday.toISOString().split("T")[0];
      const patientName = `${archivedMATData.patient.personalInfo.firstName}${archivedMATData.patient.personalInfo.lastName}`

      const pdfBuffer = await generatePDF(archivedMATData);

      // Create a readable stream from the PDF buffer
      const pdfStream = new PassThrough();
      pdfStream.end(pdfBuffer);

      // Set response headers to suggest a filename and specify attachment
      res.set({
        "Content-Disposition": `attachment; filename=MAT-Assessment-${patientName}-${extractDate}`,
        "Content-Type": "application/pdf",
      });

      // Pipe the writable stream to the response object
      pdfStream.pipe(res);
    } else {
      res.status(404).json({ message: "MAT assessment record not found" });
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadMAT,
  retrieveMAT,
  createMATPDF,
  getAllMat,
  updateMAT,
  deleteMat,
  restoreDeletedMat,
  postDeletedMat,
  getAllDeletedMats,
  getDeletedMatById,
  createArchivedMATPDF,
};
