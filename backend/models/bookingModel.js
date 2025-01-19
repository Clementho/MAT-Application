const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  patientFirstName: { type: String, required: true },
  patientLastName: { type: String, required: true },
  patientGender: { type: String, required: true },
  patientDOB: { type: Date, required: true },
  therapist: { type: Schema.Types.ObjectId, ref: "User", required: true },
  juniorTherapist: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  formStarted: { type: Boolean, default: false },
});

// Create a virtual field for 'status'
bookingSchema
  .virtual("status")
  .get(function () {
    return this.isComplete ? "Complete" : "Incomplete";
  })
  .set(function (value) {
    this.isComplete = value === "Complete";
  });

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
