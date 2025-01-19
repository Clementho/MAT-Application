const { SaveMAT } = require("../models/matModel");

const autoSaveMAT = async (req, res) => {
  const { bookingID } = req.params;
  const { therapistID, atClinic, patient, currentSeating, supine, sitting } =
    req.body;

  try {
    let saveMAT;

    const existingSaveMAT = await SaveMAT.findOne({ bookingID });

    if (existingSaveMAT) {
      saveMAT = await SaveMAT.findByIdAndUpdate(existingSaveMAT._id, {
        therapistID,
        atClinic,
        patient,
        currentSeating,
        supine,
        sitting,
      });
    } else {
      saveMAT = new SaveMAT({
        bookingID,
        therapistID,
        atClinic,
        patient,
        currentSeating,
        supine,
        sitting,
      });
      await saveMAT.save();
    }

    res
      .status(200)
      .json({ message: "SaveMAT record saved successfully", saveMAT });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSaveMAT = async (req, res) => {
  const { bookingID } = req.params;

  try {
    const mat = await SaveMAT.findOne({ bookingID });

    if (!mat) {
      return res.status(404).json({ message: "MAT record not found" });
    }

    res.status(200).json({ message: "MAT record retrieved successfully", mat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteSaveMAT = async (req, res) => {
  const { bookingID } = req.params;

  try {
    const deletedMAT = await SaveMAT.findOneAndDelete({ bookingID });

    if (!deletedMAT) {
      return res.status(404).json({ message: "MAT record not found" });
    }

    res
      .status(200)
      .json({ message: "MAT record deleted successfully", deletedMAT });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  autoSaveMAT,
  getSaveMAT,
  deleteSaveMAT,

};

