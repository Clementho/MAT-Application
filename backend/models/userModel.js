const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  isAlphanumeric,
  isLength,
  isStrongPassword,
  isEmail,
} = require("validator");

const Schema = mongoose.Schema;
const usernameRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,20}$/; // Updated regex

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// sign up method
userSchema.statics.signup = async function (
  username,
  password,
  firstName,
  lastName,
  email,
  phoneNumber,
  isAdmin
) {
  // Validation
  if (
    !username ||
    !password ||
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber
  ) {
    throw Error("All fields must be filled");
  }

  // Username validation
  const minLength = 3;
  const maxLength = 20;

  if (
    !isLength(username, { min: minLength, max: maxLength }) ||
    !isAlphanumeric(username)
  ) {
    throw Error(
      `Username must be between ${minLength} and ${maxLength} characters long and contain only alphanumeric characters.`
    );
  }

  if (
    !isLength(username, { min: 3, max: 20 }) ||
    !usernameRegex.test(username)
  ) {
    throw Error(`Alphanumeric username, ${minLength}-${maxLength}.`);
  }

  // Minimum length: 8 characters, Requires at least 1 lowercase letter, Requires at least 1 uppercase letter, Requires at least 1 numeric digit, Requires at least 1 special character
  if (!isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }

  // Email validation
  if (!isEmail(email)) {
    throw new Error("Invalid email");
  }

  // Phone number validation
  const phoneNumberRegex = /^04\d{8}$/;
  if (!phoneNumberRegex.test(phoneNumber)) {
    throw new Error("Invalid Phone Format: e.g., 0412345678");
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw new Error("Email already in use");
  }

  const UsernameExists = await this.findOne({ username });

  if (UsernameExists) {
    throw Error("Username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    password: hash,
    firstName,
    lastName,
    email,
    phoneNumber,
    isAdmin,
  });

  return user;
};

userSchema.pre("save", function (next) {
  // console.log("Save Function is called...");
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Static Method
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("Incorrect username or password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect username or password");
  }

  return user;
};

// get user profile data method
userSchema.statics.profile = async function (username) {
  if (!username) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error(`User ${username} does not exist`);
  }

  return user;
};

// update user profile data method
userSchema.statics.updateUser = async function (oldUsername, updateData) {
  const { username, firstName, lastName, email, phoneNumber } = updateData;

  // Validation
  // if (!username || !firstName || !lastName || !email || !phoneNumber) {
  //   throw Error('All fields must be filled');
  // }

  // Username validation
  const minLength = 3;
  const maxLength = 20;

  //Find the user to change
  const user = await this.findOne({ username: oldUsername });

  //check if the user is existed in the doc.
  if (!user) {
    throw Error(`User ${oldUsername} does not exist`);
  }

  //check if the username has changed and update.
  if (username != user.username) {
    if (username == "") {
      throw new Error("Username can't be empty");
    }

    if (
      !isLength(username, { min: minLength, max: maxLength }) ||
      !isAlphanumeric(username)
    ) {
      throw Error(
        `Username must be between ${minLength} and ${maxLength} characters long and contain only alphanumeric characters.`
      );
    }

    const exists = await this.findOne({ username });

    if (exists) {
      throw Error("Username already in use");
    }
    user.username = username;
  } else {
    user.username = user.username;
  }

  //check if the email has changed and udpate.
  if (email != user.email) {
    // Email validation
    if (email == "") {
      throw new Error("Email can't be empty");
    }

    if (!isEmail(email)) {
      throw new Error("Invalid email");
    }
    user.email = email;
  } else {
    user.email = user.email;
  }

  //check if phone number has changed and update
  if (phoneNumber != user.phoneNumber) {
    // Phone number validation
    const phoneNumberRegex = /^04\d{8}$/; // Australian personal phone number format starting with '04' and followed by 8 digits
    if (phoneNumber == "") {
      throw new Error("Phone Number can't be empty");
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      throw new Error(
        "Invalid phone number. Phone number must be in Australian personal phone format (e.g., 0412345678)"
      );
    }
    user.phoneNumber = phoneNumber;
  } else {
    user.phoneNumber = user.phoneNumber;
  }

  //check if the firstname has changed and update
  if (firstName != user.firstName) {
    if (firstName == "") {
      throw new Error("First Name can't be empty");
    }
    user.firstName = firstName;
  } else {
    user.firstName = user.firstName;
  }

  //check if the lastname has changed and update
  if (lastName != user.lastName) {
    if (lastName == "") {
      throw new Error("Last Name can't be empty");
    }
    user.lastName = lastName;
  } else {
    user.lastName = user.lastName;
  }

  // const exists = await this.findOne({ username });

  // if (exists) {
  //   throw Error('Username already in use');
  // }

  // const user = await this.findOne({ username: oldUsername });

  //Perform the updates on the user object with the new data
  await user.save();

  return user;
};

module.exports = mongoose.model("User", userSchema);
