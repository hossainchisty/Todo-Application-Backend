// Basic Lib Imports
const Category = require("../models/categoryModel");
const request = require("supertest");
const app = require("../app");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY3OGRmZDcxOGE3ODk2NDhjYTk1NSIsImlhdCI6MTY4Mzk3ODQ2MywiZXhwIjoxNjg2NTcwNDYzfQ.RXWne_pcsU5kAMg-WLg8-ZvYoBm6bD3BGv4AMwzzvi8";

describe("GET  /api/v1/category", () => {
  it("Responds with a JSON array of tasks", (done) => {
    request(app)
      .get(" /api/v1/category")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Array);
        done();
      });
  });
});

describe("POST /api/v1/category", () => {
  it("Creates a new category and responds with the new category object", (done) => {
    const newCategory = {
      name: "Freelance",
    };

    request(app)
      .post("/api/v1/category")
      .set("Authorization", `Bearer ${token}`)
      .send(newCategory)
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.name).toBe(newCategory.name);
        done();
      });
  });
});

describe("PUT /api/v1/category/:id", () => {
  it("Updates a category and responds with a 200 status code", async () => {
    const category = await Category.findOne();
    const updatedCategory = { name: "Updated category" };
    const res = await request(app)
      .put(`/api/v1/category${category._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedCategory)
      .expect(200);
    expect(res.body.name).toEqual("Updated category");
  });
});

describe("DELETE /api/v1/category/:id", () => {
  it("Responds with a success message on successful deletion", async () => {
    const category = await Category.findOne();
    request(app)
      .delete(`/api/v1/category/${category._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Category was deleted.");
      });
  });
});
