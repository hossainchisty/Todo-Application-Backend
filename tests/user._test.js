// Basic Lib Imports
const request = require("supertest");
const app = require("../app");

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY3OGRmZDcxOGE3ODk2NDhjYTk1NSIsImlhdCI6MTY4Mzk3ODQ2MywiZXhwIjoxNjg2NTcwNDYzfQ.RXWne_pcsU5kAMg-WLg8-ZvYoBm6bD3BGv4AMwzzvi8";

describe("POST /api/v1/users/register", () => {
  it("Creates a new user and responds with the new user object", (done) => {
    const newUser = {
      full_name: "Mr. Smith",
      email: "smith1@gmail.com",
      password: "whosmith",
    };

    request(app)
      .post("/api/v1/users/register")
      .send(newUser)
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("token");
        expect(res.body.full_name).toBe(newUser.full_name);
        expect(res.body.email).toBe(newUser.email);
        expect(res.body.password).toBe(newUser.password);
        done();
      });
  });
});

describe("POST /api/v1/users/login", () => {
  it("Logs in a user and responds with the user object and token", (done) => {
    const user = {
      email: "smith@gmail.com",
      password: "whosmith",
    };

    request(app)
      .post("/api/v1/users/login")
      .send(user)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty("token");
        expect(res.body.message).toBe("Logged in successfully");
        done();
      });
  }, 20000); // Set the timeout to 10000 milliseconds);
},20000); // Set the timeout to 10000 milliseconds);
