require('dotenv').config();

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mjml2html = require("mjml");
const sendEmail = require("../utils/email");
const Booking = require("../models/bookingModel");

const crypto = require("crypto");
const bcrypt = require("bcrypt");

// JWT
const createToken = async (_id) => {
  const secret = process.env.AUTH_SECRET_KEY;
  return jwt.sign({ _id }, secret, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);

    // Create a token
    const token = await createToken(user._id);
    var isAdmin = user.isAdmin;
    var userId = user._id;
    // Include the isAdmin property in the response
    res.status(200).json({ username, token, isAdmin, userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    phoneNumber,
    isAdmin,
  } = req.body;

  try {
    const user = await User.signup(
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      isAdmin
    );

    // Create a token
    const token = await createToken(user._id);

    // Create the MJML content for the email
    const mjmlContent = `
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
        <mj-image  width="180px" align="center"  padding-bottom="20px" src="https://firebasestorage.googleapis.com/v0/b/mat-image.appspot.com/o/ScopeLogo.png?alt=media&token=28902388-e2b8-41ef-94b9-3ee54f778895&_gl=1*luso91*_ga*MTcwNzgzMDE0OC4xNjkzODI3OTM0*_ga_CW55HF8NVT*MTY5NjE1MjUwOS42LjEuMTY5NjE1MjU2MC45LjAuMA.."></mj-image>
          <mj-text align="center" font-size="24px" color="#007bff">Welcome to the Scope MAT Assessment Tool</mj-text>
          <mj-text padding-left="20%" font-size="18px">Hello, ${user.firstName}!</mj-text>
          <mj-text padding-left="20%" font-size="18px">Your login details:</mj-text>
          <mj-text padding-left="20%" font-size="18px">Username: ${user.username}</mj-text>
          <mj-text padding-left="20%" font-size="18px">Password: ${password}</mj-text>
          <mj-image align="left" src="https://firebasestorage.googleapis.com/v0/b/mat-image.appspot.com/o/decorativePattern.png?alt=media&token=82f11727-1127-4efb-a033-fa92454521d3&_gl=1*1azn2p4*_ga*MTcwNzgzMDE0OC4xNjkzODI3OTM0*_ga_CW55HF8NVT*MTY5NjE1MjUwOS42LjEuMTY5NjE1MzU5Mi40MC4wLjA."/>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`;

    // Compile the MJML content into HTML
    const { html } = mjml2html(mjmlContent);

    // Send an email to the user with the HTML content
    const emailOptions = {
      email: user.email,
      subject: "Welcome to the Scope MAT Assessment Tool",
      html,
    };

    await sendEmail(emailOptions);

    res.status(200).json({ username, token, isAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// forgot-password
const svrForgotPassword = async (req, res) => {
  try {
    //Get user based on POSTed email
    const oldUser = await User.findOne({ email: req.body.email });

    console.log("oldUSER",oldUser);

    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }

    // Generate the random reset token
    const resetToken = oldUser.createPasswordResetToken();
    await oldUser.save({ validateBeforeSave: false });

    // Send it to user's email
    const resetURL = `https://matcapture.net/resetPassword/${resetToken}`;

    // Use MJML to create the HTML email content
    const mjmlContent = `
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
        <mj-image width="180px" align="center" padding-bottom="20px" src="https://firebasestorage.googleapis.com/v0/b/mat-image.appspot.com/o/ScopeLogo.png?alt=media&token=28902388-e2b8-41ef-94b9-3ee54f778895&_gl=1*luso91*_ga*MTcwNzgzMDE0OC4xNjkzODI3OTM0*_ga_CW55HF8NVT*MTY5NjE1MjUwOS42LjEuMTY5NjE1MjU2MC45LjAuMA.."/>
          <mj-text align="center" font-size="24px" color="#007bff">Password Reset</mj-text>
          <mj-text aling="center" font-size="18px">You requested to reset your password for your Scope account. Click the button below to reset password.</mj-text>
          <mj-button background-color="#007bff" color="white" font-size="16px" align="center" href="${resetURL}">
            Reset Password
          </mj-button>
          <mj-text aling="center" font-size="14px">This link will expire in 10 mins. If you did not request to reset your password, you can safely disregard this email.</mj-text>
          <mj-image align="left" src="https://firebasestorage.googleapis.com/v0/b/mat-image.appspot.com/o/decorativePattern.png?alt=media&token=82f11727-1127-4efb-a033-fa92454521d3&_gl=1*1azn2p4*_ga*MTcwNzgzMDE0OC4xNjkzODI3OTM0*_ga_CW55HF8NVT*MTY5NjE1MjUwOS42LjEuMTY5NjE1MzU5Mi40MC4wLjA."/>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`;

    // Convert MJML to HTML
    const { html } = mjml2html(mjmlContent);

    await sendEmail({
      email: oldUser.email,
      subject: "Reset password",
      html: html, // Pass the HTML content
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    console.log("Error occurred while sending email:", err);
    oldUser.passwordResetToken = undefined;
    oldUser.passwordResetExpires = undefined;
    await oldUser.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
};

// Reset Password
const svrResetPassword = async (req, res) => {
  // Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  try {
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // If token has not expired, and there is a user, you can send the user data in the response
    if (user) {
      console.log("Controller Page > user id > " + user._id);
      const userDataToSend = {
        id: user._id,
        email: user.email,
      };

      console.log("Password reset request: Token is valid.");
      return res.status(200).json({
        success: true,
        message: "Token is still valid",
        user: userDataToSend, // Include the user data in the response
      });
    } else {
      console.log("Password reset request: Token is invalid or has expired.");
      return res.status(400).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }
  } catch (error) {
    console.error(
      "Password reset request: An error occurred while processing the request:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

// Reset Password Save
const svrResetPasswordSave = async (req, res) => {
  const { password, userId } = req.body;

  try {
    // Find the user by their userID
    const user = await User.findById(userId);

    if (!user) {
      console.log("Password reset save: User not found.");
      return res.status(404).json({ error: "User not found" });
    }

    // Update the password and reset token fields
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Save the updated user object to the database
    await user.save();

    console.log("Password reset save: Password reset successful!");
    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Password reset save: Error resetting password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get user profile
const getProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.profile(username);

    /** remove password from user */
    // mongoose returns unnecessary data with object, so convert it into JSON
    const { password, ...rest } = Object.assign({}, user.toJSON());

    res.status(201).json(rest);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//get booking by username
const getBookingsByTherapistId = async (req, res) => {
  try {
    const therapistId = req.params.therapistId;

    // Use find to get all bookings where therapist field matches the provided therapistId
    const bookings = await Booking.find({ therapist: therapistId }).populate(
      "therapist"
    );

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update user profile
const updateProfile = async (req, res) => {
  const { username } = req.params;
  const updateData = req.body;

  try {
    const user = await User.updateUser(username, updateData);

    /** remove password from user */
    // mongoose returns unnecessary data with object, so convert it into JSON
    const { password, ...rest } = Object.assign({}, user.toJSON());

    res.status(200).json(rest);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getProfile,
  updateProfile,
  svrForgotPassword,
  svrResetPassword,
  svrResetPasswordSave,

  getBookingsByTherapistId,
};
