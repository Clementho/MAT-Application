const request = require("supertest");
const app = require("../server");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const { createTestToken } = require("../Controllers/userControllers");

describe("Signup User Endpoint", () => {
  const mockUserData = {
    username: "testu556ser",
    password: "TestPass123!",
    firstName: "John",
    lastName: "Doe",
    email: "test43@example.com",
    phoneNumber: "0412345678",
    isAdmin: false,
  };

  afterEach(async () => {
    await User.deleteMany({ username: mockUserData.username });
  });

  it("should signup a new user", async () => {
    const response = await request(app)
      .post("/api/user/signUp")
      .send(mockUserData);

    expect(response.status).toBe(200);
    expect(response.body.username).toBe(mockUserData.username);
    expect(response.body.isAdmin).toBe(mockUserData.isAdmin);
    expect(response.body).toHaveProperty("token");

    const userInDatabase = await User.findOne({
      username: mockUserData.username,
    });
    expect(userInDatabase).toBeTruthy();
  }, 15000);

  it("should check for duplicate username", async () => {
    const signupResponse = await request(app)
      .post("/api/user/signUp")
      .send(mockUserData);

    const response = await request(app)
      .post("/api/user/signUp")
      .send(mockUserData);

    expect(signupResponse.status).toBe(200);
    expect(signupResponse.body.username).toBe(mockUserData.username);
    expect(signupResponse.body.isAdmin).toBe(mockUserData.isAdmin);
    expect(signupResponse.body).toHaveProperty("token");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Username already in use");

    const userInDatabase = await User.find({ username: mockUserData.username });
    expect(userInDatabase.length).toBe(1);
  }, 15000);

  it("should check for duplicate email", async () => {
    const signupResponse = await request(app)
      .post("/api/user/signUp")
      .send(mockUserData);

    const response = await request(app)
      .post("/api/user/signUp")
      .send({
        ...mockUserData,
        username: "differentUsername1",
      });

    expect(signupResponse.status).toBe(200);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Email address already in use");

    const userInDatabase = await User.find({ email: mockUserData.email });
    expect(userInDatabase.length).toBe(1);
  }, 15000);

  it("should check for incorrect phone number format", async () => {
    const response = await request(app)
      .post("/api/user/signUp")
      .send({
        ...mockUserData,
        username: "differentUsername2",
        phoneNumber: "123",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid Phone Format: e.g., 0412345678");

    const userInDatabase = await User.find({
      username: "differentUsername",
    });
    expect(userInDatabase.length).toBe(0);
  }, 15000);

  it("should return an error for empty fields", async () => {
    const response = await request(app).post("/api/user/signUp").send({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      isAdmin: false,
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("All fields must be filled");

    const userInDatabase = await User.findOne({
      username: mockUserData.username,
    });
    expect(userInDatabase).toBeNull();
  }, 15000);

  it("should create a token upon successful user signup", async () => {
    const response = await request(app)
      .post("/api/user/signUp")
      .send(mockUserData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");

    const userInDatabase = await User.findOne({
      username: mockUserData.username,
    });
    expect(userInDatabase).toBeTruthy();
  }, 15000);
});
