const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const mongoose = require("mongoose");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function isValidDateFormat(date) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(date);
}

function parseDateString(dateString) {
  const [day, month, year] = dateString.split("/");
  return `${month}/${day}/${year}`;
}

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

exports.createBooking = async (req, res) => {
  try {
    const {
      patientFirstName,
      patientLastName,
      patientGender,
      patientDOB,
      therapistId,
      location,
      juniorTherapist,
      date,
      time,
      isComplete,
      formStarted,
    } = req.body;

    if (
      !patientFirstName ||
      !patientLastName ||
      !patientGender ||
      !patientDOB ||
      !therapistId ||
      !date ||
      !location ||
      !time
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate date format (dd/mm/yyyy)
    if (!isValidDateFormat(date)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Parse the input date and check if it's in the future
    const parsedDate = new Date(parseDateString(date));
    if (isNaN(parsedDate) || parsedDate < new Date()) {
      return res.status(400).json({ error: "Invalid or past date" });
    }

    // Format the date to "dd/mm/yyyy" format
    const formattedDate = formatDate(parsedDate);

    // Fetch the therapist using findById
    const therapist = await User.findById(therapistId);
    if (!therapist) {
      return res.status(404).json({ error: "Therapist not found" });
    }

    // Create the booking with the` formatted date
    const booking = await Booking.create({
      patientFirstName,
      patientLastName,
      patientGender,
      patientDOB,
      therapist: therapistId,
      juniorTherapist,
      date: formattedDate,
      time,
      location,
      isComplete,
      formStarted,
    });

    // Fetch the populated therapist data and attach it to the booking object
    const populatedBooking = await Booking.findById(booking._id).populate(
      "therapist"
    );

    res.status(201).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("therapist");
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateFormStarted = async (req, res) => {
  try {
    const { id } = req.params;
    const { formStarted } = req.body;

    if (typeof formStarted !== "boolean") {
      return res.status(400).json({ error: "Invalid formStarted value" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { formStarted },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      message: "formStarted field updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating formStarted:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateIsComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;

    if (typeof isComplete !== "boolean") {
      return res.status(400).json({ error: "Invalid isComplete value" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { isComplete },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      message: "isComplete field updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating isComplete:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update booking by booking Id
exports.updateBookingbyBookingId = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(id, updateData);
    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({ error: "Booking not found" });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid booking ID format" });
    }

    const result = await Booking.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Booking deleted successfully" });
    } else {
      return res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
